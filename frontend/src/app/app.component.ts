import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Response } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

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

  constructor (
    public router: Router,
    private userService: UserService,
    private http: HttpClient,
    private titleService: Title,
    ) {
      this.titleService.setTitle('Boogle');
      router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) {
          this.user = this.userService.getCurrentUser();
        }
      });
      console.log('hello'); 
      this.http.get<Response>('http://54.180.117.120:8000/api/nothing').subscribe(() => console.log('hi'));	      
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
        sessionStorage.clear();
        console.log('signed out successfully');

        if (this.router.url === '/account') {
          this.router.navigateByUrl('/main');
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.status);
        console.log('SIGNOUT ERROR');
      });
  }

  onClickUserInfo(): void {
    this.router.navigateByUrl('account');
  }
}
