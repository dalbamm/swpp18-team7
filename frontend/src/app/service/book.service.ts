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
    })
  };
  url = 'api/';
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getBooksByISBN() {
  }

  getBooksByTitle( queryFromUser: String) {
    this.http.get<Book[]>(this.url + queryFromUser);
  }

  getCandidateList() {
  }

  setInterestedBook() {
  }


}
