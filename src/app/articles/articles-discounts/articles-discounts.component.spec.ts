import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesDiscountsComponent } from './articles-discounts.component';

describe('ArticlesDiscountsComponent', () => {
  let component: ArticlesDiscountsComponent;
  let fixture: ComponentFixture<ArticlesDiscountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesDiscountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
