import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationOrderListComponent } from './operation-order-list.component';

describe('OperationOrderListComponent', () => {
  let component: OperationOrderListComponent;
  let fixture: ComponentFixture<OperationOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
