import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

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
  candidateList: Book[];
  displayCandidatesFlag = false;
  displayBookInfo = false;
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

  onClickCandidate(clickedCandidate) {
    this.displayBookInfo = true;
    this.selectedCandidate = clickedCandidate;
  }

  onClickStartSearch() {
    if ( this.selectedCandidate === undefined || this.selectedCandidate === null) {
      alert('Choose a book among the candidates');
    } else {
      const isbn = this.selectedCandidate.ISBN;
      this.searchStartSignalEmitter.emit(isbn);
    }
  }

  //  getCandidateResult(que) {
  //  this.bookService.getCandidateList(que)
  //  .then( response => {
  //    return this.initBooks(response);
  //  })
  //  .then( processedResponse => {
  //    this.candidateList = processedResponse;
  //    this.displayCandidatesFlag = true;
  //  })
  //  .catch(function(err) {
  //    console.log('error occured during getCandidateResult: ' + err);
  //  });
  // }

  getCandidateResult(que) {
    this.bookService.getCandidateList(que)
      .then((response: Response) => {
	this.candidateList = this.initBooks(response);
	this.displayCandidatesFlag = true;
      })
      .catch(function(err) {
        console.log('error occurred during getCandidateResult: ' + err);
      });
  }

  initBooks(response: Response): Book[] {
    const len = response['documents'].length;
    var resultBooks: Book[] = [];

    for (var i = 0; i < len; i++) {
      var resp = response['documents'][i];
      var respBook = {
        ISBN: resp['isbn'].split(' ')[1],
	imageLink: resp['thumbnail'],
	title: resp['title'],
	author: resp['authors'],
	publisher: resp['publisher'],
	publishedYear: resp['datetime'].split('-')[0],
	marketPrice: resp['price']
      } as Book;
      resultBooks.push(respBook);
    }
    return resultBooks;
  }


  //initBooks(response: Book[]) {
  //  const len = response.length;
  //  for (let i = 0 ; i < len ; ++i) {
  //    this.bookService.initBook(response[i]);
  //  }
  //  return response;
  // }

  initSelectedCandidate() {
    const tmp = new Book();
    this.selectedCandidate = tmp;
  }

}
