import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListProviderComponent } from './list-provider/list-provider.component';
import { FormProviderComponent } from './form-provider/form-provider.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListProviderComponent,
      },
      {
        path: 'new',
        component: FormProviderComponent,
      },
      {
        path: 'form/:id',
        component: FormProviderComponent,
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProvidersRoutingModule { }
