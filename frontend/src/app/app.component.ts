import { Component } from '@angular/core';

import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Boogle';
  user: User = null;
  isMain: boolean = true;

  goSignIn(): void {
  	alert("sign-in button is clicked");
  }

  goUserInfo(): void {
  	alert("user-info button is clicked");
  }
}
