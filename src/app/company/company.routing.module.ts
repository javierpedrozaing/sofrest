import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormCompanyComponent } from './form-company/form-company.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: FormCompanyComponent,
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CompanyRoutingModule { }
