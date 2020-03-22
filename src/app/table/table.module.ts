import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, newTable } from './table.component';
import { CommonMaterialModule } from '../common/material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableRoutingModule } from './table.routing.module';
import { TableShapeComponent, TableShapesFormComponent } from './table-shape/table-shape.component';



@NgModule({
  declarations: [TableComponent, newTable, TableShapeComponent, TableShapesFormComponent],
  entryComponents:[
    newTable,
    TableShapesFormComponent
  ],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FlexLayoutModule,
    FormsModule,
    TableRoutingModule,
    ReactiveFormsModule,
  ]
})
export class TableModule { }
