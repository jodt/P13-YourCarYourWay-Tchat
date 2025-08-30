import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RouterModule, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ChatServiceService} from "../../services/chat-service.service";
import {ChatMessage} from "../../interfaces/chat-message";
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user"
import {NgClass} from "@angular/common";


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [RouterModule, FormsModule, NgClass],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {

  @ViewChild("messagesList") private messagesList!: ElementRef;

  pseudo: string = '';
  user: User | undefined;
  messageList: ChatMessage[] = [];
  messageInput: string =  "";
  errorMessage: string = "";

  constructor(private chatService : ChatServiceService, private userService: UserService, private router: Router) {
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnInit(): void {
        this.chatService.initConnectionSocket();
        this.chatService.getMessageSubject().subscribe((messages: ChatMessage[])=> {
          this.messageList = messages;
          console.log("messages : " + this.messageList.length );
        })
    }



  register () {
    if (this.pseudo.trim() !== '') {
      const user =  {
        username : this.pseudo
      } as User;
      this.userService.addUser(user)
        .subscribe({
          next: response => {
            this.user = response;
            console.log(user.username)
            this.joinChat();
          },
          error: error => {
            if(error.status === 409) {
              this.errorMessage = "Pseudo déja utilisé";
              this.router.navigate(["/"]);
            }
          }
        });
    }
  }


  joinChat() {
    console.log("passe par là")
    this.chatService.joinRoom("room1")
  }

  sendMessage (){
    const chatMessage = {
      content: this.messageInput,
      sender: this.user?.username
    } as ChatMessage
    console.log(chatMessage);
    this.chatService.sendMessage("room1", chatMessage);
    this.messageInput='';
  }

  listenerMessage(){
    this.chatService.getMessageSubject().subscribe((messages: ChatMessage[])=> {
      this.messageList = messages;
      console.log("messages : " + this.messageList.length )
    })
  }

  private scrollToBottom(): void {
    try {
      this.messagesList.nativeElement.scrollTop = this.messagesList.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }

}
