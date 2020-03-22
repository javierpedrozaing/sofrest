import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockStoreComponent } from './stock-store.component';

describe('StockStoreComponent', () => {
  let component: StockStoreComponent;
  let fixture: ComponentFixture<StockStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
