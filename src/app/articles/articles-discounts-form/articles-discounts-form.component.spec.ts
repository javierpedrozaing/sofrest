import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesDiscountsFormComponent } from './articles-discounts-form.component';

describe('ArticlesDiscountsFormComponent', () => {
  let component: ArticlesDiscountsFormComponent;
  let fixture: ComponentFixture<ArticlesDiscountsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesDiscountsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesDiscountsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
