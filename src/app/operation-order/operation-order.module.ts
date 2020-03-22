import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationOrderFormComponent } from './operation-order-form/operation-order-form.component';
import { OperationOrderListComponent } from './operation-order-list/operation-order-list.component';
import { CommonMaterialModule } from '../common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OperationOrderRoutingModule } from './operation-order.routing.module';

@NgModule({
  declarations: [OperationOrderFormComponent, OperationOrderListComponent],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    OperationOrderRoutingModule
  ],
  entryComponents:[
    OperationOrderFormComponent
  ]
})
export class OperationOrderModule { }
