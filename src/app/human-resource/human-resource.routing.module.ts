import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { EmployeesFormComponent } from './employees-form/employees-form.component';
import { AccessRightsComponent } from './access-rights/access-rights.component';
import { GroupFormComponent } from './group-form/group-form.component';
import { AssistanceCardComponent } from './assistance-card/assistance-card.component';
import { AssistanceCardFormComponent } from './assistance-card-form/assistance-card-form.component';
import { WorkingTimeCounterComponent } from './working-time-counter/working-time-counter.component';
import { PayrollComponent } from './payroll/payroll.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-employees',
        component: ListEmployeesComponent,
      },
      {
        path: 'employee-form',
        component: EmployeesFormComponent,
      },
      {
        path: 'employee-form/:id',
        component: EmployeesFormComponent,
      },
      {
        path: 'accessPermits',
        component: AccessRightsComponent,
      },
      {
        path: 'group-form',
        component: GroupFormComponent,
      },
      {
        path: 'assistance-card',
        component: AssistanceCardComponent,
      },
      {
        path: 'assistance-card-form',
        component: AssistanceCardFormComponent,
      },
      {
        path: 'working-time-counter',
        component: WorkingTimeCounterComponent,
      },
      {
        path: 'payroll',
        component: PayrollComponent,
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HumanResourceRoutingModule { }
