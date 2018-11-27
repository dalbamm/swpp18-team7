import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-input',
  templateUrl: './book-input.component.html',
  styleUrls: ['./book-input.component.css']
})
export class BookInputComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  goISBNSearchPage() {
  	alert('goISBNSearchPage button is clicked');
  }
}
