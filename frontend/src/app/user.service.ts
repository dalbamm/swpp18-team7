import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	signinUrl = 'api/signin';
	signupUrl = 'api/signup';
	signoutUrl = 'api/signout';
	userUrl = 'api/user';

	httpOptions = {
  	headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token',
  	})
  }

  constructor(
  	private http: HttpClient,
  	private router: Router
  	) { }

  signIn(email: string, password: string) {
  	this.http.post<Response>(this.signinUrl, {"email": email, "password": password}, this.httpOptions).subscribe(
  		(response: Response) => {
  			console.log("signed in successfully");
  			this.getCurrentUser();
  			this.router.navigateByUrl('main');
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
  		},
  		(error: HttpErrorResponse) => {
  			console.log(error.status);
  			alert("Please check the input again");
  		})
  }

  getCurrentUser(){
  	this.http.get<Response>(this.userUrl).subscribe(
  		(response: Response) => {
  			console.log(response);
  		},
  		(error: HttpErrorResponse) => {
  			console.log(error.status);
  			console.log(error.message);
  		});
  }

  signOut(){
  	this.http.get<Response>(this.signoutUrl).subscribe(
  		(response: Response) => {
  			console.log("signed out successfully");
  			this.router.navigateByUrl('main');
  		},
  		(error: HttpErrorResponse) => {
  			console.log(error.status);
  			console.log(error.message);
  		});
  }


}
