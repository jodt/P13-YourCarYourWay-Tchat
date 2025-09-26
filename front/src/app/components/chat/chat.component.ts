import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RouterModule, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ChatServiceService} from "../../services/chat-service.service";
import {ChatMessage} from "../../interfaces/chat-message";
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user"
import {AsyncPipe, NgClass} from "@angular/common";
import {Observable} from "rxjs";


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [RouterModule, FormsModule, NgClass, AsyncPipe],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {

  @ViewChild("messagesList") private messagesList!: ElementRef;
  user!: User | null;
  messageList$: Observable<ChatMessage[]> = new Observable<ChatMessage[]>();
  messageInput: string =  "";

  constructor(private chatService : ChatServiceService, private userService: UserService, private router: Router) {
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.chatService.initConnectionSocket("room1");
    this.messageList$ = this.chatService.getMessageSubject()
  }

  sendMessage (){
    const chatMessage = {
      content: this.messageInput,
      sender: this.user?.username
    } as ChatMessage
    this.chatService.sendMessage("room1", chatMessage);
    this.messageInput='';
  }

  logout() {
    this.userService.clearUser();
    this.chatService.logout( );
    this.router.navigate(['/']);
  }


  private scrollToBottom(): void {
    if(this.user) {
      try {
        this.messagesList.nativeElement.scrollTop = this.messagesList.nativeElement.scrollHeight;
      } catch (err) {
        console.error(err);
      }
    }
  }


}
