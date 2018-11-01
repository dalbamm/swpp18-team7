import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	signinUrl = 'api/signin';

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

}
