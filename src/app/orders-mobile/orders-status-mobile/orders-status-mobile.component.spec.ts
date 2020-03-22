import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersStatusMobileComponent } from './orders-status-mobile.component';

describe('OrdersStatusMobileComponent', () => {
  let component: OrdersStatusMobileComponent;
  let fixture: ComponentFixture<OrdersStatusMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersStatusMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersStatusMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
