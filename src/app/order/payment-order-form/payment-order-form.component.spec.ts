import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOrderFormComponent } from './payment-order-form.component';

describe('PaymentOrderFormComponent', () => {
  let component: PaymentOrderFormComponent;
  let fixture: ComponentFixture<PaymentOrderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentOrderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
