import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HallTypeFormComponent } from './hall-type-form/hall-type-form.component';
import { HallTypeListComponent } from './hall-type-list/hall-type-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonMaterialModule } from '../common/material-module';
import { HallTypeRoutingModule } from './hall-type.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [HallTypeFormComponent, HallTypeListComponent],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HallTypeRoutingModule,
    FlexLayoutModule,
  ],
  exports:[HallTypeFormComponent, HallTypeListComponent],
  entryComponents : [
    HallTypeFormComponent,
  ]
})
export class HallTypeModule { }
