import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMemberListComponent } from './client-member-list.component';

describe('ClientMemberListComponent', () => {
  let component: ClientMemberListComponent;
  let fixture: ComponentFixture<ClientMemberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientMemberListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
