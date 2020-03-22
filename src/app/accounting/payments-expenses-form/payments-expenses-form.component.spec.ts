import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsExpensesFormComponent } from './payments-expenses-form.component';

describe('PaymentsExpensesFormComponent', () => {
  let component: PaymentsExpensesFormComponent;
  let fixture: ComponentFixture<PaymentsExpensesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsExpensesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsExpensesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
