import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComboComponent } from './combo/combo.component';
import { ComboFormComponent } from './combo-form/combo-form.component';
import { SpecialSalesComponent } from './special-sales/special-sales.component';
import { SpecialSalesFormComponent } from './special-sales-form/special-sales-form.component';



const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ComboComponent,
      },
      {
        path: 'form',
        component: ComboFormComponent,
      },
      {
        path: 'form/:id',
        component: ComboFormComponent,
      },
      {
        path: 'special-sales',
        component: SpecialSalesComponent,
      },
      {
        path: 'special-sales/form',
        component: SpecialSalesFormComponent,
      },
      {
        path: 'special-sales/form/:id',
        component: SpecialSalesFormComponent,
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CombosRoutingModule { }
