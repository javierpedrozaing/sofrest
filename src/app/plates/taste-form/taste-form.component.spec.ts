import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasteFormComponent } from './taste-form.component';

describe('TasteFormComponent', () => {
  let component: TasteFormComponent;
  let fixture: ComponentFixture<TasteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
