import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQueryStr: string //Will be binded with searchInput
  candidateList//: CandidateList
  resultList//: ArticleList
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    // Check if the user is authenticated or not
    //if(authenticated == false)  router.navigateByUrl('')
  }
  goSalePage(){
    alert("goSalePage clicked")
  }
  onClickSearch(){
    alert("You want to search "+this.searchQueryStr)
    //Send a request Backend to get result via ArticleService
    //articleService.send(this.searchQueryStr)
    //this.resultList = articleService.receive(this.searchQueryStr)
  }
  onClickGoDirect(){
    alert("GoDirect clicked")
  }
  onClickInterested(){
    alert("Interested clicked")
  }
  getArticleList(){}
  getCandidateList(){}
}
