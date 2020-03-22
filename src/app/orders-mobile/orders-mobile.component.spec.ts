import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersMobileComponent } from './orders-mobile.component';

describe('OrdersMobileComponent', () => {
  let component: OrdersMobileComponent;
  let fixture: ComponentFixture<OrdersMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
