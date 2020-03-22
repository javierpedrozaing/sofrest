import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsGeneralComponent } from '../settings.component';
import { OpenTicketsComponent } from '../open-tickets/open-tickets.component';
import { LoyaltyComponent } from '../loyalty/loyalty.component';
import { TaxesComponent } from '../taxes/taxes.component';
import { ReceiptComponent } from '../receipt/receipt.component';
import { OrderTypesComponent } from '../order-types/order-types.component';
import { GeneralSettingsComponent } from '../general-settings/general-settings.component';
import { ListCoinsComponent } from 'src/app/coins/list-coins/list-coins.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view',
        component: SettingsGeneralComponent,
      },
      {
        path: 'open-tickets',
        component: OpenTicketsComponent,
      },
      {
        path: 'loyalty-points',
        component: LoyaltyComponent,
      },
      {
        path: 'receipts',
        component: ReceiptComponent,
      },
      {
        path: 'taxes',
        component: TaxesComponent,
      },
      {
        path: 'coins',
        component: ListCoinsComponent,
      },
      {
        path: 'order-types',
        component: OrderTypesComponent,
      },
      {
        path: 'general',
        component: GeneralSettingsComponent,
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SettingsRoutingModule { }
