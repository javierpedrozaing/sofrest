import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCompanyComponent } from './form-company/form-company.component';
import { CommonMaterialModule } from '../common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CompanyRoutingModule } from './company.routing.module';

@NgModule({
  declarations: [ FormCompanyComponent],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CompanyRoutingModule,
    FlexLayoutModule,
  ]
})
export class CompanyModule { }
