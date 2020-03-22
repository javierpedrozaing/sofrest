import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogRef, MatDialog } from '@angular/material';
import { Order } from 'src/app/sales/list-sales/list-sales.component';
import { Subscription } from 'rxjs';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';

const ELEMENT_DATA: Order[] = [
  { type_sale: 'En Mostrador', payment_method: 'Efectivo', fec_create: '30/10/2019' },
  { type_sale: 'En Mostrador', payment_method: 'Efectivo', fec_create: '30/10/2019' },
  { type_sale: 'En Mostrador', payment_method: 'Efectivo', fec_create: '30/10/2019' },
  { type_sale: 'En Mostrador', payment_method: 'Efectivo', fec_create: '30/10/2019' },
];

@Component({
  selector: 'app-electronic-receipt',
  templateUrl: './electronic-receipt.component.html',
  styleUrls: ['./electronic-receipt.component.scss']
})
export class ElectronicReceiptComponent implements OnInit,OnDestroy {

  displayedColumns: string[] = ['position', 'correlative', 'type', 'fec_create', 'options'];
  public isMobile: boolean;
  subscription: Subscription;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: MatTableDataSource<Order>;

  constructor(
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) {
    this.isMobile = this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  openDialogCreditNote(): void {
    const dialogRef = this.dialog.open(DialogCreditNoteForm, {
      maxWidth : '100vw',
      minWidth: '60vw',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogDebitNote(): void {
    const dialogRef = this.dialog.open(DialogDebitNoteForm, {
      maxWidth : '100vw',
      minWidth: '60vw',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

@Component({
  selector: 'dialog-credit-note',
  templateUrl: 'dialog-credit-note.html',
  styles : []
})
export class DialogCreditNoteForm {

  constructor(
    public dialogRef: MatDialogRef<DialogCreditNoteForm>
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-debit-note',
  templateUrl: 'dialog-debit-note.html',
  styles : []
})
export class DialogDebitNoteForm {

  constructor(
    public dialogRef: MatDialogRef<DialogDebitNoteForm>
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
