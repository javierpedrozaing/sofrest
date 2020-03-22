import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersGridMobileComponent } from './orders-grid-mobile.component';

describe('OrdersGridMobileComponent', () => {
  let component: OrdersGridMobileComponent;
  let fixture: ComponentFixture<OrdersGridMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersGridMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersGridMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
