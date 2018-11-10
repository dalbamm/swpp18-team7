import { async, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

let userService: UserService;
let httpTestingController: HttpTestingController;
let routerSpy;

describe('UserService', () => {
  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
      	UserService,
      	{provide: Router, useValue: routerSpy}]
    });

    userService = TestBed.get(UserService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));


 	describe(': signIn', () => {
	  it('should sign in user', async(() => {
	  	let user: User = {id: 1, email: "fake@fake.com", password:"12345", signedIn: true};

	  	userService.signIn(user.email, user.password);

	  	const reqSignin = httpTestingController.expectOne(userService.signinUrl);
	  	expect(reqSignin.request.method).toEqual('POST');

	  	reqSignin.flush({status: 204});

	  	const reqUser = httpTestingController.expectOne(userService.userUrl);
	  	expect(reqUser.request.method).toEqual('GET');

	  	reqUser.flush(user);
	  	expect(userService.isAuthenticated()).toEqual(true);
	  }));

	  it('should throw an error when login information is incorrect', async(() => {
	  	userService.signIn('wrong', 'wrong');

	  	const req = httpTestingController.expectOne(userService.signinUrl);
	  	expect(req.request.method).toEqual('POST');

	  	req.flush({status: 403});

	  	expect(userService.isAuthenticated()).toEqual(false);
	  	expect(userService.getCurrentUser()).toBeFalsy();
	  }));
	});


	describe(': signOut', () => {
		it('should sign out user successfully', () => {
			userService.signOut();

			const req = httpTestingController.expectOne(userService.signoutUrl);
			expect(req.request.method).toEqual('GET');

			req.flush({status: 204});

			const spy = routerSpy.navigateByUrl;
			const navArgs = spy.calls.first().args[0];

			expect(navArgs).toBe('main');
		});

		it('should throw error when not signed in', () => {
			userService.signOut();

			const req = httpTestingController.expectOne(userService.signoutUrl);
			expect(req.request.method).toEqual('GET');

			req.flush({status: 403});
		});
	});


  describe(': signUp', () =>{
    it('should sign up new user successfully and redirect to signin page', () => {
      userService.signUp("hello@hello.com", "12345", null);

      const req = httpTestingController.expectOne(userService.signupUrl);
      expect(req.request.method).toEqual('POST');

      req.flush({status: 201});

      const spy = routerSpy.navigateByUrl;
      const navArgs = spy.calls.first().args[0];

      expect(navArgs).toBe("signin");
    });
  });
});
