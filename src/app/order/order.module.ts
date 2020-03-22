import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { OrderComponent } from './order/order.component';
import { OrderRoutingModule } from './order.routing.module';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonMaterialModule } from '../common/material-module';
import { TableListComponent } from './table-list/table-list.component';
import { PaymentOrderComponent, PayPosOrderDialog, ClientsFormOrder } from './payment-order/payment-order.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClientsModule } from '../clients/clients.module';
import { ClientsFormComponent } from '../clients/clients-form/clients-form.component';
import { PaymentOrderFormComponent } from './payment-order-form/payment-order-form.component';

@NgModule({
  declarations: [ListComponent, OrderComponent, TableListComponent, PaymentOrderComponent,PayPosOrderDialog,ClientsFormOrder, PaymentOrderFormComponent,],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    OrderRoutingModule,
    FlexLayoutModule,
    FontAwesomeModule,
    ClientsModule,
  ],
  entryComponents:[
    PayPosOrderDialog,
    ClientsFormOrder,
  ]
})
export class OrderModule { }
