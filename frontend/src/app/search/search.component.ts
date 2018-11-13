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

  onClickCandidate(clickedCandidate) {
    const isbn = clickedCandidate.ISBN;
    console.log('ipt: ' + isbn);
    this.getSearchResult(isbn);
  }

  onClickGoDirect() {
    alert('GoDirect clicked');
  }

  onClickInterested() {
    alert('Interested clicked');
  }

  onClickResult(clickedResult) {
    const goLink = clickedResult.link;
    this.router.navigateByUrl(goLink);
  }

  getArticleList() {  }

  getSearchResult(isbn) {
    this.articleService.getExternalArticles(isbn)
    .then( response => {// Initialize to fulfill missed properties
      return this.initExternalArticles(response);
    })
    .then( processedResponse => {
      // Starts to display result list after the promise is resolved.
      this.resultList = processedResponse;
      this.displayResultFlag = true;
      console.log('displayFlag is renewed');
    })
    .catch(function(err) {
      console.log('error occured during getSearchResult: ' + err);
    });
  }

  getCandidateResult() {
    this.bookService.getCandidateList(this.searchQueryStr)
    .then( response => {
      return this.initBooks(response);
    })
    .then( processedResponse => {
      this.candidateList = processedResponse;
      this.displayCandidatesFlag = true;
    })
    .catch(function(err) {
      console.log('error occured during getCandidateResult: ' + err);
    });
  }

  initExternalArticles(response) {
      const len = response.length;
      for (let i = 0 ; i < len ; ++i) {
        this.articleService.initExternalArticle(response[i]);
      }
      return response;
  }

  initBooks(response: Book[]) {
    const len = response.length;
    for (let i = 0 ; i < len ; ++i) {
      this.bookService.initBook(response[i]);
    }
    return response;
  }

  isValidQuery() {}
}
