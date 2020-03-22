import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionAreasComponent } from './production-areas.component';

describe('ProductionAreasComponent', () => {
  let component: ProductionAreasComponent;
  let fixture: ComponentFixture<ProductionAreasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionAreasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
