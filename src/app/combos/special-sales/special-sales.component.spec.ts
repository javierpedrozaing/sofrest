import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialSalesComponent } from './special-sales.component';

describe('SpecialSalesComponent', () => {
  let component: SpecialSalesComponent;
  let fixture: ComponentFixture<SpecialSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
