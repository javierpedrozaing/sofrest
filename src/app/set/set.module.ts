import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetFormComponent } from './set-form/set-form.component';
import { CommonMaterialModule } from '../common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SetRoutingModule } from './set.routing.module';



@NgModule({
  declarations: [SetFormComponent],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SetRoutingModule,
    FlexLayoutModule,
  ],
  exports:[
    SetFormComponent
  ]
})
export class SetModule { }
