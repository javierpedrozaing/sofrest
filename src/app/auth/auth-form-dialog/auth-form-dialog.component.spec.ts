import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormDialogComponent } from './auth-form-dialog.component';

describe('AuthFormDialogComponent', () => {
  let component: AuthFormDialogComponent;
  let fixture: ComponentFixture<AuthFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
