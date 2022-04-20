import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Client } from '../interfaces/client';
import { JwtResponse } from '../interfaces/jwt-response';
import { Login } from '../interfaces/login';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data: Client = { 
    firstName: '',
    lastName: '',
    charge: '',
    company: '',
    email: '',
    estado: '',
    address: '',
  };
  log: Login = { data: this.data };
  user: JwtResponse = {}
  clss: string = 'container';
  errorMsg!: string;
  errorMsg2!: string;

  constructor(private loginService: LoginService, private router: Router, private app: AppComponent) { }

  ngOnInit(): void {
    this.profile();
  }

  send(){
    if(this.log.password && this.log.userName){
      this.loginService.login(this.log.userName, this.log.password)
      .subscribe(
        res => {
          this.router.navigate(['/clients']);
          this.app.ngOnInit();
        },
        err => {
          this.errorMsg2 = err.error.message;
        }
      );
    }else{
      this.errorMsg2 = 'You have to fill all the fields';
    }

  }

  save(){
    this.loginService.create(this.log)
      .subscribe(
        res => {
          this.router.navigate(['/clients']);
          this.app.ngOnInit();
        },
        err => {
          this.errorMsg = err.error.message;
        }
      );
  }

  profile(){
    this.loginService.profile().subscribe(
      res => {
        if(res && res.email){
          this.router.navigate(['/clients']);
        }else{
          this.router.navigate(['/']);
        }
      },
      err => {
        console.log(err)
        this.router.navigate(['/']);
      }
    );
  }

  onShow(){
    this.clss = "container show"
  }

  offShow(){
    this.clss = "container";
  }

}
