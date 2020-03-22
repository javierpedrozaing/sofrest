import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormProductComponent } from '../form-product/form-product.component';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';

export interface Product {
  description: string;
  status: boolean;
  product_type: any;
}

const ELEMENT_DATA: Product[] = [
  { description: 'Almacen 1', status : true, product_type : 1 },
  { description: 'Almacen 2', status : true, product_type : 1 },
  { description: 'Almacen 3', status : true, product_type : 1 },
];

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['position', 'description', 'product_type', 'status', 'options', ];
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
    const dialogRef = this.dialog.open(DialogFormProduct, {
      width: '50vw'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'dialog-form-product',
  templateUrl: 'dialog-form-product.html',
})
export class DialogFormProduct {

  constructor(
    public dialogRef: MatDialogRef<DialogFormProduct>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
