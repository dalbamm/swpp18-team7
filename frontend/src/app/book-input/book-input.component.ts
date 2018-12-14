import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-input',
  templateUrl: './book-input.component.html',
  styleUrls: ['./book-input.component.css']
})
export class BookInputComponent implements OnInit {
  ISBN: string;
  bookTitle: string;
  bookAuthor: string;
  bookPublisher: string;
  bookPublishedYear: number;
  constructor() { }

  ngOnInit() {
  }
	
  goISBNSearchPage() {
  alert('goISBNSearchPage button is clicked');
  	console.log(this.bookTitle);
  	console.log(this.bookAuthor);
  	console.log(this.bookPublisher);
  	console.log(this.bookPublishedYear);
  }
}
