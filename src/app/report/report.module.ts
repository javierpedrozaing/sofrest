import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportDashboardComponent } from './report-dashboard/report-dashboard.component';
import { ReportRoutingModule } from './report.routing.module';
import { ChartsModule } from 'ng2-charts';
import { CommonMaterialModule } from '../common/material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AvatarModule } from 'ngx-avatar';
import { SalesSummaryComponent } from './sales-summary/sales-summary.component';
import {SatDatepickerModule, SatNativeDateModule} from 'saturn-datepicker';
import { ClientsReportComponent } from './clients-report/clients-report.component';
import { ClientsListReportComponent } from './clients-list-report/clients-list-report.component';
import { PlatesReportComponent } from './plates-report/plates-report.component';
import { HumanResourceReportComponent } from './human-resource-report/human-resource-report.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

@NgModule({
  declarations: [ReportDashboardComponent, SalesSummaryComponent, ClientsReportComponent, ClientsListReportComponent, PlatesReportComponent, HumanResourceReportComponent],
  imports: [
    CommonModule,
    CommonMaterialModule,
    ChartsModule,
    ReportRoutingModule,
    FlexLayoutModule,
    AvatarModule,
    SatDatepickerModule,
    SatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDaterangepickerMd.forRoot(),
    NgxMaterialTimepickerModule,
    FileUploadModule,
    AmazingTimePickerModule,
  ]
})
export class ReportModule { }
