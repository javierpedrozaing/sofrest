import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListAreasComponent } from './list-areas/list-areas.component';
import { AreasFormComponent } from './areas-form/areas-form.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListAreasComponent,
      },
      {
        path: 'form',
        component: AreasFormComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreasRoutingModule { }
