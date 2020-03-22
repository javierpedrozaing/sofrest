import { Component, OnInit, ViewChild, Inject, OnDestroy, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { Subscription, Subject, ReplaySubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { MatSelect } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { HeadquarterService } from 'src/app/services/headquarter.service';
import { CategoryService } from 'src/app/services/category.service';
import { SubCategoryService } from 'src/app/services/sub-category.service';
import { ProductsService } from 'src/app/services/products.service';
import { ComboService } from 'src/app/services/combo.service';
import { ProvidersService } from 'src/app/services/providers.service';
import { OrdersService } from 'src/app/services/orders.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { MeasurementUnitService } from 'src/app/services/measurement-unit.service';
import { ActivatedRoute, Router } from '@angular/router';

export interface TransferOrders {
  order_num: string;
  date: string;
  created_at: string;
  origin_shop: string;
  destination_shop: string;
  status: string;
  qty: number;
}

export interface ArticlesTransferOrders {
  article: string;
  initial_stock: number;
  end_stock: number;
  qty: number;
}

const ELEMENT_DATA: TransferOrders[] = [
  { order_num: 'T200', date: '20/05/2019', created_at: "20/05/2019", origin_shop: 'Local 1', destination_shop: 'Local 2', status: 'Transferido', qty: 20 },
];

const ELEMENT_DATA1: ArticlesTransferOrders[] = [];

@Component({
  selector: 'app-transfer-order',
  templateUrl: './transfer-order.component.html',
  styleUrls: ['./transfer-order.component.scss']
})
export class TransferOrderComponent implements OnInit, OnDestroy {

  shops = ['Local 1', 'Local 2', 'Local 3'];
  Status = ['En Transito', 'Transferido'];
  statusSelect: any;
  shop1Select: any;
  shop2Select: any;
  displayedColumns: string[] = ['order_num', 'date', 'created_at', 'origin_shop', 'destination_shop', 'status', 'qty', 'options'];
  dataSource = new MatTableDataSource<any>([]);
  subscription: Subscription;
  public isMobile: boolean;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getOrders();
  }

  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    private coolDialogs: NgxCoolDialogsService,
    public ordersService: OrdersService,
  ) {
    this.isMobile = this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getOrders() {
    this.ordersService.getOrderByType(1).subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.order_with_order_type);
    }, err => {
      console.log(err);
    });
  }

  deleteOrder(id, index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado', {
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
      .subscribe(res => {
        if (res) {
          this.ordersService.deleteOrder(id).subscribe(res => {
            this.toastr.success("Operación realizada satisfactoriamente");
            this.dataSource.data.splice(index, 1);
            this.dataSource.data = [].concat(this.dataSource.data);
          }, err => {
            console.log(err);
          });
        }
      });
  }

  changeVisibility(id, index, status) {
    let action = '';

    status == true ? (action = 'ocultará') : (action = 'mostrará');

    this.coolDialogs.confirm(`Se ${action} el registro indicado`, {
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
      .subscribe(res => {
        if (res) {
          this.ordersService.updateStateOrder({ state: !this.dataSource.data[index]["state"] }, id).subscribe(res => {
            this.toastr.success("Operación realizada satisfactoriamente");
            this.dataSource.data[index]["state"] = !this.dataSource.data[index]["state"];
            this.dataSource.data = [].concat(this.dataSource.data);
          }, err => {
            console.log(err);
          });
        }
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewTransferOrderDialog, {
      height: '90vh',
      maxWidth: '100vw',
      minWidth: '50vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
@Component({
  selector: 'app-new-transfer-order-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class NewTransferOrderDialog implements OnInit {

  addTransferOrderFormGroup: FormGroup;
  articles = ['Articulo 1', 'Articulo 2', 'Articulo 3'];
  displayedColumns: string[] = ['article', 'initial_stock', 'entries', 'coin', 'qty', 'sub_total', 'qty_total', 'options'];
  modaldataSource = new MatTableDataSource<any>([]);
  isSaved = false;
  shops = ['Local 1', 'Local 2', 'Local 3'];
  minDate = new Date();
  @Input() orderID: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public products: any[] = [];

  public productCtrl: FormControl = new FormControl();
  public productFilterCtrl: FormControl = new FormControl();
  public filteredProducts: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  public categoryCtrl: FormControl = new FormControl();
  public categoryFilterCtrl: FormControl = new FormControl();
  public filteredCategories: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect1', { static: true }) singleSelect1: MatSelect;

  public subCategoryCtrl: FormControl = new FormControl();
  public subCategoryFilterCtrl: FormControl = new FormControl();
  public filteredSubCategories: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect2', { static: true }) singleSelect2: MatSelect;

  public categories: any[] = [];
  public subCategories: any[] = [];
  public headquarters: any[] = [];
  public combos: any[] = [];
  public units: any[] = [];
  public providers: any[] = [];

  public filterCategories() {
    if (!this.categories) {
      return;
    }
    let search = this.categoryFilterCtrl.value;
    if (!search) {
      this.filteredCategories.next(this.categories.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredCategories.next(
      this.categories.filter(product => product.name.toLowerCase().indexOf(search) > -1)
    );
  }

  public filterSubCategories() {
    if (!this.subCategories) {
      return;
    }
    let search = this.subCategoryFilterCtrl.value;
    if (!search) {
      this.filteredSubCategories.next(this.subCategories.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredSubCategories.next(
      this.subCategories.filter(product => product.name.toLowerCase().indexOf(search) > -1)
    );
  }

  public filterProducts() {
    if (!this.products) {
      return;
    }
    let search = this.productFilterCtrl.value;
    if (!search) {
      this.filteredProducts.next(this.products.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredProducts.next(
      this.products.filter(product => product.name.toLowerCase().indexOf(search) > -1)
    );
  }

  public _onDestroy = new Subject<void>();

  public isMobile: boolean;
  subscription: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    //public dialogRef: MatDialogRef<NewTransferOrderDialog>,
    private toastr: ToastrService,
    public headquarterService: HeadquarterService,
    public categoryService: CategoryService,
    public subCategoryService: SubCategoryService,
    public productsService: ProductsService,
    public comboService: ComboService,
    public providersService: ProvidersService,
    public ordersService: OrdersService,
    private coolDialogs: NgxCoolDialogsService,
    public measurementUnitService: MeasurementUnitService,
    private atp: AmazingTimePickerService,
    private router: Router,
    public route: ActivatedRoute,
    private screenMobileChangeService: ScreenMobileChangeService,
    //@Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modaldataSource.paginator = this.paginator;
    this.addTransferOrderFormGroup = this._formBuilder.group({
      headquarter_orgin_id: [null, Validators.required],
      headquarter_destination_id: [null, Validators.required],
      hour: [null, [Validators.required]],
      observations: [null],
      provider_id: [null, Validators.required],
      order_type: [1, Validators.required],
      waiting_for: [null, Validators.required],
      igv: [null, [Validators.required]],
      tax: [null, [Validators.required]],
      observation: [null, [Validators.required]],
      state: [true, [Validators.required]],
    });
    this.isMobile = this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  pickStartTime() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      this.addTransferOrderFormGroup.controls['hour'].setValue(time);
    });
  }

  ngOnInit() {
    this.filteredProducts.next(this.products.slice());
    this.productFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterProducts();
      });
    this.filteredCategories.next(this.categories.slice());
    this.categoryFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCategories();
      });
    this.filteredSubCategories.next(this.subCategories.slice());
    this.subCategoryFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterSubCategories();
      });
    this.getMeasurementUnit();
    this.getCategories();
    this.getHeadquarters();
    this.getProviders();
    if (this.route.snapshot.params.id) {
      this.getOrder(this.route.snapshot.params.id);
    }
  }


  getOrder(id) {
    this.orderID = id;
    this.ordersService.getOrder(id).subscribe(res => {
      if(res.data){
      if (res.data.orders.length === 0) {
        this.toastr.error("No se encuentra el registro indicado")
      } else {
        this.addTransferOrderFormGroup.patchValue({
          total: res.data.orders[0].total,
          subtotal: res.data.orders[0].subtotal,
          igv: res.data.orders[0].igv,
          tax: res.data.orders[0].tax,
          observation: res.data.orders[0].observation,
          waiting_for: new Date(res.data.orders[0].waiting_for),
          correlative: res.data.orders[0].correlative,
          serial_number: res.data.orders[0].serial_number,
          state: res.data.orders[0].state,
          order_type: res.data.orders[0].order_type,
          provider_id: (res.data.orders[0].provider) ? res.data.orders[0].provider.id : null,
          headquarter_orgin_id: (res.data.orders[0].headquarter_orgin) ? res.data.orders[0].headquarter_orgin.id : null,
          headquarter_destination_id: (res.data.orders[0].headquarter_destination) ? res.data.orders[0].headquarter_destination.id : null,
        });
        if (res.data.orders[0].order_detail.length > 0) {
          const data = this.modaldataSource.data;
          res.data.orders[0].order_detail.map(x => {
            data.push({ article: x.product.name, id: x.product.id, coin: x.unit_price, unit: x.measurement_unit.id, initial_stock: 0, entries: 0, qty: x.quantity, cost: 0, cost_price: x.cost_price, qty_total: 0, db_id: x.id });
          })
          this.modaldataSource.data = [].concat(data);
        }
        this.calculateTotal();
      }
    }
    }, err => {
      console.log(err);
    });
  }

  submit(data: any, formDirective: FormGroupDirective) {
    //if(data.headquarter_orgin_id === data.headquarter_destination_id) return this.toastr.error("No puede transferir a la misma sucursal")
    data.quantity_order_detail = this.modaldataSource.data.map(x => x.qty);
    data.cost_price_order_detail = this.modaldataSource.data.map(x => x.cost_price);
    data.unit_price_order_detail = this.modaldataSource.data.map(x => x.coin);
    data.product_order_detail = this.modaldataSource.data.map(x => x.id);
    data.measurement_unit_order_detail = this.modaldataSource.data.map(x => x.unit);
    data.order_detail_id = this.modaldataSource.data.map(x => x.db_id);
    data.subtotal_order_detail = [];
    data.total_order_detail = [];
    data.headquarter_id = data.headquarter_orgin_id;
    data.total = this.calculateTotal();
    let date = this.formatDate(new Date());
    data.waiting_for = this.formatDate(data.waiting_for);
    data.hour = `${date} ${data.hour}:00`
    data.subtotal = data.total;
    for (let index = 0; index < this.modaldataSource.data.length; index++) {
      if (isNaN(this.modaldataSource.data[index]['qty'] * this.modaldataSource.data[index]['coin'])) return this.toastr.error("Algunos datos indicados no son válidos");
      data.subtotal_order_detail.push(this.modaldataSource.data[index]['qty'] * this.modaldataSource.data[index]['coin']);
      data.total_order_detail.push(this.modaldataSource.data[index]['qty'] * this.modaldataSource.data[index]['coin']);
    }
    if (this.orderID) this.edit(data);
    else this.save(data, formDirective);
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  formatTime(time) {
    let date = new Date(time)
    let format = (date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()) + ":" + (date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes());
    return format;
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.ordersService.createOrder(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.router.navigateByUrl("/stock/transfer-orders");
    }, err => {
      console.log(err);
    });
  }

  edit(data: any) {
    this.ordersService.updateOrder(this.orderID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.router.navigateByUrl("/stock/transfer-orders");
    }, err => {
      console.log(err);
    });
  }

  addArticle(value: any) {
    if (this.modaldataSource.data.find(x => x.article === value)) {
      this.toastr.warning("Ya agregó el artículo seleccionado");
    } else {
      const data = this.modaldataSource.data;
      data.push({ article: value.name, id: value.id, initial_stock: 0, end_stock: 0, qty: 0, cost: 0, qty_total: 0, db_id: 0 });
      this.modaldataSource.data = data;
    }
    this.productCtrl.setValue(null);
  }

  deleteArticle(idx) {
    this.coolDialogs.confirm('Se eliminará el registro indicado', {
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
      .subscribe(res => {
        if (res) {
          if (!this.modaldataSource.data[idx]["db_id"]) {
            const data = this.modaldataSource.data;
            data.splice(idx, 1);
            this.modaldataSource.data = [].concat(data);
          } else {
            this.ordersService.deleteOrder(this.modaldataSource.data[idx]["db_id"]).subscribe(res => {
              this.toastr.success("Operación realizada satisfactoriamente");
              this.modaldataSource.data.splice(idx, 1);
              this.modaldataSource.data = [].concat(this.modaldataSource.data);
            }, err => {
              console.log(err);
            });
          }
        }
      });
  }

  addOrder() {
    this.isSaved = true;
  }
  onNoClick(): void {
    //this.dialogRef.close();
  }

  compareObjects(o1: any, o2: any) {
    if (o1.id === o2.id) return true;
    else return false
  }

  getHeadquarters() {
    this.headquarterService.getHeadquarters().subscribe(res => {
      if(res.data) this.headquarters = [].concat(res.data.headquarters);
    }, err => {
      console.log(err);
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(res => {
      if(res.data) this.categories = [].concat(res.data.categories);
      this.filterCategories();
    }, err => {
      console.log(err);
    });
  }

  getSubCategories() {
    this.subCategoryService.getSubCategories().subscribe(res => {
      if(res.data) this.subCategories = [].concat(res.data.sub_category);
      this.filterSubCategories();
    }, err => {
      console.log(err);
    });
  }

  getProducts() {
    this.productsService.getProducts().subscribe(res => {
      if(res.data) this.products = [].concat(res.data.products);
      this.filterProducts();
    }, err => {
      console.log(err);
    });
  }

  getSubCategoriesByCat(id) {
    this.subCategoryService.getSubCategoryByCategory(id).subscribe(res => {
      if(res.data) this.subCategories = [].concat(res.data.sub_category_with_category);
      this.filterSubCategories();
    });
  }

  getProductsBySubcategory(id) {
    this.productsService.getProductsBySubcategory(id).subscribe(res => {
      if(res.data) this.products = [].concat(res.data.product_with_subcategory);
      this.filterProducts();
    }, err => {
      console.log(err);
    })
  }

  getProviders() {
    this.providersService.getProviders().subscribe(res => {
      if(res.data) this.providers = [].concat(res.data.providers);
    }, err => {
      console.log(err);
    });
  }

  getMeasurementUnit() {
    this.measurementUnitService.getMeasurementUnits().subscribe(res => {
      if(res.data) this.units = [].concat(res.data.measurement_units);
    }, err => {
      console.log(err);
    });
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  verifyEntryValue(evt, index, key) {
    if (isNaN(evt.data)) {
      evt.target.value = 0;
      this.modaldataSource.data[index][key] = 0;
    }
  }

  calculateTotal() {
    let total = 0;
    this.modaldataSource.data.map((value) => {
      if (!isNaN(value.qty) && !isNaN(value.coin)) {
        total += value.qty * value.coin
      }
    })
    return total;
  }
}
