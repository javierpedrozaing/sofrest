import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { ListHallsComponent } from './list-halls/list-halls.component';
import { FormSalonComponent } from './form-salon/form-salon.component';


const routes: Routes = [
  {
    path: '', component: ListHallsComponent
  },
  {
    path:'new/:quantity', component : FormSalonComponent
  },
  {
    path: 'halls/:id', component: SupervisorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }
