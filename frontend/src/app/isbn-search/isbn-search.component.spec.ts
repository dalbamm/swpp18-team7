import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsbnSearchComponent } from './isbn-search.component';

describe('IsbnSearchComponent', () => {
  let component: IsbnSearchComponent;
  let fixture: ComponentFixture<IsbnSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsbnSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsbnSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
