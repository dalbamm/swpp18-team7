import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';

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

  /* button methods */
  onClickConfirm() {
    const signupForm = document.forms['form'];

    const formInput: FormInput = {
      email: signupForm['email'].value.trim(),
      password: signupForm['password'].value,
      passwordConfirmation: signupForm['passwordConfirmation'].value,
      phone: signupForm['phone'].value
    };

    if (this.checkInputValidity(formInput)) {
      this.userService.signUp(formInput.email, formInput.password, formInput.phone).subscribe(
        () => {
          alert('signed up successfully!');
          this.router.navigateByUrl('signin');
        },
        (error: HttpErrorResponse) => {
          if (error.status === 409) {
            alert('An account with email \'' + formInput.email + '\' already exists');
          } else {
            console.log(error.status);
            alert('unknown error');
          }
        });
    } else {
      signupForm['password'].value = '';
      signupForm['passwordConfirmation'].value = '';
    }
  }

  onClickCancel() {
    this.router.navigateByUrl('signin');
  }

  /* input validity check */
  private checkInputValidity(formInput: FormInput): boolean {
    const emailValid = this.checkEmailValidity(formInput.email);
    const passwordValid = this.checkPasswordValidity(formInput.password);
    const passwordConfirmationValid = formInput.passwordConfirmation === formInput.password;

    if (emailValid && passwordValid && passwordConfirmationValid) {
      return true;
    } else {
      if (!passwordConfirmationValid) {
        alert('Password confirmation does not match the password.');
      } else if (!passwordValid) {
        alert('The password should be at least 8 characters long ' +
          'and contain at least one upper case letter, one number and one lower case letter');
      } else {
        alert('The email address is not valid.');
      }

      return false;
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

class FormInput {
  email: string;
  password: string;
  passwordConfirmation: string;
  phone: string;
}