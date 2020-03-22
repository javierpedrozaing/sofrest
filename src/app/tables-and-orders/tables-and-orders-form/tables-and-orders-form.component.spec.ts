import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesAndOrdersFormComponent } from './tables-and-orders-form.component';

describe('TablesAndOrdersFormComponent', () => {
  let component: TablesAndOrdersFormComponent;
  let fixture: ComponentFixture<TablesAndOrdersFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablesAndOrdersFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesAndOrdersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
