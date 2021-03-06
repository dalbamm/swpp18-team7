import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';

import { UserService } from '../service/user.service';
import { BookService } from '../service/book.service';
import { User } from '../models/user';
import { Book } from '../models/book';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  user: User;
  interestedList: Book[];

  constructor (
   	private router: Router,
   	private userService: UserService,
    private bookService: BookService
   	) {
  }

  ngOnInit() {
   	if (!this.userService.getSignedIn()) {
   		alert('Please sign in first.');
   		this.router.navigateByUrl('main');
  	} else {
   		this.user = this.userService.getCurrentUser();
      this.getInterestedList();
   	}
  }

  onClickChangeEmail(): void {
    const newEmail: string = prompt('Enter a new e-mail address.');
    if (newEmail != null) {
    	console.log('point 1');
    	if (this.checkEmailValidity(newEmail)) {
    		console.log('point 2');
   			this.userService.changeUserInfo(newEmail, this.user.phone).subscribe(
	  			(changedUser: User) => {
	  				console.log('point 3');
	  				this.userService.getRequestUser().subscribe(user => {
	  					this.user = user;
	  					this.userService.setCurrentUser(this.user);
	  					sessionStorage.setItem('sessionUser', JSON.stringify(this.user));
	  					alert('Your e-mail was successfully changed');
	  				});
	  			},
	  			(error: HttpErrorResponse) => {
	  				console.log('hellowww');
	  				if (error.status === 409) {
	  					alert('An account with email \'' + newEmail + '\' already exists');
	  				} else {
	  					alert('Unknown error while changing user info');
	  				}
	  			}
	  		);
	  	} else {
	  		alert('The email address is not valid.');
	  		this.onClickChangeEmail();
	  	}
  	}
  }

  getInterestedList(): void {
    this.bookService.getInterestedBook().subscribe(
      (books: Book[]) => {
        // for(var i = 0; i< books.length; i++){
        //   console.log(books[i].title + ': ' + books[i].ISBN);
        // }
        this.interestedList = books;
      },
      (error: HttpErrorResponse) => {
        console.log('error in getInterestedList.');
      }
    );
  }

  private checkEmailValidity(emailInput: string): boolean {
    const email_regex: RegExp = /^[^@\s]+@[^@\s]+\.[a-z]{2,3}$/;
    return email_regex.test(emailInput);
  }

  onClickDelete(isbn) {
    this.bookService.deleteInterestedBook(isbn).subscribe(
      () => {
        this.getInterestedList();
      },
      (error: HttpErrorResponse) => {
        console.log('error while deleting interested book.');
      });
  }
}
