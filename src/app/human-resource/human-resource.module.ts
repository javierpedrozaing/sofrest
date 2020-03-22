import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEmployeesComponent, DialogEmployeesForm } from './list-employees/list-employees.component';
import { EmployeesFormComponent } from './employees-form/employees-form.component';
import { AccessRightsComponent, DialogGroupForm } from './access-rights/access-rights.component';
import { GroupFormComponent } from './group-form/group-form.component';
import { AssistanceCardComponent, DialogAssistanceCardForm } from './assistance-card/assistance-card.component';
import { AssistanceCardFormComponent } from './assistance-card-form/assistance-card-form.component';
import { WorkingTimeCounterComponent } from './working-time-counter/working-time-counter.component';
import { CommonMaterialModule } from '../common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { HumanResourceRoutingModule } from './human-resource.routing.module';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { NgxMaterialTimepickerContainerComponent } from 'ngx-material-timepicker/src/app/material-timepicker/components/ngx-material-timepicker-container/ngx-material-timepicker-container.component';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { PayrollComponent } from './payroll/payroll.component';


@NgModule({
  declarations: [ListEmployeesComponent, EmployeesFormComponent, AccessRightsComponent, GroupFormComponent, AssistanceCardComponent, AssistanceCardFormComponent, WorkingTimeCounterComponent, DialogEmployeesForm,DialogGroupForm,DialogAssistanceCardForm, PayrollComponent],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HumanResourceRoutingModule,
    FlexLayoutModule,
    NgxDaterangepickerMd.forRoot(),
    NgxMaterialTimepickerModule,
    FileUploadModule,
    AmazingTimePickerModule,
    SatDatepickerModule, 
    SatNativeDateModule,
  ],
  entryComponents:[
    DialogEmployeesForm,
    DialogGroupForm,
    DialogAssistanceCardForm,
  ]
})
export class HumanResourceModule { }
