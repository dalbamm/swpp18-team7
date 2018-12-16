import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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

  closeResult: string;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
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

  onClickConfirm() {
    alert('onClickConfirm buttons is clicked');
  }
}
