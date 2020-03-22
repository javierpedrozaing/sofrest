import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchTypeListComponent } from './branch-type-list/branch-type-list.component';
import { BranchListComponent } from './branch-list/branch-list.component';
import { BranchFormComponent } from './branch-form/branch-form.component';
import { BranchTypeFormComponent } from './branch-type-form/branch-type-form.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: BranchListComponent,
      },
      {
        path: 'new',
        component: BranchFormComponent,
      },
      {
        path: 'form/:id',
        component: BranchFormComponent,
      },
     ]
  },
  {
    path: 'branches-types',
    children: [
      {
        path: 'list',
        component: BranchTypeListComponent,
      },
      {
        path: 'new',
        component: BranchTypeFormComponent,
      },
     ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BranchRoutingModule { }
