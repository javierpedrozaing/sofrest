import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PosSalesRoutingModule } from './pos-sales-routing.module';
import { PosSalesComponent, DialogDiscount, PreAccountDialog } from './pos-sales.component';
import { CommonMaterialModule } from '../common/material-module';
import { AvatarModule } from 'ngx-avatar';
import { PayPosComponent, PayPosDialog, CustomerDialog } from './pay-pos/pay-pos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingCartComponent, DirectSaleConfigDialog, ItemOptionsDialog, CantOptionsDialog, ModifyOptionsDialog, CashOptionsDialog, DebitOptionsDialog, OrderTypeOptionsDialog, cardTypeOptionsDialog, ConfirmOptionsDialog, FastCashOptionsDialog, AmountOptionsDialog } from './shopping-cart/shopping-cart.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CashRegisterComponent, NewCashRegisterDialog, OpenCashRegisterDialog, CloseCashRegisterDialog, HistoricCashRegisterDialog } from './cash-register/cash-register.component';
import { ClientsModule } from '../clients/clients.module';
import { PaymentActionComponent, PaymentMethodClient } from './payment-action/payment-action.component';
import { PreAccountComponent } from './shopping-cart/pre-account/pre-account.component';
import { AuthModule } from '../auth/auth.module';
import { NgxFitTextModule } from 'ngx-fit-text';


@NgModule({
  declarations: [
    PosSalesComponent,
    PayPosComponent,
    PayPosDialog,
    ShoppingCartComponent,
    CashRegisterComponent,
    NewCashRegisterDialog,
    DirectSaleConfigDialog,
    ItemOptionsDialog,
    CustomerDialog,
    OpenCashRegisterDialog,
    CloseCashRegisterDialog,
    HistoricCashRegisterDialog,
    DialogDiscount,
    PaymentActionComponent,
    PreAccountComponent,
    PreAccountDialog,
    PaymentMethodClient,
    CantOptionsDialog,
    ModifyOptionsDialog,
    CashOptionsDialog,
    DebitOptionsDialog,
    OrderTypeOptionsDialog,
    cardTypeOptionsDialog,
    ConfirmOptionsDialog,
    FastCashOptionsDialog,
    AmountOptionsDialog
  ],
  entryComponents: [
    PayPosDialog,
    NewCashRegisterDialog,
    DirectSaleConfigDialog,
    ItemOptionsDialog,
    CustomerDialog,
    OpenCashRegisterDialog,
    CloseCashRegisterDialog,
    HistoricCashRegisterDialog,
    DialogDiscount,
    PreAccountDialog,
    PaymentMethodClient,
    CantOptionsDialog,
    ModifyOptionsDialog,
    CashOptionsDialog,
    DebitOptionsDialog,
    OrderTypeOptionsDialog,
    cardTypeOptionsDialog,
    ConfirmOptionsDialog,
    FastCashOptionsDialog,
    AmountOptionsDialog
  ],
  imports: [
    CommonModule,
    PosSalesRoutingModule,
    CommonMaterialModule,
    FlexLayoutModule,
    ChartsModule,
    AvatarModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    ClientsModule,
    AuthModule,
    NgxFitTextModule.forRoot()
  ]
})
export class PosSalesModule { }
