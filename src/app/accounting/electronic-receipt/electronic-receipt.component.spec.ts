import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicReceiptComponent } from './electronic-receipt.component';

describe('ElectronicReceiptComponent', () => {
  let component: ElectronicReceiptComponent;
  let fixture: ComponentFixture<ElectronicReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectronicReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronicReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
