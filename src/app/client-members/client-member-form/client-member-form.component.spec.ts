import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMemberFormComponent } from './client-member-form.component';

describe('ClientMemberFormComponent', () => {
  let component: ClientMemberFormComponent;
  let fixture: ComponentFixture<ClientMemberFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientMemberFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMemberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
