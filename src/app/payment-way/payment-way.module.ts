import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentWayListComponent, DialogFormPaymentWay } from './payment-way-list/payment-way-list.component';
import { PaymentWayFormComponent } from './payment-way-form/payment-way-form.component';
import { CommonMaterialModule } from '../common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PaymentWayRoutingModule } from './payment-way.routing.module';
import { AvatarModule } from 'ngx-avatar';
import { FileUploadModule } from '@iplab/ngx-file-upload';

@NgModule({
  declarations: [PaymentWayListComponent, PaymentWayFormComponent, DialogFormPaymentWay, ],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PaymentWayRoutingModule,
    FlexLayoutModule,
    AvatarModule,
    FileUploadModule,
  ],
  entryComponents: [
    DialogFormPaymentWay,
  ],
})
export class PaymentWayModule { }
