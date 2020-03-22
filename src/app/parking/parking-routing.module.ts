import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParkingListComponent } from './parking-list/parking-list.component';
import { ParkingFormComponent } from './parking-form/parking-form.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ParkingListComponent,
      },
      {
        path: 'form',
        component: ParkingFormComponent,
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParkingRoutingModule { }
