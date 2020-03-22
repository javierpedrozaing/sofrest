import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatesReportComponent } from './plates-report.component';

describe('PlatesReportComponent', () => {
  let component: PlatesReportComponent;
  let fixture: ComponentFixture<PlatesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
