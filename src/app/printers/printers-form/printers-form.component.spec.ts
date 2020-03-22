import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintersFormComponent } from './printers-form.component';

describe('PrintersFormComponent', () => {
  let component: PrintersFormComponent;
  let fixture: ComponentFixture<PrintersFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintersFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
