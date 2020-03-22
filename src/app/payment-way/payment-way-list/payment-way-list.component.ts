import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';

export interface PaymentWay {
  description: string;
  status: boolean;
  code: string;
}

const ELEMENT_DATA: PaymentWay[] = [
  { description: 'Forma 1', status : true, code : '000000' },
  { description: 'Forma 2', status : true, code : '000000' },
  { description: 'Forma 3', status : true, code : '000000' },
];

@Component({
  selector: 'app-payment-way-list',
  templateUrl: './payment-way-list.component.html',
  styleUrls: ['./payment-way-list.component.scss']
})
export class PaymentWayListComponent implements OnInit, OnDestroy {


  displayedColumns: string[] = ['position', 'description', 'code', 'status', 'options', ];
  dataSource = ELEMENT_DATA;
public isMobile : boolean ;
  subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
  ) {
        this.isMobile= this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => { 
      this.isMobile = isMobile;
    });
   }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogFormPaymentWay, {
      width: '50vw'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'dialog-form-payment-way',
  templateUrl: 'dialog-form-payment-way.html',
  styles : [`
    .content-header-modal{
      padding : 10px;
    }
  `]
})
export class DialogFormPaymentWay {

  constructor(
    public dialogRef: MatDialogRef<DialogFormPaymentWay>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
