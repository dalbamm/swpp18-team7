import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateViewInSearchComponent } from './candidate-view-in-search.component';

describe('CandidateViewInSearchComponent', () => {
  let component: CandidateViewInSearchComponent;
  let fixture: ComponentFixture<CandidateViewInSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateViewInSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateViewInSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
