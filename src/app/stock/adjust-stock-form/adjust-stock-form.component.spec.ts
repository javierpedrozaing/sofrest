import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustStockFormComponent } from './adjust-stock-form.component';

describe('AdjustStockFormComponent', () => {
  let component: AdjustStockFormComponent;
  let fixture: ComponentFixture<AdjustStockFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjustStockFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustStockFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
