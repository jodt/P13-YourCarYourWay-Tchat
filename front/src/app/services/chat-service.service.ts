import { Injectable } from '@angular/core';
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {BehaviorSubject, Observable} from "rxjs";
import {ChatMessage} from "../interfaces/chat-message";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  private pathService = 'api/chat';
  private stompClient : any;
  private messageSubject$ : BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([])
  private connected$ = new BehaviorSubject<boolean>(false);
  private subscription: any;

  constructor(private httpClient: HttpClient) { }

  initConnectionSocket(roomId:string) {
    const url = "http://localhost:8080/ws-chat";
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, () => {
      this.connected$.next(true);
      this.joinRoom(roomId)
    }, (error: any) => {
      this.connected$.next(false)
    });
  }

  joinRoom(roomId: string) {
    this.getHistoricalMessagesByRoom(roomId).subscribe(messages => {
      this.messageSubject$.next(messages);

      this.subscription = this.stompClient.subscribe(`/topic/${roomId}`, (message: any) => {
        const messageContent: ChatMessage = JSON.parse(message.body);
        this.messageSubject$.next([
          ...this.messageSubject$.getValue(),
          messageContent
        ]);
      });
    })
  }

  sendMessage(roomId: string, chatMessage: ChatMessage) {
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage))

  }

  logout() {
    if(this.subscription) {
      this.stompClient.unsubscribe(this.subscription);
      this.subscription = null;
    }

    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        this.connected$.next(false);
      });
    }

    this.messageSubject$.next([]);
  }

  getMessageSubject() {
    return this.messageSubject$.asObservable();
  }

  isConnected(): Observable<boolean> {
    return this.connected$.asObservable();
  }

  getHistoricalMessagesByRoom(roomId:string): Observable<ChatMessage[]> {
    return this.httpClient.get<ChatMessage[]>(`${this.pathService}/all/room/${roomId}`)
  }

}
