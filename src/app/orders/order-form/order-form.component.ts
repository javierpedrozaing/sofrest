import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource, MatSelect } from '@angular/material';
import { Subject, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { VoucherTypeService } from 'src/app/services/voucher-type.service';
import { CoinService } from 'src/app/services/coin.service';
import { ProvidersService } from 'src/app/services/providers.service';
import { AreaService } from 'src/app/services/area.service';
import { IncomeTypeService } from 'src/app/services/income-type.service';
import { KardexService } from 'src/app/services/kardex.service';
import { CategoryService } from 'src/app/services/category.service';
import { SubCategoryService } from 'src/app/services/sub-category.service';
import { ProductsService } from 'src/app/services/products.service';
import { HeadquarterService } from 'src/app/services/headquarter.service';
import * as moment from 'moment';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {

  @Input() orderID: any;
  public form: FormGroup;
  
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

  dataSource: MatTableDataSource<any>;
  categories = [];
  subcategories = [];
  public products: any[] = [];
  public listProducts: any = [
    {
      "product": null,
      "cant": null,
    }
  ]
  public areas: any = [

  ]
  public entryType: any =
    [
      {
        id: 1,
        name: "Mercadería"
      }
    ]
  public operations: any =
    [
      {
        id: 1,
        name: "GRAVADA"
      }
    ]
  public kardexes: any =
  [

  ]
  public kardex_motif: any =
  [

  ]
  public currencies: any =
    [
    ]
  public shoppingBooks: any = [
    {
      id: 1,
      name: "COMPRAS SUNAT"
    }
  ]
  providers: any[] = [];
  minDate = new Date();
  documentsType: any = [
    {
      id: 1,
      name: "Factura"
    },
    {
      id: 2,
      name: "Guía de Remisión"
    },
    {
      id: 3,
      name: "Ingreso por Ajuste"
    },
    {
      id: 4,
      name: "Liquidación de Cobranza"
    },
  ]

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    public voucherTypeService: VoucherTypeService,
    public coinService: CoinService,
    public providersService: ProvidersService,
    public areaService: AreaService,
    public IncomeTypeService :IncomeTypeService,
    public KardexService :KardexService,
    public categoryService: CategoryService,
    public subCategoryService: SubCategoryService,    
    private productsService: ProductsService,
    public headquarterService : HeadquarterService,
    public purchaseService : PurchaseService,
    private router: Router,
    public route: ActivatedRoute,
  ) {
    this.form = fb.group({
      serial_number : [null, [Validators.required]],
      correlative : [null, [Validators.required]],
      broadcast_date : [new Date(), [Validators.required]],
      admission_date : [new Date(), [Validators.required]],
      payment_schedule : [new Date(), [Validators.required]],
      exchange_rate : [null, [Validators.required]],
      total : [null, []],
      isc : [null, []],
      igv : [null, []],
      state : [true, [Validators.required]],
      voucher_type_id : [null, [Validators.required]],
      warehouse_id : [null, [Validators.required]],
      area_id : [1, [Validators.required]],
      income_type_id : [null, [Validators.required]],
      coin_id : [null, [Validators.required]],
      provider_id : [null, [Validators.required]],
    });
  }

  setDateSchedule(creditDay){
    if(!isNaN(creditDay)){
      let date = new Date();
      date = moment().add(creditDay, 'days').toDate();
      this.form.patchValue({
        payment_schedule: date
      })
    }else{
      this.form.patchValue({
        payment_schedule: new Date()
      })
    }
  }

  addProduct() {
    this.listProducts.push({
      "product": null,
      "cant": null,
    });
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

  getCoins() {
    this.coinService.getCoins().subscribe(res => {
      if (res.data) this.currencies = [].concat(res.data.coins);
    }, err => {
      console.log(err);
    });
  }

  compareObjects(o1: any, o2: any) {
    if (o1 === o2) return true;
    else return false
  }
  

  getProviders() {
    this.providersService.getProviders().subscribe(res => {
      if (res.data) this.providers = [].concat(res.data.providers);
    }, err => {
      console.log(err);
    });
  }


  articlesData: any = [];

  displayedColumns: string[] = ["code", "article", "igv", "isc", "qty", "price", "total_price",];
  public _onDestroy = new Subject<void>();

  getCombo(id) {
    this.orderID = id;
    this.purchaseService.getPurshase(id).subscribe(res => {
      if(res.data){
        if (res.data.purchase.length === 0) {
          this.toastr.error("No se encuentra el registro indicado")
        } else {
          this.form.patchValue({
            serial_number : res.data.purchase[0].serial_number,
            correlative : res.data.purchase[0].correlative,
            broadcast_date : res.data.purchase[0].broadcast_date,
            admission_date : res.data.purchase[0].admission_date,
            payment_schedule : res.data.purchase[0].payment_schedule,
            exchange_rate : res.data.purchase[0].exchange_rate,
            total : res.data.purchase[0].total,
            isc : res.data.purchase[0].isc,
            igv : res.data.purchase[0].igv,
            state : res.data.purchase[0].state,
            voucher_type_id : res.data.purchase[0].voucher_type ? res.data.purchase[0].voucher_type.id : null,
            warehouse_id : res.data.purchase[0].warehoouse ? res.data.purchase[0].warehoouse.id : null,
            area_id : res.data.purchase[0].area ? res.data.purchase[0].area.id : null,
            income_type_id : res.data.purchase[0].income_type ? res.data.purchase[0].income_type.id : null,
            coin_id : res.data.purchase[0].coin ? res.data.purchase[0].coin.id : null,
            provider_id : res.data.purchase[0].provider ? res.data.purchase[0].provider.id : null,
          });
          
        }
      }
    }, err => {
      console.log(err);
      this.toastr.clear();
      this.toastr.error('Ha ocurrido un error');
    });
  }


  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    if (this.orderID) {
      this.getCombo(this.orderID);
    } else if (this.route.snapshot.params.id) {
      this.getCombo(this.route.snapshot.params.id);
    }
    this.getDocumentVoucherType();
    this.getCoins();
    this.getProviders();
    this.getHeadquarters();
    this.getIncomeTypes();
    this.getKardexes();
    this.getKardexMotifs();
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
      this.filteredSubCategories.next(this.subcategories.slice());
      this.subCategoryFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterSubCategories();
        });
      this.getCategories();
      this.getProducts();
  }

  submit(data){
    if(this.dataSource.data.length===0) return this.toastr.warning("Falta ingresar uno o más productos")
    data.admission_date = this.formatDate(data.admission_date);
    data.broadcast_date = this.formatDate(data.broadcast_date);
    data.payment_schedule = this.formatDate(data.payment_schedule);
    data.quantity_detail = this.dataSource.data.map(x => x.qty);
    data.price_detail = this.dataSource.data.map(x => x.price*x.qty);
    data.igv_detail = this.dataSource.data.map(x => (x.price/1.18)*x.qty);
    data.isc_detail = this.dataSource.data.map(x => 0);
    data.product_id_detail = this.dataSource.data.map(x => x.id);
    data.total = data.price_detail.reduce((a, b) => a + b, 0);
    data.igv = data.igv_detail.reduce((a, b) => a + b, 0);
    data.isc = data.isc_detail.reduce((a, b) => a + b, 0);
    data.total = data.price_detail.reduce((a, b) => a + b, 0);
    this.save(data);
  }

  save(data: any) {
    this.purchaseService.createPurchase(data).subscribe(xresponse => {
      this.toastr.success("Operación realizada satisfactoriamente");
      this.toastr.success('Operación Exitosa');
      this.router.navigateByUrl('/accounting/motives');
    },
    error =>{
      console.log(error);
    }
    )
  }

  edit(data: any) {

  }

  selectedRowIndex: number = -1;

  highlight(index) {
    this.selectedRowIndex = index;
  }


  changeValue(evt){
    if(this.dataSource.data.find(x=> x.id === evt.value.id)){
      this.toastr.warning("Ya ha agregado el producto seleccionado");
    }else{
      this.dataSource= new MatTableDataSource([{
        db_id:0,
        name: evt.value.name,
        price: evt.value.price,
        qty : 1,
        code : evt.value.code,
      }].concat(this.dataSource.data));
    }
    this.productCtrl.setValue(null);
  }

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
    if (!this.subcategories) {
      return;
    }
    let search = this.subCategoryFilterCtrl.value;
    if (!search) {
      this.filteredSubCategories.next(this.subcategories.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredSubCategories.next(
      this.subcategories.filter(product => product.name.toLowerCase().indexOf(search) > -1)
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

  getDocumentVoucherType() {
    this.voucherTypeService.getAllVoucherTypes().subscribe(res => {
      if (res.data) this.documentsType = res.data.voucher_type;
    }, err => {
      console.log(err);
    });
  }

  removeArticle() {
    if (this.selectedRowIndex !== -1) {
      this.dataSource.data.splice(this.selectedRowIndex, 1);
      this.dataSource.data = [].concat(this.dataSource.data);
      this.toastr.success("Operación Realizada Satisfactoriamente");
      this.selectedRowIndex = -1;
    } else {
      this.toastr.warning("Debe seleccionar un artículo");
    }
  }

  cancelSelect() {
    this.selectedRowIndex = -1;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogFormOrderTypeFromOrder, {
      width: '50vw'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  modifyRow() {
    if (this.selectedRowIndex !== -1) {
      this.openDialogProduct(this.dataSource.data[this.selectedRowIndex]);
    } else {
      this.toastr.warning("Debe seleccionar un artículo");
    }
  }

  openDialogProduct(data): void {
    const dialogRef = this.dialog.open(DialogDocument, {
      maxWidth: '100vw',
      minWidth: '60vw',
      data: data === null ? {} : data
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && !data) {
        this.dataSource.data.push(result);
      }
      if (data && result) {
        this.dataSource.data[this.selectedRowIndex] = result;
        this.toastr.success("Operación Realizada Satisfactoriamente");
        this.selectedRowIndex = -1;
      }
      this.dataSource.data = [].concat(this.dataSource.data);
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(res => {
      if(res.data) this.categories = [].concat(res.data.categories);
      this.filterCategories();
    }, err => {
      console.log(err);
      this.toastr.clear();
      this.toastr.error('Ha ocurrido un error');
    });
  }

  getSubCategories() {
    this.subCategoryService.getSubCategories().subscribe(res => {
      if(res.data) this.subcategories = [].concat(res.data.sub_category);
      this.filterSubCategories();
    }, err => {
      console.log(err);
      this.toastr.clear();
      this.toastr.error('Ha ocurrido un error');
    });
  }

  getSubCategoriesByCat(id) {
    this.subCategoryService.getSubCategoryByCategory(id).subscribe(res => {
      if(res.data) this.subcategories = [].concat(res.data.sub_category_with_category);
      this.filterSubCategories();
    });
  }


  getProducts() {
    this.productsService.getProducts().subscribe(res => {
      if(res.data) this.products = [].concat(res.data.products);
      this.filterProducts();
    }, err => {
      console.log(err);
      this.toastr.clear();
      this.toastr.error('Ha ocurrido un error');
    });
  }

  getProductsBySubcategory(id) {
    this.productsService.getProductsBySubcategory(id).subscribe(res => {
      if(res.data) {
        this.products = [].concat(res.data.product_with_subcategory);
        this.filterProducts();
      }
    }, err => {
      console.log(err);
    });
  }

  getAreas() {
    this.areaService.getAreas().subscribe(res => {
      if(res.data) this.areas = res.data.areas
    }, err => {
      console.log(err);
    });
  }

  getIncomeTypes() {
    this.IncomeTypeService.getIncomeTypes().subscribe(res => {
      if(res.data) this.entryType = res.data.income_type
    }, err => {
      console.log(err);
    });
  }

  getKardexes() {
    this.KardexService.getKardexes().subscribe(res => {
     // if(res.data) this.entryType = res.data.income_type
    }, err => {
      console.log(err);
    });
  }

  getKardexMotifs() {
    this.KardexService.getKardexMotifs().subscribe(res => {
      //if(res.data) this.entryType = res.data.income_type
    }, err => {
      console.log(err);
    });
  }

  getHeadquarters() {
    this.headquarterService.getHeadquarters().subscribe(res => {
      if(res.data) this.areas = [].concat(res.data.headquarters);
    }, err => {
      console.log(err);
    });
  }

  verifyEntryValue(evt,index){
    if (isNaN(evt.data)){ 
      evt.target.value = null;
      this.dataSource["data"][index]["qty"] = null;
    }
  }



}
@Component({
  selector: 'dialog-order-type-form',
  templateUrl: 'dialog-order-type-form.html',
})
export class DialogFormOrderTypeFromOrder {

  constructor(
    public dialogRef: MatDialogRef<DialogFormOrderTypeFromOrder>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-document',
  templateUrl: 'dialog-document.html',
})
export class DialogDocument implements OnInit {
  public form: FormGroup;
  public products: any[] = [
    {
      "name": "Papas Fritas", "code": "0012522", "price": 20, status: true,
    },
    {
      "name": "Gaseosa", "code": "0012518", "price": 15, status: true,
    },
    {
      "name": "Lasagna", "code": "0012518", "price": 25, status: true,
    },
  ];

  public categories: any[] = [
    {
      "name": "Categoria 1",
    },
    {
      "name": "Categoria 2",
    },
    {
      "name": "Categoria 3",
    },
  ];

  public subCategories: any[] = [
    {
      "name": "Sub-Categoria 1",
    },
    {
      "name": "Sub-Categoria 2",
    },
    {
      "name": "Sub-Categoria 3",
    },
  ];

  kardexes = [
    "KILO", "PAQUETE"
  ]

  public productCtrl: FormControl = new FormControl();
  public productFilterCtrl: FormControl = new FormControl();
  public filteredProducts: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  public _onDestroy = new Subject<void>();

  public categoryCtrl: FormControl = new FormControl();
  public categoryFilterCtrl: FormControl = new FormControl();
  public filteredCategories: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect1', { static: true }) singleSelect1: MatSelect;

  public subCategoryCtrl: FormControl = new FormControl();
  public subCategoryFilterCtrl: FormControl = new FormControl();
  public filteredSubCategories: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect2', { static: true }) singleSelect2: MatSelect;



  constructor(
    public dialogRef: MatDialogRef<DialogDocument>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.form = fb.group({
      "code": [data.code || null, [Validators.required]],
      "article": [data.article || null, [Validators.required]],
      "igv": [data.igv || 0, [Validators.required]],
      "isc": [data.isc || 0, [Validators.required]],
      "value": [data.value || 0, [Validators.required]],
      "kardex": [data.kardex || null, [Validators.required]],
      "qty": [data.qty || 0, [Validators.required]],
      "price": [data.price || 0, [Validators.required]],
      "total_price": [data.total_price || 0, [Validators.required]],
    });
    // this.form.get('code').disable();
    // this.form.get('article').disable();
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
  }

  changeValueCategory(event) { }
  changeValueSubCategory(event) { }
  changeValue(event) {
    if (event.value) {
      this.form.patchValue({
        code: event.value.code,
        article: event.value.name,
        price: event.value.price,
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
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

  save(data) {
    console.log(data);
    this.dialogRef.close(data);
  }
}