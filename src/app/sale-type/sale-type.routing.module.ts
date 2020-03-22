import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaleTypeListComponent } from './sale-type-list/sale-type-list.component';
import { SaleTypeFormComponent } from './sale-type-form/sale-type-form.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: SaleTypeListComponent,
      },
      {
        path: 'new',
        component: SaleTypeFormComponent,
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SaleTypeRoutingModule { }
