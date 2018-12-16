import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../models/book';

@Component({
  selector: 'app-article-input',
  templateUrl: './article-input.component.html',
  styleUrls: ['./article-input.component.css']
})
export class ArticleInputComponent implements OnInit {
  site: string="Boogle";
  title: string;
  author: string;
  price: number;
  
  @Input() book: Book;
  content: string;

  constructor() { }

  ngOnInit() {
  }
}
