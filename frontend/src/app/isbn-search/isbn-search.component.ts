import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-isbn-search',
  templateUrl: './isbn-search.component.html',
  styleUrls: ['./isbn-search.component.css']
})
export class IsbnSearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  goBarcodeUploadPage() {
    alert('goBarcodeUploadPage button is clicked');
  }

  onClickISBNSearch() {
    alert('onClickISBNSearch button is clicked');
  }

  onClickCancel() {
    alert('onClickCancel button is clicked');
  }

  onClickConfirm() {
    alert('onClickConfirm button is clicked');
  }
}
