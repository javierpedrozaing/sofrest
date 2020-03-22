import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormMeasurementUnitComponent } from './form-measurement-unit/form-measurement-unit.component';
import { ListMeasurementUnitComponent } from './list-measurement-unit/list-measurement-unit.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListMeasurementUnitComponent,
      },
      {
        path: 'new',
        component: FormMeasurementUnitComponent,
      },
      {
        path: 'form/:id',
        component: FormMeasurementUnitComponent,
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MeasurementUnitsRoutingModule { }
