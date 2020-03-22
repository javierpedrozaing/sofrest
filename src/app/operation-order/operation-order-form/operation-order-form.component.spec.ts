import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationOrderFormComponent } from './operation-order-form.component';

describe('OperationOrderFormComponent', () => {
  let component: OperationOrderFormComponent;
  let fixture: ComponentFixture<OperationOrderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationOrderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
