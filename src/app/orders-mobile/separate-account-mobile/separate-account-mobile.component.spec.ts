import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeparateAccountMobileComponent } from './separate-account-mobile.component';

describe('SeparateAccountMobileComponent', () => {
  let component: SeparateAccountMobileComponent;
  let fixture: ComponentFixture<SeparateAccountMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeparateAccountMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeparateAccountMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
