import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAmdComponent } from './employee-amd.component';

describe('EmployeeAmdComponent', () => {
  let component: EmployeeAmdComponent;
  let fixture: ComponentFixture<EmployeeAmdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAmdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAmdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
