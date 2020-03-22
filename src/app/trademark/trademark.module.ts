import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrademarkFORMComponent } from './trademark-form/trademark-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonMaterialModule } from '../common/material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TrademarkRoutingModule } from './trademark.routing.module';
import { ListTrademarkComponent } from './list-trademark/list-trademark.component';



@NgModule({
  declarations: [TrademarkFORMComponent,ListTrademarkComponent],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TrademarkRoutingModule,
    FlexLayoutModule,
  ],
  exports:[
    TrademarkFORMComponent
  ]
})
export class TrademarkModule { }
