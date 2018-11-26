import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Article } from '../models/article';
import { ArticleService } from '../service/article.service';

import { Book } from '../models/book';
import { BookService } from '../service/book.service';


@Component({
  selector: 'app-result-view-in-search',
  templateUrl: './result-view-in-search.component.html',
  styleUrls: ['./result-view-in-search.component.css']
})
export class ResultViewInSearchComponent implements OnInit, OnChanges {
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
  recentSearchQueryISBN: string;

  constructor(
    private router: Router,
    private articleService: ArticleService,
    private bookService: BookService,
  ) { }

  @Input() searchQueryISBN: string;

  ngOnInit() {
  }

  ngOnChanges(change: SimpleChanges) {
    if (this.searchQueryISBN !== undefined && this.recentSearchQueryISBN !== this.searchQueryISBN && this.searchQueryISBN !== '') {
      console.log(this.searchQueryISBN);
      this.getSearchResult(this.searchQueryISBN);
      this.recentSearchQueryISBN = this.searchQueryISBN;
    }
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

  initExternalArticles(response) {
      const len = response.length;
      for (let i = 0 ; i < len ; ++i) {
        this.articleService.initExternalArticle(response[i]);
      }
      return response;
  }

  isValidQuery() {}

}
