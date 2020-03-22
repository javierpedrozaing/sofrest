import { AccountingComponent } from './accounting.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElectronicReceiptComponent } from './electronic-receipt/electronic-receipt.component';
import { MotivesListComponent } from './motives-list/motives-list.component';
import { MotivesFormComponent } from './motives-form/motives-form.component';
import { PaymentsExpensesComponent } from './payments-expenses/payments-expenses.component';
import { PaymentsExpensesFormComponent } from './payments-expenses-form/payments-expenses-form.component';
import { DebitNoteComponent } from './debit-note/debit-note.component';
import { CredittNoteComponent } from './creditt-note/creditt-note.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: AccountingComponent,
      },
      {
        path: 'electronic-receipt',
        component: ElectronicReceiptComponent,
      },
      {
        path: 'motives',
        component: MotivesListComponent,
      },
      {
        path: 'motives/form',
        component: MotivesFormComponent,
      },
      {
        path: 'motives/form/:id',
        component: MotivesFormComponent,
      },
      {
        path: 'payments-expenses',
        component: PaymentsExpensesComponent,
      },
      {
        path: 'payments-expenses/form',
        component: PaymentsExpensesFormComponent,
      },
      {
        path: 'payments-expenses/form/:id',
        component: PaymentsExpensesFormComponent,
      },
      {
        path: 'debit',
        component: DebitNoteComponent,
      },
      {
        path: 'credit',
        component: CredittNoteComponent,
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingRoutingModule { }
