import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperationOrderListComponent } from './operation-order-list/operation-order-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: OperationOrderListComponent,
      },
     ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OperationOrderRoutingModule { }
