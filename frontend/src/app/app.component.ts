import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Response } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';

import { User } from './models/user';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Boogle';
  user: User = null;
  isMain = true;
  isSignin = false;

  constructor (
    private router: Router,
    private userService: UserService
    ) {
      router.events.subscribe((val) => {
        this.isMain = this.router.url === '/main';
        this.isSignin = this.router.url === '/signin';

        if (val instanceof NavigationEnd) {
          console.log('navigation change detected');
          this.user = this.userService.getCurrentUser();
          console.log(this.user);
        }
      });
     }

  ngOnInit() {
  }

  onClickSignin(): void {
    this.router.navigateByUrl('signin');
  }

  onClickSignout(): void {
    this.userService.signOut().subscribe(
      (response: Response) => {
        this.user = null;
        console.log('signed out successfully');
      },
      (error: HttpErrorResponse) => {
        console.log(error.status);
        console.log('SIGNOUT ERROR');
      });
  }

  onClickUserInfo(): void {
    alert('clicked user info');
  }
}
