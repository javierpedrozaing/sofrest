import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedAssetsFormComponent } from './fixed-assets-form.component';

describe('FixedAssetsFormComponent', () => {
  let component: FixedAssetsFormComponent;
  let fixture: ComponentFixture<FixedAssetsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedAssetsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedAssetsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
