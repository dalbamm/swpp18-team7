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
  url = 'api/search/';
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getArticleByISBN() {
  }

  getArticleByAuthor() {
  }

  getExternalArticle(queryFromUser: String): Promise<Article[]> {
    return this.http.get<Article[]>(this.url + queryFromUser.trim(), this.httpOptions)
    .toPromise()
    .then(); // Reform a response into the valid form.
  }

  addArticle() {
  }

  deleteArticle() {
  }

  updateArticle() {
  }

}
