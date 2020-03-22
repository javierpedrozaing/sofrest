import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayPosComponent } from './pay-pos.component';

describe('PayPosComponent', () => {
  let component: PayPosComponent;
  let fixture: ComponentFixture<PayPosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayPosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
