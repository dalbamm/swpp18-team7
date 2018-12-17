import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Article } from '../models/article';
import { ArticleService } from '../service/article.service';

import { Book } from '../models/book';
import { BookService } from '../service/book.service';

import { UserService } from '../service/user.service';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Component({
  selector: 'app-result-view-in-search',
  templateUrl: './result-view-in-search.component.html',
  styleUrls: ['./result-view-in-search.component.css']
})
export class ResultViewInSearchComponent implements OnInit, OnChanges {
  resultList: Article[]; // ArticleList
  displayResultFlag = 0; //0: empty, 1: loading, 2: no results, 3: results
  recentSearchQueryBook: Book;
  resultSize = 0;
  minPrice = 0;
  maxPrice = 0;
  constructor(
    private router: Router,
    private articleService: ArticleService,
    private bookService: BookService,
    private userService: UserService,
  ) { }

  @Input() searchQueryBook: Book;

  ngOnInit() {
  }

  ngOnChanges(change: SimpleChanges) {
    if (this.searchQueryBook !== undefined && this.recentSearchQueryBook !== this.searchQueryBook && this.searchQueryBook.ISBN !== '') {
      console.log(this.searchQueryBook.ISBN);
      this.getSearchResult(this.searchQueryBook.ISBN);
      this.recentSearchQueryBook = this.searchQueryBook;
    }
  }

  onClickInterested() {
    if (this.userService.getSignedIn()) {
      this.bookService.setInterestedBook(
        this.searchQueryBook.ISBN,
        this.searchQueryBook.title)
        .then(response => {
          alert('관심책 목록에 등록되었습니다.');
          return response;
        })
        .catch(function(err) {
          if(err.status===409){
            alert('이미 관심책으로 등록된 책입니다.');
          }
          else{
            console.log('error in setInterestedBook: ' + err);
          }
        });
    } else {
      alert('관심책 등록 기능은 로그인해야 이용할 수 있습니다.');
    }
  }

  onClickResult(clickedResult) {
    const goLink = clickedResult.link;
    console.log('Link: ' + goLink);
    window.open(goLink);
  }

  getSearchResult(isbn) {
    this.displayResultFlag = 1;
    this.articleService.getExternalArticles(isbn)
    .then( response => {// Initialize to fulfill missed properties
      // return this.initExternalArticles(response);
      return response;
    })
    .then( processedResponse => {
      // Starts to display result list after the promise is resolved.
      this.resultList = processedResponse.sort(function(a, b) { return a.price - b.price; });
      if(processedResponse.length === 0){
        this.displayResultFlag = 2;
      }  else {
        // this.resultList = this.resultList.sort();
        this.resultSize = this.resultList.length;
        this.minPrice = this.resultList[0].price;
        this.maxPrice = this.resultList[this.resultSize - 1].price;
        this.displayResultFlag = 3;
      }
    })
    .catch(function(err) {
      console.log('error occured during getSearchResult: ' + err);
    });
  }

}
