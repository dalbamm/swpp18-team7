import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { RouterModule, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CandidateViewInSearchComponent } from '../candidate-view-in-search/candidate-view-in-search.component';
import { ResultViewInSearchComponent } from '../result-view-in-search/result-view-in-search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent, CandidateViewInSearchComponent, ResultViewInSearchComponent ],
      imports: [FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should alert when click goSalePage', () => {
    spyOn(window, 'alert');
    component.goSalePage();
    fixture.autoDetectChanges();
    expect(window.alert).toHaveBeenCalledWith('goSalePage clicked');
  });

  it('should alert when click search', () => {
    spyOn(window, 'alert');
    component.onClickSearch();
    fixture.autoDetectChanges();
    if (component.searchQueryStr === undefined || component.searchQueryStr === '') {
      expect(window.alert).toHaveBeenCalledWith('Input your query in the blank');
    } else {
      expect(component.enqueuedSearchQueryStr).toMatch(component.searchQueryStr);
    }
  });

  it('should alert when click goDirect', () => {
    spyOn(window, 'alert');
    component.onClickGoDirect();
    fixture.autoDetectChanges();
    expect(window.alert).toHaveBeenCalledWith('GoDirect clicked');
  });

  it('should assign enqueuedSearchQueryISBN if the delivered ISBN is valid', () => {
    const raw = '12345X7890';
    component.receiveSearchStartSignal(raw);
    fixture.autoDetectChanges();
    expect(component.enqueuedSearchQueryISBN).toMatch(raw);
  });

  it('should alert if the delivered ISBN is invalid', () => {
    const raw = '!@ASDSDQWE!!23';
    spyOn(window, 'alert');
    component.receiveSearchStartSignal(raw);
    fixture.autoDetectChanges();
    expect(window.alert).toHaveBeenCalledWith('Invalid ISBN.. Please check the requested ISBN');
  });


  it('should return true when the delivered ISBN is valid', () => {
    const validISBN = '123456789X';
    const res = component.isValidISBN(validISBN);
    expect(res === true);
  });

  it('should return false when the delivered ISBN is undefined or empty', () => {
    const invalidISBN = undefined;
    const invalidISBN2 = '';
    const res = component.isValidISBN(invalidISBN);
    const res2 = component.isValidISBN(invalidISBN2);
    expect(res === false && res2 === false);
  });

  it('should return false when the delivered ISBN has an invalid length', () => {
    const invalidISBN = '123456789';
    const invalidISBN2 = '123X56789012';
    const invalidISBN3 = '12345x78901234';
    const res = component.isValidISBN(invalidISBN);
    const res2 = component.isValidISBN(invalidISBN2);
    const res3 = component.isValidISBN(invalidISBN3);
    expect(res === false && res2 === false && res3 === false);
  });

  it('should return false when the delivered ISBN contains invalid characters', () => {
    const invalidISBN = '123456789!';
    const res = component.isValidISBN(invalidISBN);
    expect(res === false);
  });
});
