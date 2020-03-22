import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationListComponent, DialogQuotationForm } from './quotation-list/quotation-list.component';
import { QuotationFormComponent } from './quotation-form/quotation-form.component';
import { QuotationRoutingModule } from './quotation.routing.module';
import { CommonMaterialModule } from '../common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [QuotationListComponent, QuotationFormComponent,DialogQuotationForm],
  imports: [
    CommonModule,
    QuotationRoutingModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxDaterangepickerMd.forRoot(),
    NgxMaterialTimepickerModule,
    FileUploadModule,
    AmazingTimePickerModule,
    SatDatepickerModule, 
    SatNativeDateModule,
    NgxMatSelectSearchModule,
  ],
  entryComponents:[
    DialogQuotationForm
  ]
})
export class QuotationModule { }
