import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishCategoryListComponent } from './dish-category-list.component';

describe('DishCategoryListComponent', () => {
  let component: DishCategoryListComponent;
  let fixture: ComponentFixture<DishCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
