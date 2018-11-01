import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'search', component: SearchComponent },
  { path: 'signin', component: SigninComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
