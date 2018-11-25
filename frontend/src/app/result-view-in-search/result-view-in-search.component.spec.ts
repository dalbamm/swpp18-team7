import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ResultViewInSearchComponent } from './result-view-in-search.component';

describe('ResultViewInSearchComponent', () => {
  let component: ResultViewInSearchComponent;
  let fixture: ComponentFixture<ResultViewInSearchComponent>;
  let routerStub;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultViewInSearchComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ResultViewInSearchComponent);
    component = fixture.componentInstance;
    routerStub = TestBed.get(Router);
    fixture.detectChanges();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultViewInSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
