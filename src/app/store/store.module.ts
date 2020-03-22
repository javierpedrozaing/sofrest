import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListStoreComponent, DialogFormStore, DialogStockStore } from './list-store/list-store.component';
import { FormStoreComponent, DialogFormTypeStore } from './form-store/form-store.component';
import { CommonMaterialModule } from '../common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreRoutingModule } from './store.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormTypeStoreComponent } from './form-type-store/form-type-store.component';
import { StockStoreComponent } from './stock-store/stock-store.component';
import { StockComponent } from './stock/stock.component';

@NgModule({
  declarations: [ListStoreComponent, FormStoreComponent, FormTypeStoreComponent, DialogFormStore, DialogFormTypeStore, StockStoreComponent, DialogStockStore, StockComponent,],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreRoutingModule,
    FlexLayoutModule,
  ],
  entryComponents: [
    DialogFormStore, DialogFormTypeStore, DialogStockStore,FormTypeStoreComponent
  ],
})
export class StoreModule { }
