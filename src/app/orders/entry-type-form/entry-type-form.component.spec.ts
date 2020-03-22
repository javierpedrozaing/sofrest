import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryTypeFormComponent } from './entry-type-form.component';

describe('EntryTypeFormComponent', () => {
  let component: EntryTypeFormComponent;
  let fixture: ComponentFixture<EntryTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
