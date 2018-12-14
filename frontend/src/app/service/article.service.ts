import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { Article } from '../models/article';
import { query } from '@angular/core/src/render3/query';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token',
    })
  };
  //url = 'api/search/isbn/';
  url = 'http://54.180.117.120:8000/api/search/isbn/';
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getArticleByISBN() {
  }

  getArticleByAuthor() {
  }

  getExternalArticles(isbn: String): Promise<Article[]> {
    return this.http.get<Article[]>(this.url + isbn, this.httpOptions)
    .toPromise();
  }

  initExternalArticle(raw: Article) {
    // raw.external = true;
    // price and link would be directly initialized by httpResponse
    // other properties should be initialized using ISBN
  }

  addArticle() {
  }

  deleteArticle() {
  }

  updateArticle() {
  }

}
