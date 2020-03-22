import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationTypeFormComponent } from './reservation-type-form.component';

describe('ReservationTypeFormComponent', () => {
  let component: ReservationTypeFormComponent;
  let fixture: ComponentFixture<ReservationTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
