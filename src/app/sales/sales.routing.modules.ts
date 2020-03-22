import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSalesComponent } from './list-sales/list-sales.component';
import { SalesFormComponent } from './sales-form/sales-form.component';



const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListSalesComponent,
      },
      {
        path: 'details',
        component: SalesFormComponent,
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SalesRoutingModule { }
