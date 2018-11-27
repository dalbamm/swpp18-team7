import { async, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { BookService } from './book.service';

let bookService: BookService;
let httpTestingController: HttpTestingController;
let routerSpy;

describe('BookService', () => {
  routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        BookService,
        {provide: Router, useValue: routerSpy}
      ]
    });
    bookService = TestBed.get(BookService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([BookService], (service: BookService) => {
    expect(service).toBeTruthy();
  }));
});
