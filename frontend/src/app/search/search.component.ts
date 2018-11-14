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
  displayBookInfo = false;
  testBook: Book;
  testBook2: Book;
  testArticle: Article;
  testArticle2: Article;
  selectedCandidate: Book;
  constructor(
    private router: Router,
    private articleService: ArticleService,
    private bookService: BookService,
  ) { }

  ngOnInit() {
    // Check if the user is authenticated or not
    // if(authenticated == false)  router.navigateByUrl('')
    this.setTest();
    this.initSelectedCandidate();
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
    this.displayBookInfo = true;
    this.selectedCandidate = clickedCandidate;
    console.log('ipt: ' + isbn);
    // this.getSearchResult(isbn);
  }
  onClickStartSearch() {
    const isbn = this.selectedCandidate.ISBN;
    if ( this.selectedCandidate.ISBN === undefined ) {
      alert('책을 선택해주세요!');
    } else {
      this.getSearchResult(isbn);
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

  setTest() {
    this.testBook = new Book;
    this.testBook.ISBN = '123456789';
    this.testBook.author = 'Sewon Woo';
    this.testBook.imageLink = 'http://beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg';
    this.testBook.marketPrice = 25000;
    this.testBook.publishedYear = 2018;
    this.testBook.publisher = 'SNU Press';
    this.testBook.title = 'How to Crawl 1';

    this.testBook2 = new Book;
    this.testBook2.ISBN = '123456788';
    this.testBook2.author = '김난도';
    this.testBook2.imageLink = 'http://image.kyobobook.co.kr/images/book/large/036/l9788965700036.jpg';
    this.testBook2.marketPrice = 25000;
    this.testBook2.publishedYear = 2011;
    this.testBook2.publisher = 'SNU Press';
    this.testBook2.title = '아프니까 청춘이다';

    this.testArticle = new Article;
    this.testArticle.book = this.testBook;
    this.testArticle.author = 'Flea market 1';
    this.testArticle.link = 'http://beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg';
    this.testArticle.price = 2000;
    this.testArticle.site = 'kyobo';
    this.testArticle.title = 'I want to sell ' + this.testArticle.book.title;

    this.testArticle2 = new Article;
    this.testArticle2.book = this.testBook;
    this.testArticle2.author = 'Flea market 2';
    this.testArticle2.link = 'http://beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg';
    this.testArticle2.price = 4000;
    this.testArticle2.site = 'aladin';
    this.testArticle2.title = 'Get this ' + this.testArticle.book.title;


    let tempbook = new Book();
    tempbook = this.testBook2;
    this.candidateList = [tempbook, tempbook, tempbook, tempbook, tempbook, tempbook, tempbook, tempbook
      , tempbook, tempbook, tempbook, tempbook, tempbook, tempbook, tempbook, tempbook ];
    this.resultList = [this.testArticle, this.testArticle2, this.testArticle, this.testArticle2,
       this.testArticle, this.testArticle, this.testArticle2];
    this.displayResultFlag = true;
    this.displayCandidatesFlag = true;
    // for (let i = 0 ; i < 3 ; ++i) {
    //   this.candidateList[i] = this.testBook;

    //   this.resultList[i] = this.testArticle;
    // }
  }
  initSelectedCandidate() {
    const tmp = new Book;
    this.selectedCandidate = tmp;
  }
}
