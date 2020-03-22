import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonMaterialModule } from '../common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListUsersComponent, DialogFormUser } from './list-users/list-users.component';
import { UserFormComponent } from './user-form/user-form.component';
import { RoleModule } from '../role/role.module';
import { DialogFormRole } from '../role/role-list/role-list.component';
import { UserMobileComponent } from './user-mobile/user-mobile.component';
import { UserMobileFormComponent } from './user-mobile-form/user-mobile-form.component';
import { UserRoutingModule } from './users-routing.module';
import { AvatarModule } from 'ngx-avatar';
import { NewUserComponent } from './new-user/new-user.component';

@NgModule({
  declarations: [
    ListUsersComponent,
    UserFormComponent,
    NewUserComponent,
    DialogFormUser,
    UserMobileComponent,
    UserMobileFormComponent,
  ],
  entryComponents: [
    DialogFormUser,
    DialogFormRole,
  ],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    FlexLayoutModule,
    RoleModule,
    AvatarModule,
  ]
})
export class UsersModule { }
