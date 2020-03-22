import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBrandProductComponent } from './form-brand-product.component';

describe('FormBrandProductComponent', () => {
  let component: FormBrandProductComponent;
  let fixture: ComponentFixture<FormBrandProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBrandProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBrandProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
