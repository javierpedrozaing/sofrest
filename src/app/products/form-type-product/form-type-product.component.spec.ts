import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTypeProductComponent } from './form-type-product.component';

describe('FormTypeProductComponent', () => {
  let component: FormTypeProductComponent;
  let fixture: ComponentFixture<FormTypeProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTypeProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTypeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
