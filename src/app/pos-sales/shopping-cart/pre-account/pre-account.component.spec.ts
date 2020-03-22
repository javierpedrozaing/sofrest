import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreAccountComponent } from './pre-account.component';

describe('PreAccountComponent', () => {
  let component: PreAccountComponent;
  let fixture: ComponentFixture<PreAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
