import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Response } from '@angular/http';

import { Book } from '../models/book';
import { ArticleService } from '../service/article.service';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-book-input',
  templateUrl: './book-input.component.html',
  styleUrls: ['./book-input.component.css']
})
export class BookInputComponent implements OnInit {

  ISBN: string;
  book: Book = null;
  bookTitle: string;
  bookAuthor: string;
  bookPublisher: string;
  bookPublishedYear: number;

  queryString: string;
  displayFlag: boolean;
  closeResult: string;

  @Output() bookEmitter: EventEmitter<Book> = new EventEmitter();

  constructor(
  	private modalService: NgbModal,
  	private articleService: ArticleService,
  	private bookService: BookService,
  ) { }

  ngOnInit() {
  	this.displayFlag = false;
  }

  open(content) {
  	this.modalService.open(content, {ariaLabelledBy: 'isbn-search-title'}).result.then((result) => {
  	  this.closeResult = 'Closed with: ${result}';
  	}, (reason) => {
  	  this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
  	});
  }

  private getDismissReason(reason: any): string {
  	if (reason === ModalDismissReasons.ESC) {
  	  return 'by pressing ESC';
  	} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  	  return 'by clicking on a backdrop';
  	} else {
  	  return 'with: ${reason}';
  	}
  }

  getBookByISBN(query) {
  	this.bookService.getBookByISBN(query)
      .then((response: Response) => {
	      this.book = this.initBook(response);
	      this.displayFlag = true;
      })
      .catch(function(err) {
        console.log('error occurred during getBookResult: ' + err);
      });
  }

  initBook(response: Response): Book {
    const len = response['documents'].length;
    if (len == 0) return null;

	var resp = response['documents'][0];
	var respBook = {
	  ISBN: resp['isbn'].split(' ')[1],
      imageLink: resp['thumbnail'],
	  title: resp['title'],
	  author: resp['authors'],
	  publisher: resp['publisher'],
	  publishedYear: resp['datetime'].split('-')[0],
	  marketPrice: resp['price']
	} as Book;

    return respBook;
  }

  onClickISBNSearch() {
  	this.getBookByISBN(this.queryString);
  }

  emitBook() {
    if ( this.book === undefined || this.book === null) {
      alert('Invalid Book');
    } else {
      // const isbn = this.selectedCandidate.ISBN;
      // this.searchStartSignalEmitter.emit(isbn);
      this.bookEmitter.emit(this.book);
    }
  }

  onClickConfirm() {
  	if (this.book === undefined || this.book === null) {
  	  alert('you haven\'t searched yet.');
  	  return;
  	}

  	this.bookTitle = this.book['title'];
  	this.bookAuthor = this.book['author'];
  	this.bookPublisher = this.book['publisher'];
  	this.bookPublishedYear = this.book['publishedYear'] as number;
  	this.emitBook();
  }
}
