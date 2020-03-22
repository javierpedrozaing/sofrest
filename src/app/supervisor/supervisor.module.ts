import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './supervisor.routing.module';
import { SupervisorComponent, StatusTable, roomDialog } from './supervisor/supervisor.component';
import { GridsterModule } from 'angular-gridster2';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListHallsComponent, SalonData } from './list-halls/list-halls.component';
import { CommonMaterialModule } from '../common/material-module';
import { FormSalonComponent, JoinTables } from './form-salon/form-salon.component';
import { HallTypeModule } from '../hall-type/hall-type.module';

@NgModule({
  declarations: [SupervisorComponent, StatusTable, roomDialog,ListHallsComponent,SalonData,JoinTables,FormSalonComponent],
  entryComponents: [StatusTable, roomDialog,SalonData,JoinTables],
  imports: [
    CommonModule,
    GridsterModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
    MatMenuModule,
    MatSelectModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonMaterialModule,
    FlexLayoutModule,
    HallTypeModule,
  ]
})
export class SupervisorModule { }
