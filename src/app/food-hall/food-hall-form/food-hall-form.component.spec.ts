import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodHallFormComponent } from './food-hall-form.component';

describe('FoodHallFormComponent', () => {
  let component: FoodHallFormComponent;
  let fixture: ComponentFixture<FoodHallFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodHallFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodHallFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
