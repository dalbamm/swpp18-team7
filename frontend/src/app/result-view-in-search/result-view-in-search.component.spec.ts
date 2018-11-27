import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ResultViewInSearchComponent } from './result-view-in-search.component';
import { Article } from '../models/article';

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

  it('should alert when onClickInterested is executed', () => {
    spyOn(window, 'alert');
    component.onClickInterested();
    fixture.detectChanges();
    expect(window.alert).toHaveBeenCalledWith('Interested clicked');
  });

  it('should open new window with the appropriate address when onClickResult is executed', () => {
    const tmpArticle = new Article();
    tmpArticle.link = 'https://www.naver.com';
    spyOn(window, 'open');
    component.onClickResult(tmpArticle);
    fixture.detectChanges();
    expect(window.open).toHaveBeenCalledWith('https://www.naver.com');
  });

  it('should alert when getSearchResult is executed', () => {
    spyOn(window, 'alert');
    component.getSearchResult('123456789x');
    fixture.detectChanges();
    // expect(window.alert).toHaveBeenCalledWith('Interested clicked');
  });

});
