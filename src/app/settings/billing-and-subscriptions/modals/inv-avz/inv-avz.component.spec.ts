import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvAvzComponent } from './inv-avz.component';

describe('InvAvzComponent', () => {
  let component: InvAvzComponent;
  let fixture: ComponentFixture<InvAvzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvAvzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvAvzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
