import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrintersComponent } from './printers.component';
import { PrintersFormComponent } from './printers-form/printers-form.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: PrintersComponent,
      },
      {
        path: 'form',
        component: PrintersFormComponent,
      },
      {
        path: 'form/:id',
        component: PrintersFormComponent,
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintersRoutingModule { }
