import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import * as moment from 'moment'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-out-stock',
  templateUrl: './out-stock.component.html',
  styleUrls: ['./out-stock.component.scss']
})
export class OutStockComponent implements OnInit {


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['position', "out", "employee", "shop", "total",];
  dataSource: MatTableDataSource<any>;

  public isMobile: boolean;
  subscription: Subscription;
  allSelected: boolean;
  allSelectedStore: boolean = true;
  allSelectedEmployees: boolean = true;
  showRemove: boolean;
  shop = [];
  employees = [];

  selected: any = [moment(), moment()];
  alwaysShowCalendars: boolean;

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  stores: any = [
    {
      "id": 1,
      "name": "Local 1",
    },
    {
      "id": 2,
      "name": "Local 2",
    },
    {
      "id": 3,
      "name": "Local 3",
    },
  ];

  employeesData: any = [
    {
      "id": 1,
      "name": "Pedro Pérez",
    },
    {
      "id": 2,
      "name": "Petra Pérez",
    },
    {
      "id": 3,
      "name": "Josefa Pérez",
    },
  ];

  form: FormGroup;
  constructor(
    fb: FormBuilder,
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService
  ) {
    this.alwaysShowCalendars = true;
    this.isMobile = this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
    this.form = fb.group({
      date: [{ begin: new Date(), end: new Date() }]
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOutStockForm, {
      maxWidth : '100vw',
      minWidth: '60vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  selectAllStore(value) {
    if (value) this.shop = this.stores;
    else this.shop = [];
  }

  selectAllEmployees(value) {
    if (value) this.employees = this.employeesData;
    else this.employees = [];
  }

  ngOnInit() {
    this.allSelected = false;
    this.showRemove = false;
    this.dataSource = new MatTableDataSource([
      {
        out: "07-11-2019",
        employee: "Pedro Pérez",
        shop: "Local 1",
        total: "12",
        checked: false,
      },
      {
        out: "08-11-2019",
        employee: "Petra Pérez",
        shop: "Local 1",
        total: "21",
        checked: false,
      },
      {
        out: "09-11-2019",
        employee: "Josefa Pérez",
        shop: "Local 1",
        total: "10",
        checked: false,
      },
    ]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.selectAllEmployees(true);
    this.selectAllStore(true);
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changeShop() {
    if (this.shop.length === this.stores.length) this.allSelectedStore = true;
    else this.allSelectedStore = false;
  }

  changeEmployee() {
    if (this.employees.length === this.employeesData.length) this.allSelectedEmployees = true;
    else this.allSelectedEmployees = false;
  }

}


@Component({
  selector: 'dialog-out-stock.html',
  templateUrl: 'dialog-out-stock.html',
})
export class DialogOutStockForm {

  constructor(
    public dialogRef: MatDialogRef<DialogOutStockForm>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

