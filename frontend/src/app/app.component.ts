import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Boogle';
  user: User = null;
  isMain = true;
  
  constructor (private router: Router) {
    router.events.subscribe((val) => {
      if ( val instanceof NavigationEnd ) {
        if ( val.url == '/main')
          this.isMain = true;
        else
          this.isMain = false;
      }
    })
  }

  goSignIn(): void {
    alert('sign-in button is clicked');
  }

  goUserInfo(): void {
    alert('user-info button is clicked');
  }
}
