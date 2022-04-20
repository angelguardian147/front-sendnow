import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../interfaces/client';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { ChatsService } from '../chats/chats.service';
import { Chat } from '../interfaces/chat';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  BASE_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getClients(email_user: string): Observable<any[]>{
    return this.http.get<any[]>(`${this.BASE_URL}/client/list/${email_user}`, 
      {'headers': new HttpHeaders({'Authorization':`Bearer  ${this.loginService.getToken()}`})});
  }

  find(param: string): Observable<any[]>{
    return this.http.get<any[]>(`${this.BASE_URL}/client/search/${param}`,
    {'headers': new HttpHeaders({'Authorization':`Bearer  ${this.loginService.getToken()}`})});
  }

  findClient(email: string): Observable<Client>{
    return this.http.get<Client>(`${this.BASE_URL}/client/findClient/${email}`,
      {'headers': new HttpHeaders({'Authorization':`Bearer ${this.loginService.getToken()}`})});
  }

  create(email: string, client: Client): Observable<any>{
    return this.http.post(`${this.BASE_URL}/client/create/${email}`, client, 
    {'headers': new HttpHeaders({'Authorization':`Bearer  ${this.loginService.getToken()}`})});
  }

  update(email: string, client: Client): Observable<any>{
    return this.http.patch(`${this.BASE_URL}/client/update/${email}`, client, 
    {'headers': new HttpHeaders({'Authorization':`Bearer  ${this.loginService.getToken()}`})})
  }

  remove(email: string): Observable<any>{
    return this.http.delete(`${this.BASE_URL}/client/delete/${email}`, 
    {'headers': new HttpHeaders({'Authorization':`Bearer  ${this.loginService.getToken()}`})});
  }

}
