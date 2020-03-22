import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorFormComponent } from './color-form/color-form.component';
import { ColorListComponent } from './color-list/color-list.component';
import { CommonMaterialModule } from '../common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorRoutingModule } from './color.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [ColorFormComponent, ColorListComponent],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ColorRoutingModule,
    FlexLayoutModule,
  ]
})
export class ColorModule { }
