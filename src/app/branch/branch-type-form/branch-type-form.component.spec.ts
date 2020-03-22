import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchTypeFormComponent } from './branch-type-form.component';

describe('BranchTypeFormComponent', () => {
  let component: BranchTypeFormComponent;
  let fixture: ComponentFixture<BranchTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
