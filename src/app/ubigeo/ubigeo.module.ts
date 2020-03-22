import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UbigeoListComponent } from './ubigeo-list/ubigeo-list.component';
import { UbigeoFormComponent } from './ubigeo-form/ubigeo-form.component';
import { CommonMaterialModule } from '../common/material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UbigeosRoutingModule } from './ubigeo.routing.module';



@NgModule({
  declarations: [UbigeoListComponent, UbigeoFormComponent],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FlexLayoutModule,
    FormsModule,
    UbigeosRoutingModule,
    ReactiveFormsModule,
  ]
})
export class UbigeoModule { }
