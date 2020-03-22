import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTypeListComponent } from './order-type-list.component';

describe('OrderTypeListComponent', () => {
  let component: OrderTypeListComponent;
  let fixture: ComponentFixture<OrderTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
