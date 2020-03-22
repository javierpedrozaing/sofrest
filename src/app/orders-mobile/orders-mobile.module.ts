import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersMobileRoutingModule } from './orders-mobile-routing.module';
import { OrdersMobileComponent } from './orders-mobile.component';
import { CommonMaterialModule } from '../common/material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';
import { MakeOrderMobileComponent } from './make-order-mobile/make-order-mobile.component';
import { OrdersStatusMobileComponent } from './orders-status-mobile/orders-status-mobile.component';
import { OrderResumeComponent } from './order-resume/order-resume.component';
import { PlaceOrderMobileComponent } from './place-order-mobile/place-order-mobile.component';
import { OrdersGridMobileComponent } from './orders-grid-mobile/orders-grid-mobile.component';
import { AddOrdersMobileComponent } from './add-orders-mobile/add-orders-mobile.component';
import { SeparateAccountMobileComponent } from './separate-account-mobile/separate-account-mobile.component';
import { ConfirmPlaceMobileComponent } from './confirm-place-mobile/confirm-place-mobile.component';
import { OrderMobileFormComponent, DialogProduct } from './order-mobile-form/order-mobile-form.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ApplicationPipesModuleModule } from '../common/application-pipes-module/application-pipes-module.module';


@NgModule({
  declarations: [
    OrdersMobileComponent,
    MakeOrderMobileComponent,
    MakeOrderMobileComponent,
    OrdersStatusMobileComponent,
    OrderResumeComponent,
    PlaceOrderMobileComponent,
    OrdersGridMobileComponent,
    AddOrdersMobileComponent,
    SeparateAccountMobileComponent,
    ConfirmPlaceMobileComponent,
    OrderMobileFormComponent,
    DialogProduct
  ],
  imports: [
    CommonModule,
    OrdersMobileRoutingModule,
    CommonMaterialModule,
    FlexLayoutModule,
    AvatarModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    ApplicationPipesModuleModule
  ],
  entryComponents:[
    DialogProduct,
  ]
})
export class OrdersMobileModule { }
