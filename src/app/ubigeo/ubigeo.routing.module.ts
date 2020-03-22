import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UbigeoListComponent } from './ubigeo-list/ubigeo-list.component';
import { UbigeoFormComponent } from './ubigeo-form/ubigeo-form.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: UbigeoListComponent,
      },
      {
        path: 'form',
        component: UbigeoFormComponent,
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UbigeosRoutingModule { }
