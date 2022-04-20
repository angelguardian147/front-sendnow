import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, mergeMap, Observable, tap, timer } from 'rxjs';
import { Chat } from '../interfaces/chat';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient, private loginService: LoginService) { }

  create(chat: Chat): Observable<any>{
    return this.http.post(`${this.BASE_URL}/chat/create/`,chat, 
      {'headers': new HttpHeaders({'Authorization':`Bearer  ${this.loginService.getToken()}`})});
  }

  getAll(): Observable<any[]>{
    return this.http.get<any[]>(`${this.BASE_URL}/chat/list/`, 
      {'headers': new HttpHeaders({'Authorization':`Bearer  ${this.loginService.getToken()}`})});
  }

  getChat(email: string): Observable<Chat>{
    return this.http.get<Chat>(`${this.BASE_URL}/chat/listids/${email}`,
      {'headers': new HttpHeaders({'Authorization':`Bearer  ${this.loginService.getToken()}`})})
  }

}
