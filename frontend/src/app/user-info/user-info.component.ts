import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  user: User;
  userEmail: string;
  userPhone: string;

  constructor (
  	private router: Router,
  	private userService: UserService
  	) {
  }

  ngOnInit() {
  	if (!this.userService.getSignedIn()) {
  		alert('Please sign in first.');
  		this.router.navigateByUrl('main');
  	} else {
  		this.user = this.userService.getCurrentUser();
  		this.userEmail = this.user.email;
  		this.userPhone = this.user.phone;
  	}
  }

  onClickChangeEmail(): void {
  	const newEmail: string = prompt('Enter a new e-mail address.');
  	if (newEmail != null) {
	  	if (this.checkEmailValidity(newEmail)) {
	  		this.userEmail = newEmail;
	  	} else {
	  		alert('The email address is not valid.');
	  		this.onClickChangeEmail();
	  	}
  	}
  }

  private checkEmailValidity(emailInput: string): boolean {
    const email_regex: RegExp = /^[^@\s]+@[^@\s]+\.[a-z]{2,3}$/;
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
