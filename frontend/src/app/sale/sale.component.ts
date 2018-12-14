import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { BookInputComponent } from '../book-input/book-input.component';
import { ArticleInputComponent } from '../article-input/article-input.component';
import { Article } from '../models/article';
import { Book } from '../models/book';

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

  constructor(
  	private router: Router,
  	private articleService: ArticleService,
	private bookService: BookService,
	private location: Location,
  ) { }
  
  ngOnInit() {
  }
  //  ngAfterViewInit() {} 
  goSearchPage() {
  	this.router.navigateByUrl('search');
  }
  onClickCancel(){
  	this.location.back();
  }
  onClickRegister(){
	this.saleArticle = new Article;
	this.saleArticle.site = this.articleInputComponent.site;
	this.saleArticle.title = this.articleInputComponent.title;	
	this.saleArticle.author = this.articleInputComponent.author;	
	this.saleArticle.price = this.articleInputComponent.price;	
	this.saleArticle.link = this.articleInputComponent.link;	

	this.saleBook = new Book;
	this.saleBook.ISBN = this.bookInputComponent.ISBN;
	this.saleBook.title = this.bookInputComponent.bookTitle;	
	this.saleBook.author = this.bookInputComponent.bookAuthor;	
	this.saleBook.publisher = this.bookInputComponent.bookPublisher;	
	this.saleBook.publishedYear = this.bookInputComponent.bookPublishedYear;	
	this.saleArticle.content = this.articleInputComponent.content;

	console.log("saleBook:"+this.saleBook.ISBN);
	console.log("saleBook:"+this.saleBook.title);
	console.log("saleBook:"+this.saleBook.author);
	console.log("saleBook:"+this.saleBook.publisher);
	console.log("saleBook:"+this.saleBook.publishedYear);
	console.log("saleArticle:"+this.saleArticle.site);
	console.log("saleArticle:"+this.saleArticle.price);
	console.log("saleArticle:"+this.saleArticle.content);
  }
}
