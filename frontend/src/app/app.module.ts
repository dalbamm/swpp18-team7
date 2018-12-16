import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from './/app-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SearchComponent } from './search/search.component';
import { SignupComponent } from './signup/signup.component';

import { BookService } from './service/book.service';
import { CandidateViewInSearchComponent } from './candidate-view-in-search/candidate-view-in-search.component';
import { ResultViewInSearchComponent } from './result-view-in-search/result-view-in-search.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { SaleComponent } from './sale/sale.component';
import { BookInputComponent } from './book-input/book-input.component';
import { ArticleInputComponent } from './article-input/article-input.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SigninComponent,
    SearchComponent,
    SignupComponent,
    CandidateViewInSearchComponent,
    ResultViewInSearchComponent,
    UserInfoComponent,
    SaleComponent,
    BookInputComponent,
    ArticleInputComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken'
    })
  ],
  providers: [
    HttpClient,
    BookService,
    HttpClientXsrfModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
