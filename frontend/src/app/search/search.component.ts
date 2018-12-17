import { Component, OnInit, ViewChild } from '@angular/core';
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
  enqueuedSearchQueryBook: Book;
  
  constructor(
    private router: Router,
    private articleService: ArticleService,
    private bookService: BookService,
  ) { }

  ngOnInit() {
  }

  onClickSearch() {
    if (this.searchQueryStr === undefined || this.searchQueryStr === '') {
      alert('Input your query in the blank');
    } else {
      this.enqueuedSearchQueryStr = this.searchQueryStr.trim();
    }
  }

  receiveSearchStartSignal(mayBook) {
    if ( this.isValidISBN(mayBook.ISBN) ) {
      this.enqueuedSearchQueryBook = mayBook;
    } else {
      alert('Please choose a book.');
    }
  }

  isValidISBN(raw) {
    if (raw === '' || raw === undefined) {
      return false;
    }

    if (raw.length !== 10 && raw.length !== 13) {
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

