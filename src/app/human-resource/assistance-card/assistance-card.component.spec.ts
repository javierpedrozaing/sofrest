import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceCardComponent } from './assistance-card.component';

describe('AssistanceCardComponent', () => {
  let component: AssistanceCardComponent;
  let fixture: ComponentFixture<AssistanceCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistanceCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistanceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
