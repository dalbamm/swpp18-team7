import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  url = 'api/';
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getArticleByISBN() {
  }

  getArticleByAuthor() {
  }

  getExternalArticle(queryFromUser: String) {
      return new Promise(function(resolve, reject) {
        this.http.get(this.url + queryFromUser);
      });
  }

  addArticle() {
  }

  deleteArticle() {
  }

  updateArticle() {
  }

}
