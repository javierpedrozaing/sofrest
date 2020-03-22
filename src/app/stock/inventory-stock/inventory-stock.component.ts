import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

export interface HistoryStock {
  date: string;
  article: string;
  shop: string;
  employee: string;
  motive: string;
  ajust: number;
  final_stock: number;
}

@Component({
  selector: 'app-inventory-stock',
  templateUrl: './inventory-stock.component.html',
  styleUrls: ['./inventory-stock.component.scss']
})
export class InventoryStockComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ["date", "article", "shop", "employee", "motive", "ajust", "final_stock",'options'];
  dataSource: MatTableDataSource<HistoryStock>;
  public isMobile: boolean;
  subscription: Subscription;
  allSelected: boolean;
  allSelectedStore: boolean = true;
  allSelectedEmployees: boolean = true;
  allSelectedMotives: boolean = true;
  showRemove: boolean;
  shop = [];
  employees = [];
  motivesOptions = [];
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
  public dateRange: FormControl = new FormControl([{ begin: new Date(), end: new Date() }]);

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

  motives: any = [
    {
      "id": 1,
      "name": "Vendido",
    },
    {
      "id": 2,
      "name": "Devuelto",
    },
    {
      "id": 3,
      "name": "Recibido",
    },
    {
      "id": 4,
      "name": "Transferido",
    },
    {
      "id": 5,
      "name": "Recontado",
    },
    {
      "id": 6,
      "name": "Dañado",
    },
    {
      "id": 7,
      "name": "Pérdida",
    },
    {
      "id": 8,
      "name": "Artículo Editado",
    },
    {
      "id": 9,
      "name": "Producción",
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
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    public dialog: MatDialog,
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectAllStore(value) {
    if (value) this.shop = this.stores;
    else this.shop = [];
  }

  selectAllEmployees(value) {
    if (value) this.employees = this.employeesData;
    else this.employees = [];
  }

  selectAllMotives(value) {
    if (value) this.motivesOptions = this.motives;
    else this.motivesOptions = [];
  }


  ngOnInit() {
    this.allSelected = false;
    this.showRemove = false;
    this.dataSource = new MatTableDataSource([
      {
        date: "11 nov. 2019 22:13",
        article: "Ensalada Fresca",
        employee: "Pedro Pérez",
        shop: "Local 1",
        motive: "Recibido",
        ajust: 10,
        final_stock: 12,
      },
      {
        date: "10 nov. 2019 22:13",
        article: "Ensalada Fresca",
        employee: "Petra Pérez",
        shop: "Local 1",
        motive: "Recibido",
        ajust: 10,
        final_stock: 12,
      },
      {
        date: "09 nov. 2019 22:13",
        article: "Ensalada Fresca",
        employee: "Josefa Pérez",
        shop: "Local 1",
        motive: "Recibido",
        ajust: 10,
        final_stock: 12,
      },
    ]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.selectAllEmployees(true);
    this.selectAllStore(true);
    this.selectAllMotives(true);
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

  changeMotives() {
    if (this.motives.length === this.motivesOptions.length) this.allSelectedMotives = true;
    else this.allSelectedMotives = false;
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(DialogInventoryStockDetail, {
      width: '85vw',
      data: data === null ? {} : data
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

@Component({
  selector: 'dialog-inventory-detail.html',
  templateUrl: 'dialog-inventory-detail.html',
})
export class DialogInventoryStockDetail {
  public form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogInventoryStockDetail>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    ) {
      this.form = fb.group({
        date: [{value: (data.date) ? data.date : null , disabled:true}, [Validators.required]],
        article: [{value: (data.article) ? data.article : null , disabled:true}, [Validators.required]],
        shop: [{value: (data.shop) ? data.shop : null , disabled:true}, [Validators.required]],
        employee: [{value: (data.employee) ? data.employee : null , disabled:true}, [Validators.required]],
        motive: [{value: (data.motive) ? data.motive : null , disabled:true}, [Validators.required]],
        ajust: [{value: (data.ajust) ? data.ajust : null , disabled:true}, [Validators.required]],
        final_stock: [{value: (data.final_stock) ? data.final_stock : null , disabled:true}, [Validators.required]],
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

