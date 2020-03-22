import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentMethodListComponent, DialogFormPaymentMethod } from './payment-method-list/payment-method-list.component';
import { PaymentMethodFormComponent } from './payment-method-form/payment-method-form.component';
import { CommonMaterialModule } from '../common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentMethodRoutingModule } from './payment-method.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AvatarModule } from 'ngx-avatar';
import { FileUploadModule } from '@iplab/ngx-file-upload';

@NgModule({
  declarations: [PaymentMethodListComponent, PaymentMethodFormComponent, DialogFormPaymentMethod, ],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PaymentMethodRoutingModule,
    FlexLayoutModule,
    AvatarModule,
    FileUploadModule,
  ],
  exports : [
    PaymentMethodListComponent
  ],
  entryComponents: [
    DialogFormPaymentMethod,
  ],
})
export class PaymentMethodModule { }
