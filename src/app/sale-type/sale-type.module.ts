import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleTypeListComponent, DialogFormSaleType } from './sale-type-list/sale-type-list.component';
import { SaleTypeFormComponent } from './sale-type-form/sale-type-form.component';
import { CommonMaterialModule } from '../common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SaleTypeRoutingModule } from './sale-type.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [SaleTypeListComponent, SaleTypeFormComponent, DialogFormSaleType, ],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SaleTypeRoutingModule,
    FlexLayoutModule,
  ],
  entryComponents: [
    DialogFormSaleType,
  ]
})
export class SaleTypeModule { }
