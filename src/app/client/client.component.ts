import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../interfaces/client';
import { JwtResponse } from '../interfaces/jwt-response';
import { LoginService } from '../login/login.service';
import { ClientService } from './client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients: Client[] = [];
  client: Client = { 
                      firstName: '',
                      lastName: '',
                      charge: '',
                      company: '',
                      email: '',
                      estado: '',
                      address: '',
                    };
  user: JwtResponse = {};
  update = false;
  modo = 'Añadir';
  clss = "btn-f";
  search = '';
  errMsg!: string;
  alert = {
          title: '',
          content: ''
        };
  remove: boolean = false;
  emailDelete!: string;

  constructor(private clientService: ClientService, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.getUserName();
  }

  listEmpty(): boolean{
    if(this.clients.length==0){
      return true;
    }
    return false;
  }

  getClients(){
    if(this.user.email){
      this.clientService.getClients(this.user.email)
      .subscribe(
        res =>
        { 
          this.clients = Object.values(res)[0];
        },
        err => console.log(err)
      );
    }
  }

  find(){
    if(this.search){
      this.clientService.find(this.search)
      .subscribe(
        res =>
        {
          this.clients = Object.values(res)[0];
        },
        err => console.log(err)
      );
    }else{
      this.getClients();
    }
  }

  create(){
    if(this.user.email){
      this.clientService.create(this.user.email, this.client)
      .subscribe(
        res =>
        {
          this.clear();
          this.getClients();
        },
        err => console.log(err)
      );
    }
  }

  edit(){
    if(this.client.email){
      this.clientService.update(this.client.email, this.client)
        .subscribe(
          res =>
          {
            this.clear();
            this.getClients();
          },
          err => console.log(err)
        );
    }
  }

  acept(){
    this.clss = "btn-f";
    this.operationDelete();
  }

  cancel(){
    this.clss = "btn-f";
  }

  delete(email: string){
    this.alert.title = 'Deleting...!';
    this.alert.content = 'Are you sure of deleting this contact??'
    this.clss = "btn-f message";
    this.emailDelete = email;
  }

  operationDelete(){
      this.clientService.remove(this.emailDelete)
      .subscribe(
        res =>
        {
          this.getClients();
        },
        err => console.log(err)
      );
  }

  getUserName(){
    this.loginService.profile().subscribe(
      res => {
        this.user = res;
        this.getClients();
      },
      err => {
        console.log(err);
      }
    );
  }

  onShow(){
    this.clss = "btn-f show"
  }

  onShowEdit(client: Client){
    this.update = true;
    this.modo = 'Editar'
    this.client = client;
    this.onShow();
  }

  offShow(){
    this.update = false;
    this.modo = 'Añadir'
    this.clear();
    this.clss = "btn-f";
  }

  chatShow(client: Client){
    if(client.email){
      this.loginService.getUserEmail(client.email).subscribe(
        res => {
          if(Object.values(res)[0].data.email){
            this.router.navigate(['chatRoom'],
              { queryParams: { email: client.email, username: this.user.username, ruta: 'clients' } });
          }else{
            this.errMsg = 'This User Does not Exist In The App!'
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  clear(){
    this.client = { 
      firstName: '',
      lastName: '',
      charge: '',
      company: '',
      email: '',
      estado: '',
      address: '',
    };
  }

}
