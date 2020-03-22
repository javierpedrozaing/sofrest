import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryTypeComponent } from './entry-type.component';

describe('EntryTypeComponent', () => {
  let component: EntryTypeComponent;
  let fixture: ComponentFixture<EntryTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
