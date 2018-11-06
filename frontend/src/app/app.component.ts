import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Boogle';
  user: User = null;
  isMain = true;

  signedIn = false;

  constructor (
    private router: Router,
    private userService: UserService
    ) {
      router.events.subscribe((val) => {
        if ( val instanceof NavigationEnd ) {
          if ( val.url == '/main'){
            this.isMain = true;
          }
          else{
            this.isMain = false;
          }
          this.user = this.userService.getCurrentUser();
          console.log(this.user);
          this.signedIn = this.userService.isAuthenticated();
        }
      })
    }
    
  ngOnInit() {
  }

  onClickSignin(): void {
    this.router.navigateByUrl('signin');
  }

  onClickSignout(): void {
    this.user = null;
    this.signedIn = false;
    this.userService.signOut();
  }

  onClickUserInfo(): void {
    alert('clicked user info');
  }
}
