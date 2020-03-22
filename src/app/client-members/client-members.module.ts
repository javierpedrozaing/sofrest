import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientMemberFormComponent } from './client-member-form/client-member-form.component';
import { ClientMemberListComponent } from './client-member-list/client-member-list.component';
import { CommonMaterialModule } from '../common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClientMembersRoutingModule } from './client-members.routing.module';



@NgModule({
  declarations: [ClientMemberFormComponent, ClientMemberListComponent],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ClientMembersRoutingModule,
    FlexLayoutModule,
  ]
})
export class ClientMembersModule { }
