import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodHallListComponent } from './food-hall-list/food-hall-list.component';
import { FoodHallFormComponent } from './food-hall-form/food-hall-form.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: FoodHallListComponent,
      },
      {
        path: 'new',
        component: FoodHallFormComponent,
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FoodHallRoutingModule { }
