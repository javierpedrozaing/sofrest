import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator, MatDialogRef } from '@angular/material';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { QuotationFormComponent } from '../quotation-form/quotation-form.component';

@Component({
  selector: 'app-quotation-list',
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.scss']
})
export class QuotationListComponent implements OnInit,OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ["date","num","client","currency","onerosa","send","pdf","cpe","options",];
  public isMobile: boolean;
  subscription: Subscription;
  dataSource: MatTableDataSource<any>;
  public currencies: any =
  [
    {
      id: 1,
      name: "Soles"
    },
    {
      id: 2,
      name: "USD"
    }
  ]
  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService
  ) {
    this.isMobile = this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(QuotationFormComponent, {
      maxWidth : '100vw',
      minWidth: '60vw',
      height: '80vh'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([
      {
        "date":"23-10-2019", num:"DGTR-001", currency:"S/", onerosa: 206.63, send:true, cpe: "C700-11", "client": "Pedro Pérez", "product": "Producto 1",
      },
      {
        "date":"24-10-2019", num:"DGTR-002", currency:"S/", onerosa: 209.63, send:false, cpe: "B800-1", "client": "Josefa Pérez", "product": "Producto 2",
      },
    ]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

@Component({
  selector: 'dialog-quotation',
  templateUrl: 'dialog-quotation.html',
  styles : []
})
export class DialogQuotationForm {

  constructor(
    public dialogRef: MatDialogRef<DialogQuotationForm>
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
