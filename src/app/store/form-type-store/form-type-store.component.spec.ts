import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTypeStoreComponent } from './form-type-store.component';

describe('FormTypeStoreComponent', () => {
  let component: FormTypeStoreComponent;
  let fixture: ComponentFixture<FormTypeStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTypeStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTypeStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
