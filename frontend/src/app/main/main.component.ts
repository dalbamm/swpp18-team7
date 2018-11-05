import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  goSalePage(): void {
    alert("sale button is clicked");
  }

  goSearchPage(): void {
    this.router.navigateByUrl("/search")
  }
}
