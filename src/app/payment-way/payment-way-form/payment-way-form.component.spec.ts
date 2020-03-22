import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentWayFormComponent } from './payment-way-form.component';

describe('PaymentWayFormComponent', () => {
  let component: PaymentWayFormComponent;
  let fixture: ComponentFixture<PaymentWayFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentWayFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentWayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
