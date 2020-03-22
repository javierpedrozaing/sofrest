import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountingRoutingModule } from './accounting-routing.module';
import { AccountingComponent } from './accounting.component';
import { CommonMaterialModule } from '../common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ElectronicReceiptComponent, DialogCreditNoteForm, DialogDebitNoteForm } from './electronic-receipt/electronic-receipt.component';
import { DebitNoteComponent, DialogDocumentInclude } from './debit-note/debit-note.component';
import { CredittNoteComponent } from './creditt-note/creditt-note.component';
import { MotivesListComponent, DialogMotivesForm } from './motives-list/motives-list.component';
import { MotivesFormComponent } from './motives-form/motives-form.component';
import { PaymentsExpensesComponent, DialogPaymentExpensesForm } from './payments-expenses/payments-expenses.component';
import { PaymentsExpensesFormComponent } from './payments-expenses-form/payments-expenses-form.component';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


@NgModule({
  declarations: [AccountingComponent, ElectronicReceiptComponent, DebitNoteComponent, CredittNoteComponent,DialogDebitNoteForm, DialogCreditNoteForm, MotivesListComponent, MotivesFormComponent,DialogMotivesForm, PaymentsExpensesComponent, PaymentsExpensesFormComponent,
    DialogPaymentExpensesForm,
    DialogDocumentInclude,
  ],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AccountingRoutingModule,
    FileUploadModule,
    NgxMatSelectSearchModule,
  ],
  entryComponents:[
    DialogCreditNoteForm,
    DialogDebitNoteForm,
    DialogMotivesForm,
    DialogPaymentExpensesForm,
    DialogDocumentInclude,
  ]
})
export class AccountingModule { }
