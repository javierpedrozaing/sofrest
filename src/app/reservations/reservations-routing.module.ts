import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationsComponent } from './reservations.component';
import { ReservationTypeComponent } from './reservation-type/reservation-type.component';

const routes: Routes = [
  {
    path: '', component: ReservationsComponent
  },
  {
    path: 'types', component: ReservationTypeComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationsRoutingModule { }
