import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';

export interface StockProdutions {
  production_num: string;
  date: string;
  shop: string;
  type: string;
  qty: string;
}

const ELEMENT_DATA: StockProdutions[] = [
  { production_num: 'IC1001', date: '20/05/2019', shop: 'Local 1', type: 'Donas', qty: '10' }
];

@Component({
  selector: 'app-productions',
  templateUrl: './productions.component.html',
  styleUrls: ['./productions.component.scss']
})
export class ProductionsComponent implements OnInit, OnDestroy {

  shops = ['Local 1', 'Local 2', 'Local 3'];
  Types = ['Produccion', 'Desmontaje'];
  typeSelect: any;
  shop1Select: any;
  displayedColumns: string[] = ['production_num', 'date', 'shop', 'type', 'qty'];
  dataSource = new MatTableDataSource<StockProdutions>(ELEMENT_DATA);
  public isMobile : boolean ;
  subscription: Subscription;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService
  ) { 
        this.isMobile= this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => { 
      this.isMobile = isMobile;
    });
  }

    ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogProductionForm, {
      maxWidth : '100vw',
      minWidth: '60vw',
      panelClass: 'config-modal',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}

@Component({
  selector: 'dialog-production',
  templateUrl: 'dialog-production.html',
  styles : []
})
export class DialogProductionForm {

  constructor(
    public dialogRef: MatDialogRef<DialogProductionForm>
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}