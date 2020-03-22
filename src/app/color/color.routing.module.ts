import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColorListComponent } from './color-list/color-list.component';
import { ColorFormComponent } from './color-form/color-form.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ColorListComponent,
      },
      {
        path: 'form',
        component: ColorFormComponent,
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ColorRoutingModule { }
