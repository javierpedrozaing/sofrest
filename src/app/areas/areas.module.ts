import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreasRoutingModule } from './areas-routing.module';
import { CommonMaterialModule } from '../common/material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AreasFormComponent } from './areas-form/areas-form.component';
import { ListAreasComponent, AreasContainerFormComponent } from './list-areas/list-areas.component';


@NgModule({
  declarations: [
    ListAreasComponent,
    AreasFormComponent,
    AreasContainerFormComponent
  ],
  imports: [
    CommonModule,
    AreasRoutingModule,
    CommonMaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,
  ],
  entryComponents: [
    AreasContainerFormComponent,
    AreasFormComponent
  ]
})
export class AreasModule { }
