import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesAndOrdersListComponent } from './tables-and-orders-list.component';

describe('TablesAndOrdersListComponent', () => {
  let component: TablesAndOrdersListComponent;
  let fixture: ComponentFixture<TablesAndOrdersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablesAndOrdersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesAndOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
