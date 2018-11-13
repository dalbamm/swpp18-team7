import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultViewInSearchComponent } from './result-view-in-search.component';

describe('ResultViewInSearchComponent', () => {
  let component: ResultViewInSearchComponent;
  let fixture: ComponentFixture<ResultViewInSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultViewInSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultViewInSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
