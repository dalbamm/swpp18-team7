import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { UserService } from '../service/user.service';
import { SignupComponent } from './signup.component';


describe('SignupComponent: ', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async(() => {
    const userSpy = jasmine.createSpyObj('UserService', ['signUp']);    
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ SignupComponent ],
      providers: [
        {provide: Router, useValue: routerSpy},
        {provide: UserService, useValue: userSpy}
      ],
    })
    .compileComponents();

    userServiceSpy = TestBed.get(UserService);
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create the app', () => {
    expect(component).toBeTruthy();
  });


  it('should navigate to /signin when user clicks cancel button', () => {
    component.onClickCancel();

    const spy = routerSpy.navigateByUrl;
    const navArgs = spy.calls.first().args[0];

    expect(navArgs).toBe('signin');
  });


  describe('confirm input information: ', () => {
    function setInput(email: string,
                      password: string,
                      passwordConfirmation: string,
                      phone: string): void {
      const el = fixture.nativeElement;

      const emailInput: HTMLInputElement = el.querySelector('#email-input')
      const passwordInput: HTMLInputElement = el.querySelector('#password-input');
      const confirmationInput: HTMLInputElement = el.querySelector('#confirmation-input');
      const phoneInput: HTMLInputElement = el.querySelector('#phone-input'); 

      emailInput.value = email;
      passwordInput.value = password;
      confirmationInput.value = passwordConfirmation;
      phoneInput.value = phone;
    }

    beforeEach(() => {
      spyOn(window, 'alert');
    })

    it('all inputs are valid -> call userService.signUp()', () => {
      setInput('test@test.com', 'Abcd1234', 'Abcd1234', '');
      component.onClickConfirm();
      
      expect(userServiceSpy.signUp.calls.count()).toEqual(1);
    });

    it('email, password valid, confirmation invalid -> alert message', () => {
      setInput('test@test.com', 'Abcd1234', 'abcd1234', '');
      component.onClickConfirm();

      expect(window.alert).toHaveBeenCalledWith('Password confirmation does not match the password.');
    });

    it('email invalid, password valid -> alert message', () => {
      setInput('test.com', 'Abcd1234', 'Abcd1234', '');
      component.onClickConfirm();

      expect(window.alert).toHaveBeenCalledWith('The email address is not valid.');
    });

    it('email valid, password invalid -> alert message', () => {
      setInput('test@test.com', 'abcd1234', 'abcd1234', '');
      component.onClickConfirm();

      expect(window.alert).toHaveBeenCalledWith('The password should be at least 8 characters long and contain at least one upper case letter, one number and one lower case letter');
    });

    it('when signup fails, password and password confirmation should be emptied', () => {
      setInput('invalid email', 'Abcd1234', 'Abcd1234', '');
      component.onClickConfirm();

      const dom = fixture.nativeElement;
      expect(dom.querySelector('#password-input').value).toEqual('');
      expect(dom.querySelector('#confirmation-input').value).toEqual('');
    });
  });
});
