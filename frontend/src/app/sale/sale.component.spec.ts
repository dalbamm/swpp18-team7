import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterModule, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SaleComponent } from './sale.component';
import { BookInputComponent } from '../book-input/book-input.component';
import { ArticleInputComponent } from '../article-input/article-input.component';

describe('SaleComponent', () => {
  let component: SaleComponent;
  let fixture: ComponentFixture<SaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleComponent, BookInputComponent, ArticleInputComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
