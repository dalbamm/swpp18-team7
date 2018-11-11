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
  candidateList; // CandidateList
  resultList; // ArticleList
  constructor(
    private router: Router
  ) { }
  ngOnInit() {
    // Check if the user is authenticated or not
    // if(authenticated == false)  router.navigateByUrl('')
  }
  goSalePage() {
    alert('goSalePage clicked');
  }
  onClickSearch() {
    if (this.searchQueryStr === undefined || this.searchQueryStr === '') {
      alert('Input your query in the blank');
    } else {
      alert('You want to search ' + this.searchQueryStr);
    // Send a request Backend to get result via ArticleService
    // articleService.send(this.searchQueryStr)
    // this.resultList = articleService.receive(this.searchQueryStr)
    }
  }
  onClickGoDirect() {
    alert('GoDirect clicked');
  }
  onClickInterested() {
    alert('Interested clicked');
  }
  getArticleList() {}
  getCandidateList() {}
}
