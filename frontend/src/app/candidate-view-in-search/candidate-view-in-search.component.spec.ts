import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CandidateViewInSearchComponent } from './candidate-view-in-search.component';
import { Book } from '../models/book';
import { BookService } from '../service/book.service';

describe('CandidateViewInSearchComponent', () => {
  let component: CandidateViewInSearchComponent;
  let fixture: ComponentFixture<CandidateViewInSearchComponent>;
  // let bookService: BookService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateViewInSearchComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
      ],
      // providers: [bookService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateViewInSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // bookService = TestBed.get(BookService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign selectedCandidate when onClickCandidate is executed', () => {
    const raw = new Book();
    raw.ISBN = '123456789X';
    component.onClickCandidate(raw);
    fixture.autoDetectChanges();
    expect(component.displayBookInfo === true);
    expect(component.selectedCandidate).toEqual(raw);
  });

  it('should emit the event when onClickStartSearch is executed', () => {
    spyOn(component.searchStartSignalEmitter, 'emit');
    const tmpBook = new Book();
    tmpBook.ISBN = '123456789X';
    component.selectedCandidate = tmpBook;
    component.onClickStartSearch();
    fixture.detectChanges();
    expect(component.searchStartSignalEmitter.emit).toHaveBeenCalledWith(tmpBook.ISBN);
  });

  it('should assign response into candidateList', () => {
    component.getCandidateResult('java');
    expect();
  });
  it('should log error', () => {
    component.getCandidateResult('java');
    expect();
  });
  it('should initBOOKS ', () => {
    component.initBooks([]);
    expect();
  });
  it('should assign selectedCandidate the empty Book instance', () => {
    component.initSelectedCandidate();
    expect(component.selectedCandidate === undefined);
  });
});
