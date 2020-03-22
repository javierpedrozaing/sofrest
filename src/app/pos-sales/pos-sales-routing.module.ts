import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PosSalesComponent } from './pos-sales.component';
import { PayPosComponent } from './pay-pos/pay-pos.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CashRegisterComponent } from './cash-register/cash-register.component';
import { PaymentActionComponent } from './payment-action/payment-action.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: PosSalesComponent,
      },
      {
        path: 'pay-init',
        component: PayPosComponent,
      },
      {
        path: 'shopping-cart',
        component: ShoppingCartComponent,
      },
      {
        path: 'cash-registers',
        component: CashRegisterComponent,
      },
      {
        path: 'payment',
        component: PaymentActionComponent,
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosSalesRoutingModule { }
