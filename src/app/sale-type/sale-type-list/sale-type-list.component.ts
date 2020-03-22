import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';

export interface SaleType {
  description: string;
  status: boolean;
}

const ELEMENT_DATA: SaleType[] = [
  { description: 'Tipo de Venta 1', status : true, },
  { description: 'Tipo de Venta 2', status : true, },
  { description: 'Tipo de Venta 3', status : true, },
];

@Component({
  selector: 'app-sale-type-list',
  templateUrl: './sale-type-list.component.html',
  styleUrls: ['./sale-type-list.component.scss']
})
export class SaleTypeListComponent implements OnInit, OnDestroy {


  displayedColumns: string[] = ['position', 'description', 'status', 'options', ];
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
    const dialogRef = this.dialog.open(DialogFormSaleType, {
      width: '50vw'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'dialog-form-sale-type',
  templateUrl: 'dialog-form-sale-type.html',
  styles : [`
    .content-header-modal{
      padding : 10px;
    }
  `]
})
export class DialogFormSaleType {

  constructor(
    public dialogRef: MatDialogRef<DialogFormSaleType>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
