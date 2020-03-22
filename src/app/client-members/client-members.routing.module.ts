import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientMemberListComponent } from './client-member-list/client-member-list.component';
import { ClientMemberFormComponent } from './client-member-form/client-member-form.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ClientMemberListComponent,
      },
      {
        path: 'form',
        component: ClientMemberFormComponent,
      },
      {
        path: 'form/:id',
        component: ClientMemberFormComponent,
      },
     ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ClientMembersRoutingModule { }
