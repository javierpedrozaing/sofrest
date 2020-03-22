import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDropoutComponent } from './employee-dropout.component';

describe('EmployeeDropoutComponent', () => {
  let component: EmployeeDropoutComponent;
  let fixture: ComponentFixture<EmployeeDropoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDropoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDropoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
