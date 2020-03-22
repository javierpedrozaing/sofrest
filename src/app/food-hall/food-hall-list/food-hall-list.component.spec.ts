import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodHallListComponent } from './food-hall-list.component';

describe('FoodHallListComponent', () => {
  let component: FoodHallListComponent;
  let fixture: ComponentFixture<FoodHallListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodHallListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodHallListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
