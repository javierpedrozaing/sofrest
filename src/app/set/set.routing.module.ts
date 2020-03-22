import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetFormComponent } from './set-form/set-form.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: SetFormComponent,
      },
      {
        path: 'form',
        component: SetFormComponent,
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SetRoutingModule { }
