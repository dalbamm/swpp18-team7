import { Component, OnInit } from '@angular/core';
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
  enqueuedSearchQueryStr: string;
  enqueuedSearchQueryISBN: string;

  constructor(
    private router: Router,
    private articleService: ArticleService,
    private bookService: BookService,
  ) { }

  ngOnInit() {
  }

  goSalePage() {
    alert('goSalePage clicked');
  }

  onClickSearch() {
    if (this.searchQueryStr === undefined || this.searchQueryStr === '') {
      alert('Input your query in the blank');
    } else {
      this.enqueuedSearchQueryStr = this.searchQueryStr;
    }
  }

  onClickGoDirect() {
    alert('GoDirect clicked');
  }

  receiveSearchStartSignal(mayISBN) {
    if ( this.isValidISBN(mayISBN) ) {
      this.enqueuedSearchQueryISBN = mayISBN;
    }
  }

  isValidISBN(raw) {
    if (raw === '' || raw === undefined) {
      return false;
    }

    for ( let i = 0 ; i < raw.length ; ++i ) {
      const cri = raw.charAt(i);
      if ( (cri < '0' || cri > '9') && (cri !== 'X' && cri !== 'x') ) {
        return false;
      }
    }

    return true;

  }
}

