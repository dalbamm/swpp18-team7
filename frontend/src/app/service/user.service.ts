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

// signinUrl = 'http://54.180.117.120:8000/api/signin';
// signupUrl = 'http://54.180.117.120:8000/api/signup';
// signoutUrl = 'http://54.180.117.120:8000/api/signout';
// userUrl = 'http://54.180.117.120:8000/api/user';

// url_prefix = 'http://localhost:8000';
// signinUrl = this.url_prefix + '/api/signin';
// signupUrl = this.url_prefix + '/api/signup';
// signoutUrl = this.url_prefix + '/api/signout';
// userUrl = this.url_prefix + '/api/user';
  csrfToken: string; 

  private signedIn: boolean;
  private currUser: User;


  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token',
    'credentials': 'include',
    }),
    withCredentials: true
  };
  
  constructor(
    private http: HttpClient,
    private router: Router
    ) {
        if (!JSON.parse(sessionStorage.getItem('sessionUser'))) {
          this.signedIn = false;
          this.currUser = null;
        } else {
          this.signedIn = true;
          this.currUser = JSON.parse(sessionStorage.getItem('sessionUser')) as User;
        }
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
    	console.log('signin==========='+document.cookie);
    return this.http.post<Response>(this.signinUrl, {'email': email, 'password': password}, this.httpOptions);
  }

  signUp(email: string, password: string, phone: string): Observable<User> {
    return this.http.post<User>(this.signupUrl, {'email': email, 'password': password, 'phone': phone}, this.httpOptions);
  }

  getRequestUser(): Observable<User> {
    	console.log('getRequestUser==========='+document.cookie);
    return this.http.get<User>(this.userUrl);
  }

  signOut(): Observable<Response> {
    this.currUser = null;
    this.signedIn = false;
    sessionStorage.clear();
    return this.http.get<Response>(this.signoutUrl);
  }

  changeUserInfo(newEmail: string, newPhone: string): Observable<User> {
    return this.http.put<User>(this.userUrl, {'email': newEmail, 'phone': newPhone}, this.httpOptions);
  }
}
