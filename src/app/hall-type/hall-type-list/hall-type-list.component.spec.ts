import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HallTypeListComponent } from './hall-type-list.component';

describe('HallTypeListComponent', () => {
  let component: HallTypeListComponent;
  let fixture: ComponentFixture<HallTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HallTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HallTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
