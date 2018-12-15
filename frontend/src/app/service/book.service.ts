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
  //url = 'api/search/candidates/';
  url = 'https://dapi.kakao.com/v3/search/book';
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getBooksByISBN() {
  }

  getBooksByTitle() {

  }

  //getCandidateList(queryFromUser: String) {
  //  return this.http.get<Book[]>(this.url + queryFromUser.trim())
	  //	  .toPromise();
	  //}
  getCandidateList(queryFromUser: string) {
    const headers = new HttpHeaders()
      .set('Authorization', 'KakaoAK 9bd91870c7adbc51b5973c6618123d57');
    const params = new HttpParams()
      .set('query', queryFromUser);
    return this.http.get<Response>(this.url, {headers: headers, params: params}).toPromise();
  }

  initBook(raw: Book) {
    // Initialize information that is undefined in backend
  }

  setInterestedBook() {
  }


}
