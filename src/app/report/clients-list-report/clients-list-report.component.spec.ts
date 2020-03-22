import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsListReportComponent } from './clients-list-report.component';

describe('ClientsListReportComponent', () => {
  let component: ClientsListReportComponent;
  let fixture: ComponentFixture<ClientsListReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsListReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsListReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
