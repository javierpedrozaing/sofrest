import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHallsComponent } from './list-halls.component';

describe('ListHallsComponent', () => {
  let component: ListHallsComponent;
  let fixture: ComponentFixture<ListHallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
