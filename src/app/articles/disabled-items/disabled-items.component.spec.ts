import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabledItemsComponent } from './disabled-items.component';

describe('DisabledItemsComponent', () => {
  let component: DisabledItemsComponent;
  let fixture: ComponentFixture<DisabledItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisabledItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisabledItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
