import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboComponent } from './combo/combo.component';
import { ComboFormComponent} from './combo-form/combo-form.component';
import { SpecialSalesComponent, DialogSpecialSalesForm } from './special-sales/special-sales.component';
import { SpecialSalesFormComponent } from './special-sales-form/special-sales-form.component';
import { CommonMaterialModule } from '../common/material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CombosRoutingModule } from './combos.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';



@NgModule({
  declarations: [ComboComponent, ComboFormComponent, SpecialSalesComponent, SpecialSalesFormComponent,DialogSpecialSalesForm],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FlexLayoutModule,
    CombosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
  ],
  entryComponents:[
    DialogSpecialSalesForm,
  ]
})
export class CombosModule { }
