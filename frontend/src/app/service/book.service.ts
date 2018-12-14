import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token',
    })
  };
  //url = 'api/search/candidates/';
  url = 'http://54.180.117.120:8000/api/search/candidates/';
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getBooksByISBN() {
  }

  getBooksByTitle() {

  }

  getCandidateList(queryFromUser: String) {
    return this.http.get<Book[]>(this.url + queryFromUser.trim())
    .toPromise();
  }

  initBook(raw: Book) {
    // Initialize information that is undefined in backend
  }

  setInterestedBook() {
  }


}
