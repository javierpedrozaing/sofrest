import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface AssistanceCard {
  entry: string;
  out: string;
  employee: string;
  shop: any;
  total: string;
  checked: boolean;
}

@Component({
  selector: 'app-assistance-card',
  templateUrl: './assistance-card.component.html',
  styleUrls: ['./assistance-card.component.scss']
})
export class AssistanceCardComponent implements OnInit, OnDestroy {


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['position', "entry", "out", "employee", "shop", "total",];
  dataSource: MatTableDataSource<AssistanceCard>;

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
  ranges: any = {
    'Hoy': [moment(), moment()],
    'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Últimos 7 Días': [moment().subtract(6, 'days'), moment()],
    'Últimos 30 Días': [moment().subtract(29, 'days'), moment()],
    'Este Mes': [moment().startOf('month'), moment().endOf('month')],
    'Mes Pasado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  invalidDates: moment.Moment[] = [];

  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some(d => d.isSame(m, 'day'))
  }

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
    const dialogRef = this.dialog.open(DialogAssistanceCardForm, {
      width: '70vw'
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
        entry: "07-11-2019",
        out: "08-11-2019",
        employee: "Pedro Pérez",
        shop: "Local 1",
        total: "12",
        checked: false,
      },
      {
        entry: "08-11-2019",
        out: null,
        employee: "Petra Pérez",
        shop: "Local 1",
        total: "21",
        checked: false,
      },
      {
        entry: "09-11-2019",
        out: null,
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

  checkedElement(value: boolean, index: number) {
    this.dataSource.data[index]["checked"] = value;
    if (!value) this.allSelected = false;
    else {
      this.showRemove = value;
      this.allSelected = this.dataSource.data.length === this.dataSource.data.filter(data => data.checked).length ? true : false;
    }
    this.showRemove = this.dataSource.data.filter(data => data.checked === true).length > 0 ? true : false;
  }

  selectAll(value: boolean) {
    this.allSelected = value;
    this.showRemove = value;
    this.dataSource.data.map(data => {
      data.checked = value;
      return data;
    });
    this.showRemove = this.dataSource.data.filter(data => data.checked === true).length > 0 ? true : false;
  }

  removeSelected() {
    this.dataSource.data = this.dataSource.data.filter(data => !data.checked);
    this.toastr.clear();
    this.toastr.success('Operación Exitosa');
    this.allSelected = this.showRemove = false;
  }
}

@Component({
  selector: 'dialog-assistance-card-form.html',
  templateUrl: 'dialog-assistance-card-form.html',
})
export class DialogAssistanceCardForm {

  constructor(
    public dialogRef: MatDialogRef<DialogAssistanceCardForm>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
