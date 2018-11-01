import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
  	private userService: UserService
  	) { }

  ngOnInit() {
  }

  verifyInputInformation() {
  	let signinForm = document.forms["form"];

  	let emailInput = signinForm["email"];
  	let passwordInput = signinForm["password"];


  }

}
