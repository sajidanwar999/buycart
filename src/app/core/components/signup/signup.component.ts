import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from 'shared/services/auth.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userForm = {
    fname: '',
    lname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };
  authState: any = null;
  constructor(
    private fireAuth: AngularFireAuth,
    private authService: AuthService,
    private db: AngularFireDatabase,
    private router: Router) {
    this.fireAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }

  ngOnInit() {
  }
  get authenticated(): boolean {
    return this.authState !== null;
  }
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }
  signup() {
    const name = this.userForm.fname + ' ' + this.userForm.lname;
    const data = {
      displayName: name,
      phone: this.userForm.phone,
      isAdmin: false
    }
    this.authService.createUser(this.userForm.email, this.userForm.password)
      .then(user => {
        this.authState = user;
        this.updateUserData(data);
        this.router.navigate(['/']);
      });
  }
  updateUserData(data) {
    const path = `users/${this.currentUserId}`;
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }
}
