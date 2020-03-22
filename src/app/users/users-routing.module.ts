import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserMobileComponent } from './user-mobile/user-mobile.component';
import { UserMobileFormComponent } from './user-mobile-form/user-mobile-form.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListUsersComponent,
      },
      {
        path: 'new',
        component: UserFormComponent,
      },
      {
        path: 'list-mobile',
        component: UserMobileComponent,
      },
      {
        path: 'new-mobile',
        component: UserMobileFormComponent,
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }
