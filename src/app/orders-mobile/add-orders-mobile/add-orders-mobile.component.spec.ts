import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrdersMobileComponent } from './add-orders-mobile.component';

describe('AddOrdersMobileComponent', () => {
  let component: AddOrdersMobileComponent;
  let fixture: ComponentFixture<AddOrdersMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrdersMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrdersMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
