import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelFormComponent } from './model-form/model-form.component';
import { CommonMaterialModule } from '../common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModelRoutingModule } from './model.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ModelListComponent } from './model-list/model-list.component';



@NgModule({
  declarations: [ModelFormComponent, ModelListComponent],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ModelRoutingModule,
    FlexLayoutModule,
  ],
  exports:[
    ModelFormComponent
  ]
})
export class ModelModule { }
