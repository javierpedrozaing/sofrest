import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceOrderMobileComponent } from './place-order-mobile.component';

describe('PlaceOrderMobileComponent', () => {
  let component: PlaceOrderMobileComponent;
  let fixture: ComponentFixture<PlaceOrderMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceOrderMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceOrderMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
