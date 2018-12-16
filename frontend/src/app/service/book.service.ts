import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  candidateUrl = 'https://dapi.kakao.com/v3/search/book';
  interestedUrl = 'api/interested';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getBooksByISBN() {
  }

  getBooksByTitle() {

  }

  getBookByISBN(queryFromUser: string) {
    const headers = new HttpHeaders()
      .set('Authorization', 'KakaoAK 9bd91870c7adbc51b5973c6618123d57');
    const params = new HttpParams()
      .set('query', queryFromUser)
      .set('target', 'isbn');
    return this.http.get<Response>(this.candidateUrl, {headers: headers, params: params}).toPromise();
  }

  getCandidateList(queryFromUser: string) {
    const headers = new HttpHeaders()
      .set('Authorization', 'KakaoAK 9bd91870c7adbc51b5973c6618123d57');
    const params = new HttpParams()
      .set('query', queryFromUser);
    return this.http.get<Response>(this.candidateUrl, {headers: headers, params: params}).toPromise();
  }

  initBook(raw: Book) {
    // Initialize information that is undefined in backend
  }

  setInterestedBook(isbn: string, title: string) {
    return this.http.post<Response>(this.interestedUrl, {'isbn': isbn, 'title': title}).toPromise();
  }

  getInterestedBook() {
    return this.http.get<Book[]>(this.interestedUrl);
  }
}
