import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrademarkFORMComponent } from './trademark-form.component';

describe('TrademarkFORMComponent', () => {
  let component: TrademarkFORMComponent;
  let fixture: ComponentFixture<TrademarkFORMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrademarkFORMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrademarkFORMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
