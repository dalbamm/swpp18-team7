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
  displayFlag = false;
  constructor(
    private router: Router,
    private articleService: ArticleService,
    private bookService: BookService,
  ) { }
  ngOnInit() {
    // Check if the user is authenticated or not
    // if(authenticated == false)  router.navigateByUrl('')
  }
  goSalePage() {
    alert('goSalePage clicked');
  }
  onClickSearch() {
    this.displayFlag = false;
    if (this.searchQueryStr === undefined || this.searchQueryStr === '') {
      alert('Input your query in the blank');
    } else {
      alert('You want to search ' + this.searchQueryStr);
      this.getSearchResult();
    }
  }
  onClickGoDirect() {
    alert('GoDirect clicked');
  }
  onClickInterested() {
    alert('Interested clicked');
  }
  getArticleList() {  }
  getSearchResult() {
    this.articleService.getExternalArticle(this.searchQueryStr.trim())
    .then( // Initialize to fulfill missed properties
      this.initExternalArticles)
    .then( function(response) {
      // Starts to display result list after the promise is resolved.
      this.displayFlag = true;
      console.log('displayFlag is renewed');
    })
    .catch(function(err) {
      console.log('error occured during getSearchResult: ' + err);
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

  isValidQuery() {}
}
