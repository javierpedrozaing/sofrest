import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleListComponent, DialogFormRole } from './role-list/role-list.component';
import { RoleFormComponent } from './role-form/role-form.component';
import { CommonMaterialModule } from '../common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RoleRoutingModule } from './role.routing.module';

@NgModule({
  declarations: [RoleListComponent, RoleFormComponent, DialogFormRole],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RoleRoutingModule,
    FlexLayoutModule,
  ],
  entryComponents: [
    DialogFormRole,
  ],
})
export class RoleModule { }
