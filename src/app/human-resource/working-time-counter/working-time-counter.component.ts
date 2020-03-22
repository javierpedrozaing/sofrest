import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { FormGroup, FormBuilder } from '@angular/forms';

export interface AssistanceEmployee {
  employee: string;
  shop: any;
  total: number;
}

@Component({
  selector: 'app-working-time-counter',
  templateUrl: './working-time-counter.component.html',
  styleUrls: ['./working-time-counter.component.scss']
})
export class WorkingTimeCounterComponent implements OnInit, OnDestroy {


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ["employee", "shop", "total",];
  dataSource: MatTableDataSource<AssistanceEmployee>;
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

  public isMobile: boolean;

  form: FormGroup;
  constructor(
    fb: FormBuilder,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService

  ) {
    this.isMobile = this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
    this.alwaysShowCalendars = true;
    this.form = fb.group({
      date: [{ begin: new Date(), end: new Date() }]
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.allSelected = false;
    this.showRemove = false;
    this.dataSource = new MatTableDataSource([
      {
        employee: "Pedro Pérez",
        shop: "Local 1",
        total: 12,
      },
      {
        employee: "Petra Pérez",
        shop: "Local 1",
        total: 21,
      },
      {
        employee: "Josefa Pérez",
        shop: "Local 1",
        total: 10,
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

  getTotal() {
    return this.dataSource.data.map(t => t.total).reduce((acc, value) => acc + value, 0);
  }

}
