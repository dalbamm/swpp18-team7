import { async, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { ArticleService } from './article.service';
import { Article } from '../models/article';

let articleService: ArticleService;
let httpTestingController: HttpTestingController;
let routerSpy;

describe('ArticleService', () => {
  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        ArticleService,
        {provide: Router, useValue: routerSpy}]
    });

    articleService = TestBed.get(ArticleService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([ArticleService], (service: ArticleService) => {
    expect(service).toBeTruthy();
  }));
});

describe(': getExternalArticles', () => {
  it('should sign in user', async(() => {
    const testIsbn = '123456789';
    articleService.getExternalArticles(testIsbn);
    const reqGetExternalArticle = httpTestingController.expectOne(articleService.url + testIsbn);
    expect(reqGetExternalArticle.request.method).toEqual('GET');
    // reqGetExternalArticle.flush({status: 204});
  }));
});

