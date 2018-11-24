import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from './/app-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SearchComponent } from './search/search.component';
import { SignupComponent } from './signup/signup.component';

import { BookService } from './service/book.service';
import { CandidateViewInSearchComponent } from './candidate-view-in-search/candidate-view-in-search.component';
import { ResultViewInSearchComponent } from './result-view-in-search/result-view-in-search.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SigninComponent,
    SearchComponent,
    SignupComponent,
    CandidateViewInSearchComponent,
    ResultViewInSearchComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    HttpClient,
    BookService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
