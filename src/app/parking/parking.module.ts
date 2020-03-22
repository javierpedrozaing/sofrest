import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingFormComponent } from './parking-form/parking-form.component';
import { ParkingListComponent } from './parking-list/parking-list.component';
import { ParkingRoutingModule } from './parking-routing.module';
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
  declarations: [ParkingFormComponent, ParkingListComponent],
  imports: [
    CommonModule,
    ParkingRoutingModule,
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
  ]
})
export class ParkingModule { }
