import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderTypeListComponent } from './order-type-list/order-type-list.component';
import { OrderTypeFormComponent } from './order-type-form/order-type-form.component';
import { EntryTypeFormComponent } from './entry-type-form/entry-type-form.component';
import { EntryTypeComponent } from './entry-type/entry-type.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: OrderListComponent,
      },
      {
        path: 'form',
        component: OrderFormComponent,
      },
      {
        path: 'form/:id',
        component: OrderFormComponent,
      },
     ]
  },
  {
    path: 'orders-types',
    children: [
      {
        path: 'list',
        component: OrderTypeListComponent,
      },
      {
        path: 'new',
        component: OrderTypeFormComponent,
      },
      {
        path: 'form/:id',
        component: OrderTypeFormComponent,
      },
     ]
  },
  {
    path: 'entry-type/form',
    component: EntryTypeFormComponent,
  },
  {
    path: 'entry-type',
    component: EntryTypeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrdersRoutingModule { }
