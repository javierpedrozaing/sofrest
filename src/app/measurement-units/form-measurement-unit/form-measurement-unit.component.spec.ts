import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMeasurementUnitComponent } from './form-measurement-unit.component';

describe('FormMeasurementUnitComponent', () => {
  let component: FormMeasurementUnitComponent;
  let fixture: ComponentFixture<FormMeasurementUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMeasurementUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMeasurementUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
