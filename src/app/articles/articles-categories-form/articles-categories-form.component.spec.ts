import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesCategoriesFormComponent } from './articles-categories-form.component';

describe('ArticlesCategoriesFormComponent', () => {
  let component: ArticlesCategoriesFormComponent;
  let fixture: ComponentFixture<ArticlesCategoriesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesCategoriesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesCategoriesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
