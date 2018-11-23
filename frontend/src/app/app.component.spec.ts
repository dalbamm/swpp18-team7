import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Response, ResponseOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { UserService } from './service/user.service';
import { User } from './models/user';

@Injectable()
class RouterMain {
  public events = of(new NavigationEnd(0, 'http://localhost:4200/main', 'http://localhost:4200/main'));
  public lastCalledWith: string;

  navigateByUrl(url: string): void {
    this.lastCalledWith = url;
    this.events = of(new NavigationEnd(0, 'http://localhost:4200/' + url, 'http://localhost:4200/' + url));   
  }
}

describe('AppComponent: ', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let routerStub;
  const userServiceSpy = jasmine.createSpyObj('UserService', ['signOut', 'getCurrentUser', 'isAuthenticated']);

  beforeEach(async(() => {
    userServiceSpy.getCurrentUser.and.returnValue({id: 1, email: 'test@test.com', password:'12345', signedIn: true} as User);
    userServiceSpy.isAuthenticated.and.returnValue(true);

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        { provide: Router, useClass: RouterMain },
        { provide: UserService, useValue: userServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    routerStub = TestBed.get(Router);

    fixture.detectChanges();
  }));

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have as title 'Boogle'`, async(() => {
    expect(component.title).toEqual('Boogle');
  }));

  
  describe('buttons:', () => {
    it('should redirect to signin page when signin button is clicked', () => {
      component.onClickSignin();

      expect(routerStub.lastCalledWith).toEqual('signin');
    });

    it('buttons when signed in', () => {
      const el = fixture.nativeElement;
      
      expect(el.querySelector('#user-info-button')).toBeTruthy();
      expect(el.querySelector('#user-info-button').textContent).toBe('test@test.com');

      expect(el.querySelector('#sign-out')).toBeTruthy();

      expect(el.querySelector('#sign-in')).toBeFalsy();
    });

    it('buttons when signed out', () => {
      userServiceSpy.signOut.and.returnValue(of(new Response(new ResponseOptions)));

      component.onClickSignout();
      fixture.detectChanges();

      const el = fixture.nativeElement;
      expect(el.querySelector('#user-info-button')).toBeFalsy();

      expect(el.querySelector('#sign-out')).toBeFalsy();
      expect(el.querySelector('#sign-in')).toBeTruthy();
    });
  });

});
