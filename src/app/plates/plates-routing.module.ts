import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlatesComponent } from './plates.component';
import { DishCategoryListComponent } from './dish-category-list/dish-category-list.component';
import { TasteListComponent } from './taste-list/taste-list.component';
import { PlateFormComponent } from './plate-form/plate-form.component';

const routes: Routes = [
  {
    path: '', 
    component: PlatesComponent
  },
  {
    path: 'form', 
    component: PlateFormComponent
  },
  {
    path: 'form/:id', 
    component: PlateFormComponent
  },
  {
    path: 'dish-category', 
    component: DishCategoryListComponent
  },
  {
    path: 'taste', 
    component: TasteListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatesRoutingModule { }
