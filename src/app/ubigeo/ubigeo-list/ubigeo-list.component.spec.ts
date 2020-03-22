import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbigeoListComponent } from './ubigeo-list.component';

describe('UbigeoListComponent', () => {
  let component: UbigeoListComponent;
  let fixture: ComponentFixture<UbigeoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbigeoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbigeoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
