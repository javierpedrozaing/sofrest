import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivesListComponent } from './motives-list.component';

describe('MotivesListComponent', () => {
  let component: MotivesListComponent;
  let fixture: ComponentFixture<MotivesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotivesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
