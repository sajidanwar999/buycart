import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from 'shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm = {
    email: '',
    password: ''
  };
  authState: any = null;
  constructor(
    public authService: AuthService,
    private db: AngularFireDatabase,
    private fireAuth: AngularFireAuth,
    private router: Router) {
    this.fireAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }
  get authenticated(): boolean {
    return this.authState !== null;
  }
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }
  ngOnInit() {
  }
  userLogin() {
    this.authService.emailLogin(this.userForm.email, this.userForm.password)
      .then(user => {
        this.authState = user;
        this.router.navigate(['/']);
      });
  }
  login() {
    this.authService.login();
  }
}
