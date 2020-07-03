import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  userInfo: any = {};

  constructor(private auth: AuthService) { }

  SignUp(){
    this.auth.SignUp(
      this.userInfo.userEmail, 
      this.userInfo.userPassword, 
      this.userInfo.userName);
    localStorage.setItem('username', this.userInfo.userName);
  };

  login(){
    this.auth.login();
  };

}
