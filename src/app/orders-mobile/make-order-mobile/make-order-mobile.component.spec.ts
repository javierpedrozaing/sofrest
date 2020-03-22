import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeOrderMobileComponent } from './make-order-mobile.component';

describe('MakeOrderMobileComponent', () => {
  let component: MakeOrderMobileComponent;
  let fixture: ComponentFixture<MakeOrderMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeOrderMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeOrderMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
