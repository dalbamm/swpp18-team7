import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BookService } from '../service/book.service';
import { ArticleService } from '../service/article.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  constructor(
  	private router: Router,
  	private articleService: ArticleService,
  	private bookService: BookService
  ) { }

  ngOnInit() {
  }

  goSearchPage() {
  	this.router.navigateByUrl('search');
  }

}
