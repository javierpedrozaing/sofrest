import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { PurchaseService } from 'src/app/services/purchase.service';

export interface Order {
  correlative: string;
  type: string;
}

const ELEMENT_DATA: Order[] = [

];

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit,OnDestroy {
  displayedColumns: string[] = ['position',  "provider", "broadcast_date", "admission_date", "correlative", "type",];
  dataSource : any = new MatTableDataSource([]);
  public isMobile : boolean ;
  subscription: Subscription;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    public purchaseService : PurchaseService
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
    const dialogRef = this.dialog.open(DialogFormOrder, {
      width: '50vw'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getPurshase(){
    this.purchaseService.getPurshases().subscribe(response=>{
      if(response.data) this.dataSource =  new MatTableDataSource(response.data.purchase);
      this.dataSource.paginator = this.paginator;
    },
    error=>{
      console.log(error);
    })
  }

  ngOnInit() {
    this.getPurshase();
    this.dataSource.paginator = this.paginator;
  }
}

@Component({
  selector: 'dialog-form-order',
  templateUrl: 'dialog-form-order.html',
})
export class DialogFormOrder {

  constructor(
    public dialogRef: MatDialogRef<DialogFormOrder>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
