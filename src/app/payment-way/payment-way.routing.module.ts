import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentWayListComponent } from './payment-way-list/payment-way-list.component';
import { PaymentWayFormComponent } from './payment-way-form/payment-way-form.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: PaymentWayListComponent,
      },
      {
        path: 'new',
        component: PaymentWayFormComponent,
      },
      {
        path: 'form/:id',
        component: PaymentWayFormComponent,
      },
     ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PaymentWayRoutingModule { }
