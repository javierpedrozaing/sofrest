import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredittNoteComponent } from './creditt-note.component';

describe('CredittNoteComponent', () => {
  let component: CredittNoteComponent;
  let fixture: ComponentFixture<CredittNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredittNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredittNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
