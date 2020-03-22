import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMeasurementUnitComponent } from './list-measurement-unit.component';

describe('ListMeasurementUnitComponent', () => {
  let component: ListMeasurementUnitComponent;
  let fixture: ComponentFixture<ListMeasurementUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMeasurementUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMeasurementUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
