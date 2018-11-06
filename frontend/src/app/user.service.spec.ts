import { async, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './user';

let userService: UserService;
let httpClient: HttpClient;
let httpTestingController: HttpTestingController;
const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
      	UserService,
      	{provide: Router, useValue: routerSpy}]
    });

    userService = TestBed.get(UserService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));


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

  it('should throw error when login information is incorrect', async(() => {
  	userService.signIn('wrong', 'wrong');

  	const req = httpTestingController.expectOne(userService.signinUrl);
  	expect(req.request.method).toEqual('POST');

  	req.flush({status: 403});

  	expect(userService.isAuthenticated()).toEqual(false);
  	expect(userService.getCurrentUser()).toEqual(null);
  }));


});
