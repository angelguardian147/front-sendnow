import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from '../interfaces/chat';
import { Content } from '../interfaces/content';
import { JwtResponse } from '../interfaces/jwt-response';
import { LoginService } from '../login/login.service';
import { ChatsService } from './chats.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  content: Content = {
    user_email: '',
    message: '',
  };

  contents: Content[] = [];

  chat: Chat = {
    name: '',
    users_email: [],
    content: this.contents
  };

  chats: Chat[] = [];

  user: JwtResponse = {};

  constructor(private chatService: ChatsService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.getUserName();
    this.findAll();
  }

  listEmpty(): boolean{
    if(this.chats.length==0){
      return true;
    }
    return false;
  }

  findAll(){
    this.chatService.getAll().subscribe(
      res => {
        console.log(Object.values(res)[0])
        this.chats = Object.values(res)[0];
      },
      err => {
        console.log(err);
      }
    );
  }

  getUserName(){
    this.loginService.profile().subscribe(
      res => {
        this.user = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  onShow(email: string){
    this.router.navigate(['chatRoom'],{queryParams: {email: email, username: this.user.username, ruta: 'chats'}})
  }

}
