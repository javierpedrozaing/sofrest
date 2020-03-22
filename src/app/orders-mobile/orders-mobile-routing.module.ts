import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersMobileComponent } from './orders-mobile.component';
import { MakeOrderMobileComponent } from './make-order-mobile/make-order-mobile.component';
import { OrdersStatusMobileComponent } from './orders-status-mobile/orders-status-mobile.component';
import { OrderResumeComponent } from './order-resume/order-resume.component';
import { PlaceOrderMobileComponent } from './place-order-mobile/place-order-mobile.component';
import { OrdersGridMobileComponent } from './orders-grid-mobile/orders-grid-mobile.component';
import { AddOrdersMobileComponent } from './add-orders-mobile/add-orders-mobile.component';
import { SeparateAccountMobileComponent } from './separate-account-mobile/separate-account-mobile.component';
import { ConfirmPlaceMobileComponent } from './confirm-place-mobile/confirm-place-mobile.component';
import { OrderMobileFormComponent } from './order-mobile-form/order-mobile-form.component';


const routes: Routes = [
  {
    path: '', component: OrdersGridMobileComponent
  },
  {
    path: 'make', component: MakeOrderMobileComponent
  },
  {
    path: 'status', component: OrdersStatusMobileComponent
  },
  {
    path: 'resume', component: OrderResumeComponent
  },
  {
    path: 'place', component: PlaceOrderMobileComponent
  },
  {
    path: 'list', component: OrdersMobileComponent
  },
  {
    path: 'add', component: AddOrdersMobileComponent
  },
  {
    path: 'divide', component: SeparateAccountMobileComponent
  },
  {
    path: 'confirm', component: ConfirmPlaceMobileComponent
  },
  {
    path: 'orders-mobile-view', component: OrderMobileFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersMobileRoutingModule { }
