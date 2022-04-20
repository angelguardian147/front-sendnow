
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtResponse } from './interfaces/jwt-response';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'front';
  access = false;
  activeA: string = 'home active';
  activeB: string = 'chat';
  activeC: string = '';
  activeD: string = '';
  user!: JwtResponse;

  constructor(private loginService: LoginService, private router: Router){}

  ngOnInit(): void {
    this.profile();
  }

  profile(){
    this.loginService.profile().subscribe(
      res => {
        if(res && res.email){
          this.user = res;
          this.access = true;
          this.router.navigate(['/clients']);
        }else{
          this.access = false;
          this.router.navigate(['/']);
        }
      },
      err => {
        console.log(err)
        this.access = false;
          this.router.navigate(['/']);
      }
    );
  }

  active(act: string){
    switch(act){
      case 'home':
        this.activeA = 'home active';
        this.activeB = 'chat';
      break;
      case 'chat':
        this.activeA = 'home';
        this.activeB = 'chat active';
      break;
      default:
        this.activeA = 'home active';
        this.activeB = 'chat';
    }
  }

  logOut(){
    this.loginService.logOut();
    this.ngOnInit();
  }

}
