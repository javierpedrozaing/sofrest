import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HallTypeListComponent } from './hall-type-list/hall-type-list.component';
import { HallTypeFormComponent } from './hall-type-form/hall-type-form.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: HallTypeListComponent,
      },
      {
        path: 'new',
        component: HallTypeFormComponent,
      },
      {
        path: 'form/:id',
        component: HallTypeFormComponent,
      },
     ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HallTypeRoutingModule { }
