import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablesAndOrdersListComponent } from './tables-and-orders-list/tables-and-orders-list.component';
import { TablesAndOrdersFormComponent } from './tables-and-orders-form/tables-and-orders-form.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { OrderDataComponent } from './order-data/order-data.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: TablesAndOrdersListComponent,
      },
      {
        path: 'list-orders',
        component: ListOrdersComponent,
      },
      {
        path: 'order-data',
        component: OrderDataComponent,
      },
      {
        path: 'new',
        component: TablesAndOrdersFormComponent,
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TablesAndOrdersRoutingModule { }
