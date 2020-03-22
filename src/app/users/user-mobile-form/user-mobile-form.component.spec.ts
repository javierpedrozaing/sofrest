import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMobileFormComponent } from './user-mobile-form.component';

describe('UserMobileFormComponent', () => {
  let component: UserMobileFormComponent;
  let fixture: ComponentFixture<UserMobileFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMobileFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMobileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
