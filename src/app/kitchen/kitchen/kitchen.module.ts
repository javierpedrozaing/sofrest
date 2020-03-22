import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KitchenRoutingModule } from './kitchen.routing.module';
import { CommonMaterialModule } from 'src/app/common/material-module';
import { FormsModule } from '@angular/forms';
import { KitchenComponent } from '../kitchen.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [KitchenComponent],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ChartsModule,
    KitchenRoutingModule,
  ]
})
export class KitchenModule { }
