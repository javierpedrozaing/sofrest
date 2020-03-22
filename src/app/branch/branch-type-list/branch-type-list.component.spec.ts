import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchTypeListComponent } from './branch-type-list.component';

describe('BranchTypeListComponent', () => {
  let component: BranchTypeListComponent;
  let fixture: ComponentFixture<BranchTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
