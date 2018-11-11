import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Article } from '../models/article';
import { ArticleService } from '../service/article.service';

import { Book } from '../models/book';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQueryStr: string; // Will be binded with searchInput
  candidateList: Book[]; // CandidateList
  resultList: Article[]; // ArticleList
  displayCandidatesFlag = false;
  displayResultFlag = false;
  testBook: Book;
  constructor(
    private router: Router,
    private articleService: ArticleService,
    private bookService: BookService,
  ) { }

  ngOnInit() {
    // Check if the user is authenticated or not
    // if(authenticated == false)  router.navigateByUrl('')
    this.testBook = new Book;
    this.testBook.ISBN = '123';
  }

  goSalePage() {
    alert('goSalePage clicked');
  }

  onClickSearch() {
    if (this.searchQueryStr === undefined || this.searchQueryStr === '') {
      alert('Input your query in the blank');
    } else {
      this.getCandidateResult();
    }
  }

  onClickCandidate(isbn) {
    console.log('ipt: ' + isbn);
    this.getSearchResult(isbn);
  }

  onClickGoDirect() {
    alert('GoDirect clicked');
  }

  onClickInterested() {
    alert('Interested clicked');
  }

  getArticleList() {  }

  getSearchResult(isbn) {
    this.articleService.getExternalArticle(this.searchQueryStr.trim(), isbn)
    .then( function(response) {// Initialize to fulfill missed properties
      this.initExternalArticles(response);
    })
    .then( function(response) {
      // Starts to display result list after the promise is resolved.
      this.displayFlag = true;
      console.log('displayFlag is renewed');
    })
    .catch(function(err) {
      console.log('error occured during getSearchResult: ' + err);
    });
  }

  getCandidateResult() {
    this.bookService.getCandidateList(this.searchQueryStr)
    .then(function(response) {
      this.initBooks(response);
    })
    .then(function(response) {
      this.candidateList = response;
      this.displayCandidatesFlag = true;
    })
    .catch(function(err) {
      console.log('error occured during getCandidateResult: ' + err);
    });
  }

  initExternalArticles(response) {
    return new Promise(function(resolve, reject) {
      console.log('response: ' + response);
      const len = response.length;
      for (let i = 0 ; i < len ; ++i) {
        this.articleService.initExternalArticle(response[i]);
      }
      this.resultList = response;
      resolve(response);
    });
  }

  initBooks(response) {
    return new Promise(function(resolve, reject) {
      console.log('response: ' + response);
      const len = response.length;
      for (let i = 0 ; i < len ; ++i) {
        this.bookService.initBook(response[i]);
      }
      this.candidateList = response;
      resolve(response);
    });
  }

  isValidQuery() {}
}
