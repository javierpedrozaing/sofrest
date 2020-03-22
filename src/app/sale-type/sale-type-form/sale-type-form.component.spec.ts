import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleTypeFormComponent } from './sale-type-form.component';

describe('SaleTypeFormComponent', () => {
  let component: SaleTypeFormComponent;
  let fixture: ComponentFixture<SaleTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
