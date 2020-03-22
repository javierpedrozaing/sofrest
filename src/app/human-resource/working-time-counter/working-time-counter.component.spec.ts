import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingTimeCounterComponent } from './working-time-counter.component';

describe('WorkingTimeCounterComponent', () => {
  let component: WorkingTimeCounterComponent;
  let fixture: ComponentFixture<WorkingTimeCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingTimeCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingTimeCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
