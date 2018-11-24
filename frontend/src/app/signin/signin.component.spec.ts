import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { of, Observable } from 'rxjs';
import { Response, ResponseOptions } from '@angular/http';

import { User } from '../models/user';
import { SigninComponent } from './signin.component';
import { UserService } from '../service/user.service';

describe('SigninComponent: ', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let locationSpy: jasmine.SpyObj<Location>;
  let httpTestingController;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const userSpy = jasmine.createSpyObj('UserService', ['signIn', 'getSignedIn', 'setSignedIn', 'getRequestUser', 'setCurrentUser']);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ SigninComponent ],
      providers: [
        {provide: Location, usevalue: locationSpy},
        {provide: Router, useValue: routerSpy},
        {provide: UserService, useValue: userSpy}
      ]
    })
    .compileComponents();

    httpTestingController = TestBed.get(HttpTestingController);
    userServiceSpy = TestBed.get(UserService);
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });


  describe('user is signed in: ', () => {
    beforeEach(() => {
      userServiceSpy.getSignedIn.and.returnValue(true);
    });

    it('should redirect to /main if user is already signed in', () => {
      component.ngOnInit();

      const spy = routerSpy.navigateByUrl;
      console.log(spy.calls.all());
      const navArgs = spy.calls.first().args[0];

      expect(navArgs).toBe('main');
    });
  });


  describe('user is not signed in: ', () => {
    beforeEach(() => {
      userServiceSpy.getSignedIn.and.returnValue(false);
      userServiceSpy.signIn.and.returnValue(of(new Response(new ResponseOptions)));
      userServiceSpy.getRequestUser.and.returnValue(of(new User));
    });


    it('should navigate to /signup when user clicks sign up button', () => {
      component.onClickSignup();

      const spy = routerSpy.navigateByUrl;
      console.log(spy.calls.all());
      const navArgs = spy.calls.first().args[0];

      expect(navArgs).toBe('signup');
    });

    it('should call userService.signIn() when user clicks sign in button', () => {
      const el = fixture.nativeElement;
      el.querySelector('#email-input').value = 'fake@fake.com';
      el.querySelector('#password-input').value = '12345';
      
      component.onClickSignin();
      
      expect(userServiceSpy.signIn.calls.count()).toEqual(1);
    });
  });
});
