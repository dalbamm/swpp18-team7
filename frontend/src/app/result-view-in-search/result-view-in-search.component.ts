import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Article } from '../models/article';
import { ArticleService } from '../service/article.service';

import { Book } from '../models/book';
import { BookService } from '../service/book.service';

import { UserService } from '../service/user.service';

@Component({
  selector: 'app-result-view-in-search',
  templateUrl: './result-view-in-search.component.html',
  styleUrls: ['./result-view-in-search.component.css']
})
export class ResultViewInSearchComponent implements OnInit, OnChanges {
  resultList: Article[]; // ArticleList
  displayResultFlag = 0; //0: empty, 1: loading, 2: no results, 3: results
  recentSearchQueryBook: Book;

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
          console.log('sucessfully posted.');
          return response;
        })
        .catch(function(err) {
          console.log('error in setInterestedBook: ' + err);
        });
    } else {
      alert('You need to be signed in to use this feature.');
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
      this.resultList = processedResponse;
      if(processedResponse.length === 0){
        this.displayResultFlag = 2;
      }  else {
        this.displayResultFlag = 3;
      }
    })
    .catch(function(err) {
      console.log('error occured during getSearchResult: ' + err);
    });
  }

  // Not used yet.
  // initExternalArticles(response) {
  //     const len = response.length;
  //     for (let i = 0 ; i < len ; ++i) {
  //       this.articleService.initExternalArticle(response[i]);
  //     }
  //     return response;
  // }

}
