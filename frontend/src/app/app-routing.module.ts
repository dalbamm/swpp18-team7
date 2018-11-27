import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';
import { SaleComponent } from './sale/sale.component';
import { IsbnSearchComponent } from './isbn-search/isbn-search.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UserInfoComponent } from './user-info/user-info.component';

const routes: Routes = [
  { path: 'main', component: MainComponent, runGuardsAndResolvers: 'always' },
  { path: 'search', component: SearchComponent },
  { path: 'sale', component: SaleComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'account', component: UserInfoComponent, runGuardsAndResolvers: 'always' },
  { path: '**', redirectTo: '/main', pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
