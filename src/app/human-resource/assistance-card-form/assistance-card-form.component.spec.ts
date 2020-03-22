import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceCardFormComponent } from './assistance-card-form.component';

describe('AssistanceCardFormComponent', () => {
  let component: AssistanceCardFormComponent;
  let fixture: ComponentFixture<AssistanceCardFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistanceCardFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistanceCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
