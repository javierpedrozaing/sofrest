import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintersRoutingModule } from './printers-routing.module';
import { PrintersComponent } from './printers.component';
import { CommonMaterialModule } from '../common/material-module';
import { PrintersFormComponent } from './printers-form/printers-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    PrintersComponent,
    PrintersFormComponent
  ],
  imports: [
    CommonModule,
    PrintersRoutingModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ]
})
export class PrintersModule { }
