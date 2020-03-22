import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTpvComponent } from './add-tpv.component';

describe('AddTpvComponent', () => {
  let component: AddTpvComponent;
  let fixture: ComponentFixture<AddTpvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTpvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTpvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
