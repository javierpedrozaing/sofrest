import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesAndOrdersListComponent, DialogFormTableAndOrder } from './tables-and-orders-list/tables-and-orders-list.component';
import { TablesAndOrdersFormComponent } from './tables-and-orders-form/tables-and-orders-form.component';
import { CommonMaterialModule } from '../common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TablesAndOrdersRoutingModule } from './tables-and-orders.routing.module';
import { FoodHallModule } from '../food-hall/food-hall.module';
import { DialogFormFoodHall } from '../food-hall/food-hall-list/food-hall-list.component';
import { ListOrdersComponent, DialogMoveOrder, DialogCancelOrder } from './list-orders/list-orders.component';
import { OrderDataComponent, DialogProduct } from './order-data/order-data.component';
import { ClientsModule } from '../clients/clients.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ApplicationPipesModuleModule } from '../common/application-pipes-module/application-pipes-module.module';

@NgModule({
  declarations: [
    TablesAndOrdersListComponent, 
    TablesAndOrdersFormComponent, 
    DialogFormTableAndOrder, 
    ListOrdersComponent, 
    OrderDataComponent,
    DialogProduct,
    DialogMoveOrder,
    DialogCancelOrder
  ],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablesAndOrdersRoutingModule,
    FlexLayoutModule,
    FoodHallModule,
    ClientsModule,
    NgxMatSelectSearchModule,
    ApplicationPipesModuleModule
  ],
  entryComponents: [
    DialogFormTableAndOrder,
    DialogFormFoodHall,
    DialogProduct,
    DialogMoveOrder,
    DialogCancelOrder,
  ]
})
export class TablesAndOrdersModule { }
