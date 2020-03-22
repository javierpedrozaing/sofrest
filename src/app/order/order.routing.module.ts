import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { OrderComponent } from './order/order.component';
import { TableListComponent } from './table-list/table-list.component';
import { PaymentOrderComponent } from './payment-order/payment-order.component';
import { PaymentOrderFormComponent } from './payment-order-form/payment-order-form.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'list-orders',
        component: TableListComponent,
      },
      {
        path: 'details',
        component: OrderComponent,
      },
      {
        path: 'payment',
        component: PaymentOrderComponent,
      },
      {
        path: 'payment/method',
        component: PaymentOrderFormComponent,
        data: {
          total: 0,
          orders:0
        }
      }
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrderRoutingModule { }
