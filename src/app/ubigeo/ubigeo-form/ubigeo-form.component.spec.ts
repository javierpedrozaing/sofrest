import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbigeoFormComponent } from './ubigeo-form.component';

describe('UbigeoFormComponent', () => {
  let component: UbigeoFormComponent;
  let fixture: ComponentFixture<UbigeoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbigeoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbigeoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
