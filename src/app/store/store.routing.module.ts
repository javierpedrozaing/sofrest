import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListStoreComponent } from './list-store/list-store.component';
import { FormStoreComponent } from './form-store/form-store.component';
import { StockStoreComponent } from './stock-store/stock-store.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListStoreComponent,
      },
      {
        path: 'new',
        component: FormStoreComponent,
      },
      {
        path: 'stock/:id',
        component: StockStoreComponent,
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StoreRoutingModule { }
