import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { SalesService } from 'src/app/services/Sales/sales.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { BoxService } from 'src/app/services/box.service';
import { Router } from '@angular/router';

export interface Order {
  type_sale: string;
  payment_method: string;
  fec_create: String;
}

const ELEMENT_DATA: any[] = [
  { type_sale: 'En Mostrador', payment_method : 'Efectivo' , fec_create: '30/10/2019' },
  { type_sale: 'En Mostrador', payment_method : 'Efectivo' , fec_create: '30/10/2019' },
  { type_sale: 'En Mostrador', payment_method : 'Efectivo' , fec_create: '30/10/2019' },
];

@Component({
  selector: 'app-list-sales',
  templateUrl: './list-sales.component.html',
  styleUrls: ['./list-sales.component.scss']
})
export class ListSalesComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['position', 'correlative', 'customer', 'fec_create', 'total', 'options', ];
  dataSource = new MatTableDataSource<any>([]);
  public isMobile : boolean ;
  subscription: Subscription;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    private salesService: SalesService,
    private BoxService: BoxService,
    private router: Router,
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
    const dialogRef = this.dialog.open(SalesForm, {
      width: '85vw',
      panelClass: 'config-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  verifyOpenBox(){
    this.BoxService.assignedBox().subscribe(res=>{
      if(res.data){
        if(res.data.assigned_box === null) {
          this.toastr.clear();
          return this.toastr.error("No tiene caja aperturada","Acción inválida");
        }
        else{
          this.router.navigate(['/pos-sales/shopping-cart']);
        }
      }
    },
    err=>{
      console.log(err);
    })
  }

  getSales() {
    this.salesService.getAll().subscribe(response => {
      if(response.data)  this.dataSource =  new MatTableDataSource(response.data.sales);
      this.dataSource.paginator = this.paginator;
    })
  }

  ngOnInit() {
    this.getSales();
    this.dataSource.paginator = this.paginator;
  }

}


@Component({
  selector: 'sales-form',
  templateUrl: 'new-sale.html',
  styles : [`
    .content-header-modal{
      padding : 10px;
    }
  `]
})
export class SalesForm {

  constructor(
    public dialogRef: MatDialogRef<SalesForm>
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
