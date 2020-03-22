import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateFormComponent } from './plate-form.component';

describe('PlateFormComponent', () => {
  let component: PlateFormComponent;
  let fixture: ComponentFixture<PlateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
