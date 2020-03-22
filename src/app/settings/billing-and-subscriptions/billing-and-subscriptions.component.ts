import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EmployeeAmdComponent } from './modals/employee-amd/employee-amd.component';
import { EmployeeDropoutComponent } from './modals/employee-dropout/employee-dropout.component';
import { InvAvzComponent } from './modals/inv-avz/inv-avz.component';
import { InvAvzDropoutComponent } from './modals/inv-avz-dropout/inv-avz-dropout.component';
import { PaymentMethodConfigComponent } from './modals/payment-method-config/payment-method-config.component';
import { DetailFactureChangeComponent } from './modals/detail-facture-change/detail-facture-change.component';
import { DialogFormPaymentMethod } from 'src/app/payment-method/payment-method-list/payment-method-list.component';

@Component({
  selector: 'app-billing-and-subscriptions',
  templateUrl: './billing-and-subscriptions.component.html',
  styleUrls: ['./billing-and-subscriptions.component.scss']
})
export class BillingAndSubscriptionsComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

    InvAvz(): void {
      const dialogRef = this.dialog.open(InvAvzComponent, {
        width: '400px',
        panelClass: 'config-modal',
        data: {}
      });
  
      dialogRef.afterClosed().subscribe(result => {
    
        
      });
    }
  
    IAdropout(): void {
      const dialogRef = this.dialog.open(InvAvzDropoutComponent, {
        width: '400px',
        panelClass: 'config-modal',
        data: {}
      });
  
      dialogRef.afterClosed().subscribe(result => {
    
        
      });
    }

  EmployeeAdm(): void {
    const dialogRef = this.dialog.open(EmployeeAmdComponent, {
      width: '400px',
      panelClass: 'config-modal',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
  
      
    });
  }

  Edropout(): void {
    const dialogRef = this.dialog.open(EmployeeDropoutComponent, {
      width: '400px',
      panelClass: 'config-modal',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
  
      
    });
  }

  AddPaymentMethod(): void {
    const dialogRef = this.dialog.open(DialogFormPaymentMethod, {
      width: '600px',
      panelClass: 'config-modal',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
  
      
    });
  }

  ChangeDetailFacture(): void {
    const dialogRef = this.dialog.open(DetailFactureChangeComponent, {
      width: '400px',
      panelClass: 'config-modal',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
  
      
    });
  }

}

