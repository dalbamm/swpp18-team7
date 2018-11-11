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
    let emailValid: boolean;
    let passwordValid: boolean;
    let passwordConfirmationValid: boolean;

  	let signupForm = document.forms["form"];
 	  let emailInput = signupForm["email"].value.trim();
  	let passwordInput = signupForm["password"].value;
    let passwordConfirmation = signupForm["passwordConfirmation"].value;
    let phoneInput = signupForm["phone"].value;

    emailValid = this.checkEmailValidity(emailInput);
    passwordValid = this.checkPasswordValidity(passwordInput);
    passwordConfirmationValid = passwordInput === passwordConfirmation;

    if(emailValid && passwordValid) {
      if(passwordConfirmationValid) {
        this.userService.signUp(emailInput, passwordInput, phoneInput)
      }
      else {
        alert("Password confirmation does not match the password.");
        signupForm["password"].value = "";
      	signupForm["passwordConfirmation"].value="";
      }
    }
    else {
      if(!emailValid) {
        alert("The email address is not valid.");
      }
      else {
        alert("The password should be at least 8 characters long and contain at least one upper case letter, one number and one lower case letter");
      }
    }
    signupForm["password"].value = "";
    signupForm["passwordConfirmation"].value="";

  }

  onClickCancel() {
  	this.router.navigateByUrl('signin');
  }

  private checkEmailValidity(emailInput: string): boolean {
    let email_regex: RegExp = /^[^@\s]+@[^@\s]+\.[a-z]{2,3}$/;
    return email_regex.test(emailInput);
  }

  private checkPasswordValidity(passwordInput: string): boolean {
    if (passwordInput.length < 8) return false;
    if (! /[a-z]/.test(passwordInput)) return false;
    if (! /[A-Z]/.test(passwordInput)) return false;
    if (! /[0-9]/.test(passwordInput)) return false;
    return true;
  }


}
