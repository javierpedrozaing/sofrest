import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpvDispositivesComponent } from './tpv-dispositives.component';

describe('TpvDispositivesComponent', () => {
  let component: TpvDispositivesComponent;
  let fixture: ComponentFixture<TpvDispositivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpvDispositivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpvDispositivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
