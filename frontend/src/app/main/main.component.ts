import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  goSalePage(): void {
    alert('sale button is clicked');
  }

  goSearchPage(): void {
    alert('search button is clicked');
  }
}
