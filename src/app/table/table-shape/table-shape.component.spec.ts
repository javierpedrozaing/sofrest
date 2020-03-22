import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableShapeComponent } from './table-shape.component';

describe('TableShapeComponent', () => {
  let component: TableShapeComponent;
  let fixture: ComponentFixture<TableShapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableShapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
