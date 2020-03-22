import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialSalesFormComponent } from './special-sales-form.component';

describe('SpecialSalesFormComponent', () => {
  let component: SpecialSalesFormComponent;
  let fixture: ComponentFixture<SpecialSalesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialSalesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialSalesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
