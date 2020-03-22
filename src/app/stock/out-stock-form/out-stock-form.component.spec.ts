import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutStockFormComponent } from './out-stock-form.component';

describe('OutStockFormComponent', () => {
  let component: OutStockFormComponent;
  let fixture: ComponentFixture<OutStockFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutStockFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutStockFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
