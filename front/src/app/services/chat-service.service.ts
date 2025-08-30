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

  constructor(private httpClient: HttpClient) { }

  initConnectionSocket() {
    const url = "http://localhost:8080/chat";
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, () => {
      this.connected$.next(true);
    }, (error: any) => {
      this.connected$.next(false)
    });
  }

  joinRoom(roomId: string) {
    this.getHistoricalMessagesByRoom(roomId).subscribe(messages => {
      this.messageSubject$.next(messages);

      this.stompClient.subscribe(`/topic/${roomId}`, (message: any) => {
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
