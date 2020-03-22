import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table.component';
import { TableShapeComponent } from './table-shape/table-shape.component';


const routes: Routes = [
  {
    path: '', component: TableComponent
  },
  {
    path: 'shapes', component: TableShapeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TableRoutingModule { }
