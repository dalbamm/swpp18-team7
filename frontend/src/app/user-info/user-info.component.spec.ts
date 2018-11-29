import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { Response, ResponseOptions } from '@angular/http';

import { User } from '../models/user';
import { UserService } from '../service/user.service';
import { UserInfoComponent } from './user-info.component';

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async(() => {
    const userSpy = jasmine.createSpyObj('UserService', ['changeUserInfo', 'getCurrentUser', 'setCurrentUser', 'getRequestUser', 'getSignedIn']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ UserInfoComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: UserService, useValue: userSpy }
      ]
    })
    .compileComponents();

    userServiceSpy = TestBed.get(UserService);
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe(' not signed in', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(UserInfoComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      
      userServiceSpy.getSignedIn.and.returnValue(false);
    });

    it(' should redirect to main page', () => {
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('main');
    });
  });

  describe(' change Email', () => {
    let fakeUser: User;
    
    beforeEach(() => {
      userServiceSpy.getSignedIn.and.returnValue(true);
      fakeUser = { id: 1, email: 'test@test.com', password: '12345', signedIn: true} as User;
      userServiceSpy.getCurrentUser.and.returnValue(fakeUser);

      spyOn(window, 'alert');

      fixture = TestBed.createComponent(UserInfoComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it(' valid email address', () => {
      spyOn(window, 'prompt').and.returnValue('new@test.com');
      userServiceSpy.changeUserInfo.and.returnValue(of(new User()));
      userServiceSpy.getRequestUser.and.returnValue(of(new User()));

      component.onClickChangeEmail();
      expect(window.alert).toHaveBeenCalledWith('Your e-mail was successfully changed');
    });

  });
});
