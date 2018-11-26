import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Article } from '../models/article';
import { ArticleService } from '../service/article.service';

import { Book } from '../models/book';
import { BookService } from '../service/book.service';


@Component({
  selector: 'app-candidate-view-in-search',
  templateUrl: './candidate-view-in-search.component.html',
  styleUrls: ['./candidate-view-in-search.component.css']
})

export class CandidateViewInSearchComponent implements OnInit, OnChanges {
  candidateList: Book[]; // CandidateList
  resultList: Article[]; // ArticleList
  displayCandidatesFlag = false;
  displayResultFlag = false;
  displayBookInfo = false;
  testBook: Book;
  testBook2: Book;
  testArticle: Article;
  testArticle2: Article;
  selectedCandidate: Book;
  recentQueryStr: string;

  constructor(
    private router: Router,
    private articleService: ArticleService,
    private bookService: BookService,
  ) { }

  @Input() searchQueryStr: string;
  @Output() searchStartSignalEmitter: EventEmitter<string> = new EventEmitter();

  ngOnInit() {
    this.initSelectedCandidate();
  }

  ngOnChanges(change: SimpleChanges) {
    if (this.recentQueryStr !== this.searchQueryStr && this.searchQueryStr !== undefined && this.searchQueryStr !== '') {
      this.getCandidateResult(this.searchQueryStr.trim());
      this.recentQueryStr = this.searchQueryStr;
    }
  }

  goSalePage() {
    alert('goSalePage clicked');
  }

  onClickSearch() {
    if (this.searchQueryStr === undefined || this.searchQueryStr === '') {
      alert('Input your query in the blank');
    } else {
      this.getCandidateResult(null);
    }
  }

  onClickCandidate(clickedCandidate) {
    const isbn = clickedCandidate.ISBN;
    this.displayBookInfo = true;
    this.selectedCandidate = clickedCandidate;
    console.log('isbn: ' + isbn);
  }
  onClickStartSearch() {
    const isbn = this.selectedCandidate.ISBN;
    if ( this.selectedCandidate.ISBN === undefined ) {
      alert('책을 선택해주세요!');
    } else {
      this.searchStartSignalEmitter.emit(this.selectedCandidate.ISBN);
    }
  }
  onClickGoDirect() {
    alert('GoDirect clicked');
  }

  onClickInterested() {
    alert('Interested clicked');
  }

  onClickResult(clickedResult) {
    const goLink = clickedResult.link;
    console.log('Link: ' + goLink);
    window.open(goLink);
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
    })
    .catch(function(err) {
      console.log('error occured during getSearchResult: ' + err);
    });
  }

  getCandidateResult(que) {
    this.bookService.getCandidateList(que)
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

  initSelectedCandidate() {
    const tmp = new Book;
    this.selectedCandidate = tmp;
  }

}
