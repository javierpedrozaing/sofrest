import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent, ClientsForm } from './clients/clients.component';
import { ClientRoutingModule } from './clients.routing.module';
import { ClientsFormComponent } from './clients-form/clients-form.component';
import { CommonMaterialModule } from '../common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PlansFormComponent, ClientPlanComponent } from './client-plan/client-plan.component';
import { SalesService } from 'src/app/services/Sales/sales.service';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [
    ClientsComponent,
    ClientsFormComponent,
    ClientsForm,
    ClientPlanComponent,
    PlansFormComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxMatSelectSearchModule,
  ],
  entryComponents: [
    ClientsForm,
    PlansFormComponent
  ],
  providers: [
    SalesService
  ],
  exports:[ClientsFormComponent]
})
export class ClientsModule { }
