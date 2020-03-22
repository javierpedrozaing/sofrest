import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentWayListComponent } from './payment-way-list.component';

describe('PaymentWayListComponent', () => {
  let component: PaymentWayListComponent;
  let fixture: ComponentFixture<PaymentWayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentWayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentWayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
