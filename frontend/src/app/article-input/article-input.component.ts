import { Component, OnInit } from '@angular/core';

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
  link: string;
  
  content: string;

  constructor() { }

  ngOnInit() {
  }
  postArticle() {
  	console.log('test success');	
  }
}
