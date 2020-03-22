import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModelFormComponent } from './model-form/model-form.component';
import { ModelListComponent } from './model-list/model-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ModelListComponent,
      },
      {
        path: 'form',
        component: ModelFormComponent,
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ModelRoutingModule { }
