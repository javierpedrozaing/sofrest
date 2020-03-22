import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypesFormComponent } from './product-types-form.component';

describe('ProductTypesFormComponent', () => {
  let component: ProductTypesFormComponent;
  let fixture: ComponentFixture<ProductTypesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTypesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTypesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
