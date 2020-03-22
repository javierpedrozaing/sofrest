import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPlaceMobileComponent } from './confirm-place-mobile.component';

describe('ConfirmPlaceMobileComponent', () => {
  let component: ConfirmPlaceMobileComponent;
  let fixture: ComponentFixture<ConfirmPlaceMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmPlaceMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPlaceMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
