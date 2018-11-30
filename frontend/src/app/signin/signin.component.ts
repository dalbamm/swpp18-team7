import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import {Location} from '@angular/common';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private location: Location
    ) { }

  ngOnInit() {
    if (this.userService.getSignedIn()) {
      this.router.navigateByUrl('main');
    }
  }

  onClickSignin() {
    const signinForm = document.forms['form'];
    const emailInput = signinForm['email'].value;
    const passwordInput = signinForm['password'].value;

    this.userService.signIn(emailInput, passwordInput).subscribe(
      (response: Response) => {
        this.userService.setSignedIn(true);
        this.userService.getRequestUser().subscribe(user => {
          sessionStorage.setItem('sessionUser', JSON.stringify(user));
          
          this.userService.setCurrentUser(user);
          this.router.navigateByUrl('main');
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error.status);
        alert('Please check your information again');
        signinForm['password'].value = '';
      });
  }

  onClickSignup() {
    this.router.navigateByUrl('signup');
  }

  // navigate back to previous page
  onClickCancel() {
    this.location.back();
  }
}
