import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSalonComponent } from './form-salon.component';

describe('FormSalonComponent', () => {
  let component: FormSalonComponent;
  let fixture: ComponentFixture<FormSalonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSalonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
