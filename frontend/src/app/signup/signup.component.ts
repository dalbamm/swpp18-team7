import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
  	private userService: UserService,
  	private router: Router
  	) { }

  ngOnInit() {
  }

    

  onClickConfirm() {
  	let signupForm = document.forms["form"];

  	let emailInput = signupForm["email"].value;
  	// TODO email validity check


  	let passwordInput = signupForm["password"].value;
  	let passwordConfirmation = signupForm["passwordConfirmation"].value;
		// TODO password validity check	  	

		let phone = signupForm["phone"].value;

  	this.userService.signUp(emailInput, passwordInput, phone);
  	signupForm["password"].value = "";
  	signupForm["passwordConfirmation"].value="";
  }

  onClickCancel() {
  	this.router.navigateByUrl('signin');
  }


}
