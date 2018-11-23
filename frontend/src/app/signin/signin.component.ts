import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';

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
    if (this.userService.isAuthenticated()) {
      this.router.navigateByUrl('main');
    }
  }

  onClickSignin() {
    let signinForm = document.forms['form'];
    let emailInput = signinForm['email'].value;
    let passwordInput = signinForm['password'].value;

    this.userService.signIn(emailInput, passwordInput).subscribe(
      (response: Response) => {
        this.userService.signedIn = true;
        this.userService.getRequestUser().subscribe(user => {
          this.userService.currUser = user;
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

}
