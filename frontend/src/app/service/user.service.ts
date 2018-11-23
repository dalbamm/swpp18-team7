import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  signinUrl = 'api/signin';
  signupUrl = 'api/signup';
  signoutUrl = 'api/signout';
  userUrl = 'api/user';

  private signedIn: boolean;
  private currUser: User;

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token',
    })
  };

  constructor(
    private http: HttpClient,
    private router: Router
    ) {
        this.signedIn = false;
        this.currUser = null;
      }

  /* Mutators, Accessors */
  getSignedIn(): boolean {
    return this.signedIn;
  }

  setSignedIn(signedIn: boolean): void {
    this.signedIn = signedIn;
  }

  getCurrentUser(): User {
    return this.currUser;
  }

  setCurrentUser(user: User): void {
    this.currUser = user;
  }


  /* Http Requests */
  signIn(email: string, password: string): Observable<Response> {
    return this.http.post<Response>(this.signinUrl, {'email': email, 'password': password}, this.httpOptions);
  }

  signUp(email: string, password: string, phone: string): Observable<User> {
    return this.http.post<User>(this.signupUrl, {'email': email, 'password': password, 'phone': phone}, this.httpOptions);
  }

  getRequestUser(): Observable<User> {
    return this.http.get<User>(this.userUrl);
  }

  signOut(): Observable<Response> {
    this.currUser = null;
    this.signedIn = false;
    return this.http.get<Response>(this.signoutUrl);
  }
}
