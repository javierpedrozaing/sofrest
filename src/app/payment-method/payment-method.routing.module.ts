import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentMethodListComponent } from './payment-method-list/payment-method-list.component';
import { PaymentMethodFormComponent } from './payment-method-form/payment-method-form.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: PaymentMethodListComponent,
      },
      {
        path: 'new',
        component: PaymentMethodFormComponent,
      },
      {
        path: 'form/:id',
        component: PaymentMethodFormComponent,
      },
     ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PaymentMethodRoutingModule { }
