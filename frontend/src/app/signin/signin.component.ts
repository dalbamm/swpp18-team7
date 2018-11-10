import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
  	private userService: UserService,
  	private router: Router
  	) { }

  ngOnInit() {
    if(this.userService.isAuthenticated()){
      this.router.navigateByUrl('main');
    }
  }



  onClickSignin() {
  	let signinForm = document.forms["form"];

  	let emailInput = signinForm["email"].value;
  	let passwordInput = signinForm["password"].value;

  	this.userService.signIn(emailInput, passwordInput);
  	signinForm["password"].value = "";
  }

  onClickSignup() {
  	this.router.navigateByUrl('signup');
  }

}
