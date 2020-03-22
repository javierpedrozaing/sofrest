import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockRecountComponent } from './stock-recount.component';

describe('StockRecountComponent', () => {
  let component: StockRecountComponent;
  let fixture: ComponentFixture<StockRecountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockRecountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockRecountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
