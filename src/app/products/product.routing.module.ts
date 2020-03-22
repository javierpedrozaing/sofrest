import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListProductComponent } from './list-product/list-product.component';
import { FormProductComponent } from './form-product/form-product.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListProductComponent,
      },
      {
        path: 'new',
        component: FormProductComponent,
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductRoutingModule { }
