import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesCategoriesComponent } from './articles-categories.component';

describe('ArticlesCategoriesComponent', () => {
  let component: ArticlesCategoriesComponent;
  let fixture: ComponentFixture<ArticlesCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
