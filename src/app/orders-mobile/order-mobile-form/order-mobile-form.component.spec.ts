import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMobileFormComponent } from './order-mobile-form.component';

describe('OrderMobileFormComponent', () => {
  let component: OrderMobileFormComponent;
  let fixture: ComponentFixture<OrderMobileFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMobileFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMobileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
