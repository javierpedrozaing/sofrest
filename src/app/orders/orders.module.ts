import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTypeListComponent, DialogFormOrderType } from './order-type-list/order-type-list.component';
import { OrderFormComponent, DialogFormOrderTypeFromOrder, DialogDocument } from './order-form/order-form.component';
import { OrderListComponent, DialogFormOrder } from './order-list/order-list.component';
import { OrderTypeFormComponent} from './order-type-form/order-type-form.component';
import { CommonMaterialModule } from '../common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdersRoutingModule } from './orders.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { EntryTypeFormComponent } from './entry-type-form/entry-type-form.component';
import { EntryTypeComponent, DialogFormEntryType } from './entry-type/entry-type.component';

@NgModule({
  declarations: [
    OrderTypeFormComponent,
    OrderTypeListComponent,
    OrderFormComponent,
    OrderListComponent,
    DialogFormOrderType,
    DialogFormOrder,
    DialogFormOrderTypeFromOrder,
    DialogDocument,
    EntryTypeFormComponent,
    EntryTypeComponent,
    DialogFormEntryType
  ],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    OrdersRoutingModule,
    FlexLayoutModule,
    NgxMatSelectSearchModule,
  ],
  entryComponents: [
    DialogFormOrder,
    DialogFormOrderType,
    DialogFormOrderTypeFromOrder,
    DialogDocument,
    DialogFormEntryType
  ],
})
export class OrdersModule { }
