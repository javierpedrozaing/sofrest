import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings.routing.module';
import { CommonMaterialModule } from 'src/app/common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsGeneralComponent } from '../settings.component';
import { GeneralSettingsComponent } from '../general-settings/general-settings.component';
import { BillingAndSubscriptionsComponent } from '../billing-and-subscriptions/billing-and-subscriptions.component';
import { EmployeeAmdComponent } from '../billing-and-subscriptions/modals/employee-amd/employee-amd.component';
import { EmployeeDropoutComponent } from '../billing-and-subscriptions/modals/employee-dropout/employee-dropout.component';
import { InvAvzDropoutComponent } from '../billing-and-subscriptions/modals/inv-avz-dropout/inv-avz-dropout.component';
import { InvAvzComponent } from '../billing-and-subscriptions/modals/inv-avz/inv-avz.component';
import { PaymentMethodConfigComponent } from '../billing-and-subscriptions/modals/payment-method-config/payment-method-config.component';
import { DetailFactureChangeComponent } from '../billing-and-subscriptions/modals/detail-facture-change/detail-facture-change.component';
import { DialogFormPaymentMethod } from 'src/app/payment-method/payment-method-list/payment-method-list.component';
import { PaymentMethodModule } from 'src/app/payment-method/payment-method.module';
import { LoyaltyComponent } from '../loyalty/loyalty.component';
import { TaxesComponent } from '../taxes/taxes.component';
import { AddTaxesComponent } from '../taxes/modals/add-taxes/add-taxes.component';
import { OrderTypesComponent } from '../order-types/order-types.component';
import { AddOrderTypeComponent } from '../order-types/modals/add-order-type/add-order-type.component';
import { OpenTicketsComponent } from '../open-tickets/open-tickets.component';
import { StoresComponent } from '../stores/stores.component';
import { AppStoreComponent } from '../stores/modals/app-store/app-store.component';
import { TpvDispositivesComponent } from '../tpv-dispositives/tpv-dispositives.component';
import { AddTpvComponent } from '../tpv-dispositives/modals/add-tpv/add-tpv.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { ReceiptComponent } from '../receipt/receipt.component';
import { ListCoinsComponent, CoinsFormComponent } from 'src/app/coins/list-coins/list-coins.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';



@NgModule({
  declarations: [
    SettingsGeneralComponent,
    GeneralSettingsComponent,
    BillingAndSubscriptionsComponent,
    EmployeeAmdComponent,
    EmployeeDropoutComponent,
    InvAvzDropoutComponent,
    InvAvzComponent,
    OrderTypesComponent,
    PaymentMethodConfigComponent,
    DetailFactureChangeComponent,
    LoyaltyComponent,
    TaxesComponent,
    AddOrderTypeComponent,
    AddTaxesComponent,
    OpenTicketsComponent,
    StoresComponent,
    AppStoreComponent,
    TpvDispositivesComponent,
    AddTpvComponent,
    ReceiptComponent,
    ListCoinsComponent,
    CoinsFormComponent
  ],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    PaymentMethodModule,
    FlexLayoutModule,
    FileUploadModule,
    NgxMatSelectSearchModule,
  ],
  entryComponents : [
    EmployeeAmdComponent,
    EmployeeDropoutComponent,
    InvAvzDropoutComponent,
    InvAvzComponent,
    CoinsFormComponent,
    PaymentMethodConfigComponent,
    DetailFactureChangeComponent,
    DialogFormPaymentMethod,
    AddTaxesComponent,
    AddOrderTypeComponent,
    AppStoreComponent,
    AddTpvComponent,
    ListCoinsComponent
  ]
})
export class SettingsModule { }
