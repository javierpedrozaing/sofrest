import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleFormComponent } from './role-form/role-form.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: RoleListComponent,
      },
      {
        path: 'new',
        component: RoleFormComponent,
      },
     ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RoleRoutingModule { }
