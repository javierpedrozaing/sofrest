import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonMaterialModule } from '../common/material-module';
import { SalesRoutingModule } from './sales.routing.modules';
import { ListSalesComponent, SalesForm } from './list-sales/list-sales.component';
import { SalesFormComponent, SalesNewClient } from './sales-form/sales-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogFormPaymentMethod } from '../payment-method/payment-method-list/payment-method-list.component';
import { PaymentMethodModule } from '../payment-method/payment-method.module';
import { DialogFormPaymentWay } from '../payment-way/payment-way-list/payment-way-list.component';
import { PaymentWayModule } from '../payment-way/payment-way.module';
import { ClientsForm } from '../clients/clients/clients.component';
import { ClientsModule } from '../clients/clients.module';
import { DialogFormSaleType } from '../sale-type/sale-type-list/sale-type-list.component';
import { SaleTypeModule } from '../sale-type/sale-type.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    ListSalesComponent,
    SalesForm,
    SalesFormComponent,
    SalesNewClient
  ],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SalesRoutingModule,
    PaymentMethodModule,
    PaymentWayModule,
    ClientsModule,
    SaleTypeModule,
    Ng2SearchPipeModule
  ],
  entryComponents: [
    SalesForm,
    SalesNewClient,
    DialogFormPaymentMethod,
    DialogFormPaymentWay,
    ClientsForm,
    DialogFormSaleType
  ]
})
export class SalesModule { }
