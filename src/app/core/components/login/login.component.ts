import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  userInfo: any = {}; 

  constructor(private auth: AuthService) { }
  SignIn(){
    this.auth.SignIn(this.userInfo.userEmail, this.userInfo.userPassword);
  }

  login(){
    this.auth.login();
  }

}
