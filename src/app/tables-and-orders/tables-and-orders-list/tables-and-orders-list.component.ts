import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';


export interface TableAndOrder {
  number: number;
  code: string;
  shape: string;
  food_hall: string;
}

const ELEMENT_DATA: TableAndOrder[] = [
  { number : 1, code : '0000', shape : 'Cuadrada', food_hall: 'Salon 01' },
  { number : 2, code : '0000', shape : 'Cuadrada', food_hall: 'Salon 01' },
  { number : 3, code : '0000', shape : 'Cuadrada', food_hall: 'Salon 02' },
];
@Component({
  selector: 'app-tables-and-orders-list',
  templateUrl: './tables-and-orders-list.component.html',
  styleUrls: ['./tables-and-orders-list.component.scss']
})
export class TablesAndOrdersListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['number', 'code', 'shape', 'food_hall', 'options', ];
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
    const dialogRef = this.dialog.open(DialogFormTableAndOrder, {
      width: '50vw'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'dialog-form-tables-and-order',
  templateUrl: 'dialog-form-tables-and-order.html',
})
export class DialogFormTableAndOrder {

  constructor(
    public dialogRef: MatDialogRef<DialogFormTableAndOrder>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
