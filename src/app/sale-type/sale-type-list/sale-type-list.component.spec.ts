import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleTypeListComponent } from './sale-type-list.component';

describe('SaleTypeListComponent', () => {
  let component: SaleTypeListComponent;
  let fixture: ComponentFixture<SaleTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
