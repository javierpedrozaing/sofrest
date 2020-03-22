import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishCategoryFormComponent } from './dish-category-form.component';

describe('DishCategoryFormComponent', () => {
  let component: DishCategoryFormComponent;
  let fixture: ComponentFixture<DishCategoryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishCategoryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
