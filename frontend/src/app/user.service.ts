import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	currentUser: User;
	signinUrl = 'api/signin';
	signupUrl = 'api/signup';

	httpOptions = {
  	headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token',
  	})
  }

  constructor(
  	private http: HttpClient
  	) { }

  authenticate(email: string, password: string) {
  	this.http.post<User>(this.signinUrl, {"email": email, "password": password}, this.httpOptions).subscribe(
  		response => {
  			console.log("signed in successfully!");
  		},
  		(error: HttpErrorResponse) => {
  			console.log(error.status);
  			alert("Please check your information again");
  		});
  }

  signUp(email: string, password: string, phone: string){
  	this.http.post<User>(this.signupUrl, {"email": email, "password":password, "phone":phone}, this.httpOptions).subscribe(
  		resposne => {
  			console.log("signed up successfully!");
  		},
  		(error: HttpErrorResponse) => {
  			console.log(error.status);
  			alert("Please check the input again");
  		})
  }

}
