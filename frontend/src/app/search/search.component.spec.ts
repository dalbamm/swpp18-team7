import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { RouterModule, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent],
      imports: [FormsModule,
      RouterTestingModule]
    })
    .compileComponents()
    }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should alert when click goSalePage', () => {
    spyOn(window,"alert");
    component.goSalePage();
    fixture.autoDetectChanges();
    expect(window.alert).toHaveBeenCalledWith("goSalePage clicked");
  });

  it('should alert when click search', () => {
    spyOn(window,"alert");
    component.onClickSearch();
    fixture.autoDetectChanges();
    if(component.searchQueryStr===undefined || component.searchQueryStr==="")
      expect(window.alert).toHaveBeenCalledWith("Input your query in the blank");
    else
      expect(window.alert).toHaveBeenCalledWith("You want to search "+component.searchQueryStr);
  });

  it('should alert when click goDirect', () => {
    spyOn(window,"alert");
    component.onClickGoDirect();
    fixture.autoDetectChanges();
    expect(window.alert).toHaveBeenCalledWith("GoDirect clicked");
  });

  it('should alert when click Interested', () => {
    spyOn(window,"alert");
    component.onClickInterested();
    fixture.autoDetectChanges();
    expect(window.alert).toHaveBeenCalledWith("Interested clicked");
  });

  
});
