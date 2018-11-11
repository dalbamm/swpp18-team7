import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { SigninComponent } from './signin.component';
import { UserService } from '../service/user.service';

describe('SigninComponent: ', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const userSpy = jasmine.createSpyObj('UserService', ['signIn', 'isAuthenticated']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ SigninComponent ],
      providers: [
        {provide: Router, useValue: routerSpy},
        {provide: UserService, useValue: userSpy}
      ]
    })
    .compileComponents();

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
      userServiceSpy.isAuthenticated.and.returnValue(true);
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
      userServiceSpy.isAuthenticated.and.returnValue(false);
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
