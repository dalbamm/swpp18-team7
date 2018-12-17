import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { BookInputComponent } from '../book-input/book-input.component';
import { ArticleInputComponent } from '../article-input/article-input.component';
import { Article } from '../models/article';
import { Book } from '../models/book';

import { UserService } from '../service/user.service';
import { BookService } from '../service/book.service';
import { ArticleService } from '../service/article.service';


@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
  })

export class SaleComponent implements OnInit {

  @ViewChild(BookInputComponent)
  private bookInputComponent: BookInputComponent;

  @ViewChild(ArticleInputComponent)
  private articleInputComponent: ArticleInputComponent;

  private saleBook: Book;
  private saleArticle: Article;

  book: Book;

  constructor(
  	private router: Router,
    private userService: UserService,
  	private articleService: ArticleService,
	  private bookService: BookService,
	  private location: Location,
  ) { }
  
  ngOnInit() {
  }

  onClickCancel(){
  	this.location.back();
  }

  setBook(book: Book) {
    this.book = book;
  }

  bookInputValidCheck(): boolean {
    if (this.bookInputComponent.bookTitle === undefined || 
        this.bookInputComponent.bookTitle === null ||
        this.bookInputComponent.bookAuthor === undefined || 
        this.bookInputComponent.bookAuthor === null ||
        this.bookInputComponent.bookPublisher === undefined || 
        this.bookInputComponent.bookPublisher === null ||
        this.bookInputComponent.bookPublishedYear === undefined || 
        this.bookInputComponent.bookPublishedYear === null)
      return false;
    else return true;
  }

  articleInputValidCheck(): boolean {
    if (this.articleInputComponent.title === undefined ||
        this.articleInputComponent.title === null ||
        this.articleInputComponent.price === undefined ||
        this.articleInputComponent.price === null)
      return false;
    else return true;
  }

  onClickRegister(){
    if (!this.bookInputValidCheck()) {
      alert("Invalid Book Info");
      return;
    }
    if (!this.articleInputValidCheck()) {
      alert("Invalid Article Info");
      return;
    }

    if (!confirm('정말 등록하시겠습니까?')) return;

    if (this.book === undefined || this.book === null) {
      this.saleBook = new Book;
      this.saleBook.ISBN = this.bookInputComponent.ISBN;
      this.saleBook.title = this.bookInputComponent.bookTitle;  
      this.saleBook.author = this.bookInputComponent.bookAuthor;  
      this.saleBook.publisher = this.bookInputComponent.bookPublisher;  
      this.saleBook.publishedYear = this.bookInputComponent.bookPublishedYear;  
    } else {
      this.saleBook = this.book;
    }

  	this.saleArticle = new Article;
  	this.saleArticle.site = this.articleInputComponent.site;
  	this.saleArticle.title = this.articleInputComponent.title;	
  	this.saleArticle.author = this.articleInputComponent.author;	
  	this.saleArticle.price = this.articleInputComponent.price;	
    this.saleArticle.content = this.articleInputComponent.content;
  	this.saleArticle.book = this.saleBook;
    this.saleArticle.articleAuthor = this.userService.getCurrentUser();

    this.articleService.addArticle(this.saleArticle);
  }
}
