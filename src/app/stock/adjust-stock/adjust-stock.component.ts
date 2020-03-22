import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription, ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { AdjustReasonService } from 'src/app/services/adjust-reason.service';
import { ProductsService } from 'src/app/services/products.service';
import { CategoryService } from 'src/app/services/category.service';
import { SubCategoryService } from 'src/app/services/sub-category.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

export interface StockAdjust {
  adjust_num: string;
  date: string;
  subject: string;
  shop: string;
  qty: number;
}

export interface ArticlesStockAdjust {
  article: string;
  in_stock: number;
  add_stock: number;
  final_stock: number;
  cost: number;
}

const ELEMENT_DATA: StockAdjust[] = [
  { adjust_num: 'SA1001', date: '20/05/2019', subject: "Recibir Articulos", shop: 'Local 1', qty: 20 }
];

const ELEMENT_DATA1: ArticlesStockAdjust[] = [];

@Component({
  selector: 'app-adjust-stock',
  templateUrl: './adjust-stock.component.html',
  styleUrls: ['./adjust-stock.component.scss']
})
export class AdjustStockComponent implements OnInit,OnDestroy {

  shops = ['Local 1', 'Local 2', 'Local 3'];
  subjectSelect: any;
  shop1Select: any;
  displayedColumns: string[] = ['adjust_num', 'date', 'subject', 'shop', 'qty'];
  dataSource = new MatTableDataSource<StockAdjust>(ELEMENT_DATA);
  public isMobile : boolean ;
  subscription: Subscription;
  subjects = [];
  public warehouses : any[] = [];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getWarehouses();
    this.getAdjustmentReson();
  }

  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    public adjustReasonService : AdjustReasonService,
    public productsService : ProductsService,
    public categoryService : CategoryService,
    public subCategoryService : SubCategoryService,
    public warehouseService : WarehouseService,
  ) { 
        this.isMobile= this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => { 
      this.isMobile = isMobile;
    });
  }

  getAdjustmentReson() {
    this.adjustReasonService.getAdjustmentReson().subscribe(res => {
      if (res.data) this.subjects = res.data.adjustment_reason;
    }, err => {
      console.log(err);
    });
  }

  getWarehouses() {
    this.warehouseService.getWarehouses().subscribe(response => {
      if (response.data) this.warehouses = response.data.warehouses;
    }, err => {
      console.log(err);
    })
  }

  compareObjects(o1: any, o2: any) {
    if (o1 === o2) return true;
    else return false
  }
  


    ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  

  openDialog(): void {
    const dialogRef = this.dialog.open(NewStockAdjustDialog, {
      height: '90vh',
      maxWidth : '100vw',
      minWidth: '50vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
@Component({
  selector: 'app-new-stock-adjust-dialog',
  templateUrl: 'new-stock-adjust-dialog.html',
})
export class NewStockAdjustDialog implements OnInit {

  addStockAdjustFormGroup: FormGroup;
  articles = ['Articulo 1', 'Articulo 2', 'Articulo 3'];
  displayedColumns: string[] = ['article', 'in_stock', 'add_stock', 'cost', 'final_stock', 'options'];
  modaldataSource = new MatTableDataSource<ArticlesStockAdjust>(ELEMENT_DATA1);
  isSaved = false;
  subjects = [];
  shops = ['Local 1', 'Local 2', 'Local 3'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public products: any[] = [

  ];

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

  public warehouses : any[] = [];
  public categories: any[] = [

  ];

  public subCategories: any[] = [

  ];

  changeValueCategory(event) { }
  changeValueSubCategory(event) { }

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
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewStockAdjustDialog>,
    public adjustReasonService : AdjustReasonService,
    public productsService : ProductsService,
    public categoryService : CategoryService,
    public subCategoryService : SubCategoryService,
    public warehouseService : WarehouseService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.modaldataSource.paginator = this.paginator;
      this.addStockAdjustFormGroup = this._formBuilder.group({
        subject: ['', Validators.required],
        shop: ['', Validators.required],
        observations: [''],
        article: [''],
        articleFilter: ['']
      });
    }

    ngOnInit(){
      this.getCategories();
      this.getWarehouses();
      this.getAdjustmentReson();
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

  addArticle(value: string) {
    const data = this.modaldataSource.data;
    data.push({ article: value, in_stock: 2000, add_stock: 50, cost: 120, final_stock: 100 });
    this.modaldataSource.data = data;
  }

  deleteArticle(idx) {
    const data = this.modaldataSource.data;
    data.splice(idx, 1);
    this.modaldataSource.data = data;
  }

  addStockAdjust() {
    this.isSaved = true;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  getAdjustmentReson() {
    this.adjustReasonService.getAdjustmentReson().subscribe(res => {
      if (res.data) this.subjects = res.data.adjustment_reason;
    }, err => {
      console.log(err);
    });
  }

  getWarehouses() {
    this.warehouseService.getWarehouses().subscribe(response => {
      if (response.data) this.warehouses = response.data.warehouses;
    }, err => {
      console.log(err);
    })
  }

  getProducts() {
    this.productsService.getProducts().subscribe(res => {
      if (res.data) this.articles = res.data.products;
      this.filterProducts();
    }, err => {
      console.log(err);
    });
  }

 getCategories() {
    this.categoryService.getCategories().subscribe(res => {
      if (res.data) this.categories = [].concat(res.data.categories);
      this.filterCategories();
    }, err => {
      console.log(err);
    });
  }

  getSubCategoriesByCat(id) {
    this.subCategoryService.getSubCategoryByCategory(id).subscribe(res => {
      if (res.data) this.subCategories = [].concat(res.data.sub_category_with_category);
      this.filterSubCategories();
    });
  }
 getSubCategories() {
    this.subCategoryService.getSubCategories().subscribe(res => {
      if (res.data) this.subCategories = [].concat(res.data.sub_category);
      this.filterSubCategories();
    }, err => {
      console.log(err);
    });
  }

  getProductsBySubcategory(id) {
    this.productsService.getProductsBySubcategory(id).subscribe(res => {
      if (res.data) {
        this.products = res.data.product_with_subcategory
        this.filterProducts();
      }
    }, err => {
      console.log(err);
    });
  }

  compareObjects(o1: any, o2: any) {
    if (o1 === o2) return true;
    else return false
  }
  
}
