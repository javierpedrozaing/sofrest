import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { ClientsFormComponent } from './clients-form/clients-form.component';
import { ClientPlanComponent } from './client-plan/client-plan.component';



const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ClientsComponent,
      },
      {
        path: 'details',
        component: ClientsFormComponent,
      },
      {
        path: 'plans',
        component: ClientPlanComponent,
      }
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ClientRoutingModule { }
