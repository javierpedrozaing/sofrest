import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuotationListComponent } from './quotation-list/quotation-list.component';
import { QuotationFormComponent } from './quotation-form/quotation-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: QuotationListComponent,
      },
      {
        path: 'form',
        component: QuotationFormComponent,
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class QuotationRoutingModule { }
