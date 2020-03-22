import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HallTypeFormComponent } from './hall-type-form.component';

describe('HallTypeFormComponent', () => {
  let component: HallTypeFormComponent;
  let fixture: ComponentFixture<HallTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HallTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HallTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
