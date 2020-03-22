import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { FormCategoryComponent } from './form-category/form-category.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListCategoriesComponent,
      },
      {
        path: 'new',
        component: FormCategoryComponent,
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CategoriesRoutingModule { }
