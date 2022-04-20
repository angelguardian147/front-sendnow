import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatsService } from '../chats/chats.service';
import { ClientService } from '../client/client.service';
import { Chat } from '../interfaces/chat';
import { Client } from '../interfaces/client';
import { Content } from '../interfaces/content';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  client: Client = { 
    firstName: '',
    lastName: '',
    charge: '',
    company: '',
    email: '',
    estado: '',
    address: '',
  };

  content: Content = {
    user_email: '',
    message: '',
  };

  contents: Content[] = [];
  users_email: string[] = [];

  chat: Chat = {
    name: '',
    users_email: [],
    content: []
  };

  message!: string;
  sinChat: boolean = false;
  username: string = '';
  ruta: string = '';
  scrollTop = 100;

  constructor(
              private chatService: ChatsService, 
              private clientService: ClientService, 
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.getParam();
  }

  getParam(){
    this.route.queryParamMap.subscribe((params) => {
      const email  = params.get('email');
      const username = params.get('username');
      const ruta = params.get('ruta');
      if(email && username && ruta){
        this.username = username
        this.ruta = ruta;
        this.getClient(email);
        this.getChat(email);
      }
    });
  }

  getClient(email: string){
    this.clientService.findClient(email).subscribe(
      res => {
        this.client = Object.values(res)[0];
      },
      err => {
        console.log(err)
      }
    );
  }

  saveChat(chat: Chat){
    this.chatService.create(chat).subscribe(
      res => {
        this.message = '';
        if (this.client.email) {
          this.getChat(this.client.email);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getChat(email: string){
    setInterval(() => {
      this.chatService.getChat(email).subscribe({
        next: (res) => {
          if(Object.values(res)[0]){
            this.chat = Object.values(res)[0];
            if (this.chat) {
              this.sinChat = true;
            }
          }
        },
        error: (err) => {
          console.log(err);
        }
      }
      );
    }, 1000);
  }

  sendText(){
    
    this.chat.name = this.client.firstName;
    this.chat.type = 'private';

    if(this.client.email){
      this.users_email.push(this.client.email);
      this.chat.users_email = this.users_email;
    }

    this.content.user_email = this.client.email;
    this.content.date = new Date(Date.now());
    this.content.message = this.message;
    this.contents.push(this.content);
    this.chat.content = this.contents;

    this.saveChat(this.chat);

  }

  hasSent(email: string | any): boolean{
    if(email == this.client.email){
      return true;
    }
    return false
  }

  hasRecived(email: string | any): boolean{
    if(email == this.client.email){
      return false;
    }
    return true
  }

  offShow(){
    this.router.navigate([this.ruta]);
  }

}
