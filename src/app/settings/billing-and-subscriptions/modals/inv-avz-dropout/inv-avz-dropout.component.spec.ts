import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvAvzDropoutComponent } from './inv-avz-dropout.component';

describe('InvAvzDropoutComponent', () => {
  let component: InvAvzDropoutComponent;
  let fixture: ComponentFixture<InvAvzDropoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvAvzDropoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvAvzDropoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
