import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormProviderComponent } from './form-provider/form-provider.component';
import { ListProviderComponent, DialogFormProvider } from './list-provider/list-provider.component';
import { CommonMaterialModule } from '../common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProvidersRoutingModule } from './providers.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [FormProviderComponent, ListProviderComponent, DialogFormProvider, ],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ProvidersRoutingModule,
    FlexLayoutModule,
    NgxMatSelectSearchModule,
  ],
  entryComponents: [
    DialogFormProvider,
  ],
})
export class ProvidersModule { }
