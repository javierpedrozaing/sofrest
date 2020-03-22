import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasteListComponent } from './taste-list.component';

describe('TasteListComponent', () => {
  let component: TasteListComponent;
  let fixture: ComponentFixture<TasteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
