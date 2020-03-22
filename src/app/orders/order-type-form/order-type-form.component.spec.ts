import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTypeFormComponent } from './order-type-form.component';

describe('OrderTypeFormComponent', () => {
  let component: OrderTypeFormComponent;
  let fixture: ComponentFixture<OrderTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
