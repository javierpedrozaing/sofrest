import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { ReservationsComponent, DialogNewReservations } from './reservations.component';
import { CommonMaterialModule } from '../common/material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { ClientsFormComponent } from '../clients/clients-form/clients-form.component';
import { ClientsModule } from '../clients/clients.module';
import { ReservationTypeComponent } from './reservation-type/reservation-type.component';
import { ReservationTypeFormComponent } from './reservation-type-form/reservation-type-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';

@NgModule({
  declarations: [
    ReservationsComponent,
    DialogNewReservations,
    ReservationTypeComponent,
    ReservationTypeFormComponent
  ],
  entryComponents: [
    DialogNewReservations,
    ClientsFormComponent,
    ReservationTypeFormComponent,
  ],
  imports: [
    CommonModule,
    ReservationsRoutingModule,
    CommonMaterialModule,
    FlexLayoutModule,
    SelectDropDownModule,
    NgxMaterialTimepickerModule,
    ClientsModule,
    ReactiveFormsModule,
    FormsModule,
    AmazingTimePickerModule,
    SatDatepickerModule, 
    SatNativeDateModule,
  ]
})
export class ReservationsModule { }
