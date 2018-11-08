import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from './user';


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
  }

  constructor(
  	private http: HttpClient,
  	private router: Router
  	) {
        this.signedIn = false;
     }

  isAuthenticated(): boolean {
    return this.signedIn;
  }

  getCurrentUser(): User {
    return this.currUser;
  }


  signIn(email: string, password: string) {
  	this.http.post<Response>(this.signinUrl, {"email": email, "password": password}, this.httpOptions).subscribe(
  		(response: Response) => {
        this.getRequestUser().subscribe(user => {
          this.currUser = user;
          console.log("signed in successfully");
          this.signedIn = true;
          this.router.navigateByUrl('main');
        });

  		},
  		(error: HttpErrorResponse) => {
  			console.log(error.status);
  			alert("Please check your information again");
  		});
  }

  signUp(email: string, password: string, phone: string){
    this.http.post<User>(this.signupUrl, {"email": email, "password":password, "phone":phone}, this.httpOptions).subscribe(
  		response => {
  			console.log("signed up successfully!");
        this.router.navigateByUrl('signin');
        alert("Welcome " + email + "!\n Please sign in.");
  		},
  		(error: HttpErrorResponse) => {
        if(error.status==418){
          alert("An account with email '" + email +"' already exists");
        }
        else {
          console.log(error.status);
  			     alert("unknown error");
        }
  		});
  }

  // used within the service
  private getRequestUser(): Observable<User>{
    return this.http.get<User>(this.userUrl);
  }

  signOut(){
  	this.http.get<Response>(this.signoutUrl).subscribe(
  		(response: Response) => {
        this.currUser = null;
  			console.log("signed out successfully");
  			this.router.navigateByUrl('main');
  		},
  		(error: HttpErrorResponse) => {
  			console.log(error.status);
  			console.log(error.message);
  		});
  }


}
