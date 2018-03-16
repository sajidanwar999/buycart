import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {AppUser} from '../models/app-user';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import {UserService} from './user.service';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;
  authState: any = null;
  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user$ = afAuth.authState;
    this.authState = afAuth.authState;
  }
  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
  get authenticated(): boolean {
    return this.authState !== null;
  }
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }
  createUser(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  get appUser$(): Observable<AppUser> {
    return this.user$.switchMap(user => {
      if (user) {
        return this.userService.get(user.uid);
      } else {
        return Observable.of(null);
      }
    });
  }
}
