import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivesFormComponent } from './motives-form.component';

describe('MotivesFormComponent', () => {
  let component: MotivesFormComponent;
  let fixture: ComponentFixture<MotivesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotivesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
