import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrademarkFORMComponent } from './trademark-form/trademark-form.component';
import { ListTrademarkComponent } from './list-trademark/list-trademark.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListTrademarkComponent,
      },
      {
        path: 'form/:type',
        component: TrademarkFORMComponent,
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrademarkRoutingModule { }
