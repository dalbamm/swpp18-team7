import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ MainComponent ],
      providers: [
        {provide: Router, useValue: routerSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render two buttons', () => {
    expect(fixture.nativeElement.querySelector('#sale-button')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('#search-button')).toBeTruthy();
  });

  it('should redirect to search page when search button is clicked', () => {
    component.onClickSearchButton();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('search');
  });
});
