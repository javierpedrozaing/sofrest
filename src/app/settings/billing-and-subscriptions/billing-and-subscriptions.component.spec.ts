import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingAndSubscriptionsComponent } from './billing-and-subscriptions.component';

describe('BillingAndSubscriptionsComponent', () => {
  let component: BillingAndSubscriptionsComponent;
  let fixture: ComponentFixture<BillingAndSubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingAndSubscriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingAndSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
