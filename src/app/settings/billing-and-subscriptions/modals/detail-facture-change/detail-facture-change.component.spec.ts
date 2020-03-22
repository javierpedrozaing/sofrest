import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFactureChangeComponent } from './detail-facture-change.component';

describe('DetailFactureChangeComponent', () => {
  let component: DetailFactureChangeComponent;
  let fixture: ComponentFixture<DetailFactureChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailFactureChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailFactureChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
