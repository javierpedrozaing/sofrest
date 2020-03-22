import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormMeasurementUnitComponent } from './form-measurement-unit/form-measurement-unit.component';
import { ListMeasurementUnitComponent, DialogFormMeasurementUnit } from './list-measurement-unit/list-measurement-unit.component';
import { MeasurementUnitsRoutingModule } from './measurement-units.routing.module';
import { CommonMaterialModule } from '../common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [FormMeasurementUnitComponent, ListMeasurementUnitComponent, DialogFormMeasurementUnit],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MeasurementUnitsRoutingModule,
    FlexLayoutModule,
  ],
  entryComponents: [
    DialogFormMeasurementUnit,
  ],
})
export class MeasurementUnitsModule { }
