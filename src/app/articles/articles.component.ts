import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { ScreenMobileChangeService } from '../services/screen/screen-mobile-change.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription, ReplaySubject, Subject } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { SubCategoryService } from '../services/sub-category.service';
import { HeadquarterService } from '../services/headquarter.service';
import { AreaService } from '../services/area.service';
import { PrintersService } from '../services/printers.service';
import { ProductTypeService } from '../services/product-type.service';
import { ProvidersService } from '../services/providers.service';
import { ProductsService } from '../services/products.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { CoinService } from '../services/coin.service';
import { TaxService } from '../services/tax.service';
import { S3UploaderService } from 'ngx-s3-uploader';
import { ModifierService } from '../services/modifier.service';
import { ImageUploaderOptions, FileQueueObject } from 'ngx-image-uploader';
import { MeasurementUnitService } from '../services/measurement-unit.service';
import { WarehouseService } from '../services/warehouse.service';
import { takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material';

export interface Article {
  article: string;
  category: string;
  price: number;
  cost: number;
  margin: string;
  in_stock: number;
  status: boolean;
}

export interface ArticlesStock {
  component: string;
  qty: number;
  cost: number;
}

export interface ArticlesShops {
  available: boolean;
  shop: string;
  price: number;
}

const ELEMENT_DATA: Article[] = [
  { article: 'Coca Cola', category: 'Bebidas', price: 12.26, cost: 12.00, margin: '12%', in_stock: 2100, status: true }
];

const ELEMENT_DATA1: ArticlesStock[] = [];

const ELEMENT_DATA2: ArticlesShops[] = [
  { available: true, shop: 'Local 1', price: 12.26 }
];


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {

  shops = ['Local 1', 'Local 2', 'Local 3'];
  categories: any;
  alerts = ['Inventario Bajo', 'Sin Inventario'];
  categorySelect: any;
  subcategorySelect: any;
  stockAlertSelect: any;
  shop1Select: any;
  stores: any;
  subcategories: any;
  displayedColumns: string[] = ['article', 'category', 'price', 'cost', 'margin', 'in_stock', 'options'];
  dataSource = new MatTableDataSource<any>([]);
  public isMobile: boolean;
  subscription: Subscription;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    private productsService: ProductsService,
    private coolDialogs: NgxCoolDialogsService,
    public printService: PrintersService,
    public categoryService: CategoryService,
    public subCategoryService: SubCategoryService,
    public headquarterService: HeadquarterService,
  ) {
    this.isMobile = this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getHeadquarters() {
    this.headquarterService.getHeadquarters().subscribe(res => {
      //      this.modaldataSourceShops.data = [].concat(res.data.headquarters);
      if (res.data) this.stores = [].concat(res.data.headquarters);
    }, err => {
      console.log(err);
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(res => {
      if (res.data) this.categories = [].concat(res.data.categories);
    }, err => {
      console.log(err);
    });
  }

  getSubCategoriesByCat(id) {
    this.subCategoryService.getSubCategoryByCategory(id).subscribe(res => {
      if (res.data) this.subcategories = [].concat(res.data.sub_category_with_category);
    });
  }

  openDialog(id, index): void {
    const dialogRef = this.dialog.open(NewArticleDialog, {
      maxWidth: '100vw',
      minWidth: '85vw',
      data: id ? { id } : {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (id) {
          this.dataSource.data[index] = result;
        } else {
          this.dataSource.data.push(result);
        }
        this.dataSource.data = [].concat(this.dataSource.data);
      }
    });
  }

  changeVisibility(id, idx, status) {
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
          this.productsService.updateStateProduct({ state: !this.dataSource.data[idx]["state"] }, this.dataSource.data[idx].id).subscribe(res => {
            this.toastr.success("Operación realizada satisfactoriamente");
            this.dataSource.data[idx]["state"] = !this.dataSource.data[idx]["state"];
            this.dataSource.data = [].concat(this.dataSource.data);
          }, err => {
            console.log(err);
          });
        }
      });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getProducts();
    this.getCategories();
    this.getHeadquarters();
  }

  getProducts() {
    this.productsService.getProducts().subscribe(res => {
      if (res.data) this.dataSource = new MatTableDataSource(res.data.products);
      this.dataSource.paginator = this.paginator;
    }, err => {
      console.log(err);
    });
  }

  getProductsBySubcategory(id) {
    this.productsService.getProductsBySubcategory(id).subscribe(res => {
      if (res.data) {
        this.dataSource = new MatTableDataSource(res.data.product_with_subcategory);
        this.dataSource.paginator = this.paginator;
      }
    }, err => {
      console.log(err);
    });
  }

  deleteProduct(id, index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado', {
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
      .subscribe(res => {
        if (res) {
          this.productsService.deleteProduct(id).subscribe(res => {
            this.toastr.success("Operación realizada satisfactoriamente");
            this.dataSource.data.splice(index, 1);
            this.dataSource.data = [].concat(this.dataSource.data);
          }, err => {
            console.log(err);
          });
        }
      });
  }

}
@Component({
  selector: 'app-new-article-dialog',
  templateUrl: 'new-article-dialog.html',
})
export class NewArticleDialog implements OnInit {

  addArticleFormGroup: FormGroup;
  articles = [];
  categories = [];
  subcategories = [];
  areas = [];
  printers = [];
  units: any;
  product_types = [];
  providers: any[] = [];
  currencies: any[] = [];
  taxes: any[] = [];
  stores: any[] = [];
  warehouses: any[] = [];
  public headquarters: any[] = [];
  modifiers = [];
  compositeProducts = [];
  compositeProductsQty = [];
  mUnits: any[] = [];
  displayedColumns: string[] = ['component', 'qty', 'cost', 'price', 'total', 'options'];
  displayedColumnsShops: string[] = ['available', 'shop', 'price'];
  modaldataSource = new MatTableDataSource<any>([]);
  modaldataSourceShops = new MatTableDataSource<any>([]);
  isSaved = false;
  shops = ['Local 1', 'Local 2', 'Local 3'];
  selectAllTaxes: boolean = false;
  modifiersSelectedEdit: any[] = [];
  taxesSelectedEdit: any[] = [];
  imgData: any = null;
  options: ImageUploaderOptions = {
    thumbnailHeight: 150,
    thumbnailWidth: 150,
    autoUpload: true,
    uploadUrl: 'https://fancy-image-uploader-demo.azurewebsites.net/api/demo/upload',
    allowedImageTypes: ['image/png', 'image/jpeg'],
    maxImageSize: 3
  };

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  public productFilterCtrl: FormControl = new FormControl();
  public filteredProducts: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  public _onDestroy = new Subject<void>();


  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewArticleDialog>,
    public categoryService: CategoryService,
    public subCategoryService: SubCategoryService,
    public headquarterService: HeadquarterService,
    public printService: PrintersService,
    private areaService: AreaService,
    private productTypeService: ProductTypeService,
    private productsService: ProductsService,
    public providersService: ProvidersService,
    public measureService: MeasurementUnitService,
    public coinService: CoinService,
    public taxService: TaxService,
    public warehouseService: WarehouseService,
    private toastr: ToastrService,
    public measureUnitsService: MeasurementUnitService,
    public modifierService: ModifierService,
    private s3UploaderService: S3UploaderService,
    private coolDialogs: NgxCoolDialogsService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modaldataSource.paginator = this.paginator;
    this.addArticleFormGroup = this._formBuilder.group({
      type_sale: [''],
      area_id: [''],
      reference: [''],
      article: [''],
      articleFilter: [''],
      compound_article: [false],
      use_stock: [true],
      default_sales_cost: [''],
      iva: [''],
      tax: [null],
      name: [null, [Validators.required]],
      code: [null],
      observation: [null],
      category_id: [null],
      sub_category_id: [null],
      warehouse_id: [null],
      measurement_unit_id: [null],
      image: [null],
      modifier: [null],
      quantity_composite_product: [null],
      product_id_composite_product: [null],
      price: [0],
      igv : [0],
      net_price: [null],
      cost: [null, [Validators.required]],
      production_item: [false],
      barcode: [null, []],
      sale_item: [false],
      portioning_item: [false],
      printer_id: [null],
      sold_by: [null],
      minimum_stock: [0],
      maximum_stock: [0],
      quantity: [1],
      type_product_id: [null],
      colour: [null],
      tax_isc: [null],
      coin_id: [null, Validators.required],
      state: [true, [Validators.required]],
      headquarter: [null],
      quantity_measurement: [null],
      measurement_unit_id_stock: [null, Validators.required]
    });
  }

  onUpload(files: FileQueueObject) {
    let file = files.file;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.addArticleFormGroup.patchValue({
        image: reader.result
      });
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  setPrice(value) {
    this.addArticleFormGroup.patchValue({
      price: parseFloat((value + (value * 0.18)).toFixed(2)),
      igv: parseFloat((value * 0.18).toString()).toFixed(2)
    })
  }

  setNetPrice(value) {
    this.addArticleFormGroup.patchValue({
      net_price: parseFloat((value / 1.18).toFixed(2)),
    })
    this.addArticleFormGroup.patchValue({
      igv: parseFloat((this.addArticleFormGroup.value.net_price * 0.18).toString()).toFixed(2)
    })

  }

  getMeasureUnits() {
    this.measureUnitsService.getMeasurementUnits().subscribe(response => {
      if (response.data) this.mUnits = response.data.measurement_units;
      if (this.mUnits.length > 0 && !this.data.id) {
        let data = this.mUnits.find(x => x.sunat_code === "07");
        if (data) {
          this.addArticleFormGroup.patchValue({
            measurement_unit_id: data.id,
            measurement_unit_id_stock: data.id,
          })
        }
      }
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

  ngOnInit() {
    this.getCategories();
    this.getHeadquarters();
    this.getAreas();
    this.getProductTypes();
    this.getProviders();
    this.getCoins();
    this.getWarehouses();
    this.getTaxes();
    this.getModifiers();
    this.getMeasureUnits();
    this.getProducts();
    if (this.data.id) {
      this.getProduct(this.data.id);
    }
    this.filteredProducts.next(this.articles.slice());
    this.productFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterProducts();
      });
  }

  public filterProducts() {
    if (!this.articles) {
      return;
    }
    let search = this.productFilterCtrl.value;
    if (!search) {
      this.filteredProducts.next(this.articles.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredProducts.next(
      this.articles.filter(product => product.name.toLowerCase().indexOf(search) > -1)
    );
  }

  upload(file) {
    this.s3UploaderService.upload(file, 'ACL_TO_APPLY', 'BUCKET_NAME<optional>')
      .subscribe(
        (data) => {
          //...
        },
        (error) => {
          //...
        });
  }

  submit(data: any, formDirective: FormGroupDirective) {
    //data.modifier = this.modifiers.filter(x=> x.checked === true).map(x => x.id);
    //data.tax = this.taxes.filter(x=> x.checked === true).map(x => x.id);
    data.product_tax_id = [];
    data.product_modifier_id = [];
    if(data.tax_isc!==null && Array.isArray(data.tax)) data.tax.push(data.tax_isc);
    if(data.tax && Array.isArray(data.tax)) data.tax.map(tax => {
      let dataFind = this.taxes.find(x => x.id === tax);
      if (dataFind) data.product_tax_id.push(dataFind.db_id);
    })
    if(data.modifier && Array.isArray(data.modifier)) data.modifier.map(modifier => {
      let dataFind = this.modifiers.find(x => x.id === modifier);
      if (dataFind) data.product_modifier_id.push(dataFind.db_id);
    })
    // data.product_tax_id  =  this.taxes.filter(x=> x.id === true).map(x => x.db_id);
    // data.product_modifier_id  = this.modifiers.filter(x=> x.checked === true).map(x => x.db_id);
    data.product_id_composite_product = this.modaldataSource.data.map(x => x.id);
    data.quantity_composite_product = this.modaldataSource.data.map(x => x.qty);
    if (this.data.id) this.edit(data);
    else this.createProduct(data, formDirective);
  }

  createProduct(data: any, formDirective: FormGroupDirective) {
    this.productsService.createProduct(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if (this.dialogRef) {
        this.dialogRef.close(res.data.createProduct);
      }
    }, err => {
      console.log(err);
    });
  }

  getMeasurementUnits() {
    this.measureService.getMeasurementUnits().subscribe(response => {
      this.units = response;
    })
  }

  getProduct(id) {
    this.productsService.getProduct(id).subscribe(res => {
      if (res.data) {
        if (res.data.products.length === 0) {
          this.toastr.error("No se encuentra el registro indicado")
        } else {
          this.imgData = res.data.products[0].image;
          this.addArticleFormGroup.patchValue({
            name: res.data.products[0].name,
            code: res.data.products[0].code,
            observation: res.data.products[0].observation,
            sub_category_id: res.data.products[0].sub_category ? res.data.products[0].sub_category.id : null,
            colour: res.data.products[0].colour,
            price: res.data.products[0].price,
            cost: res.data.products[0].cost,
            net_price: res.data.products[0].net_price,
            //image: res.data.products[0].image,
            production_item: res.data.products[0].production_item ? true : false,
            barcode: res.data.products[0].barcode,
            sale_item: res.data.products[0].sale_item,
            portioning_item: res.data.products[0].portioning_item,
            printer_id: res.data.products[0].printer ? res.data.products[0].printer.id : null,
            quantity_measurement: res.data.products[0].quantity_measurement,
            warehouse_id: (res.data.products[0].product_storage) ? (res.data.products[0].product_storage.warehouse ? res.data.products[0].product_storage.warehouse.id : this.addArticleFormGroup.value.warehouse_id) : this.addArticleFormGroup.value.warehouse_id,
            measurement_unit_id_stock: (res.data.products[0].product_storage) ? (res.data.products[0].product_storage.measurement_unit ? res.data.products[0].product_storage.measurement_unit.id : this.addArticleFormGroup.value.measurement_unit_id_stock) : this.addArticleFormGroup.value.measurement_unit_id_stock,
            quantity: (res.data.products[0].product_storage) ? res.data.products[0].product_storage.quantity : this.addArticleFormGroup.value.quantity,
            minimum_stock: (res.data.products[0].product_storage) ? res.data.products[0].product_storage.minimum_stock : this.addArticleFormGroup.value.minimum_stock,
            maximum_stock: (res.data.products[0].product_storage) ? res.data.products[0].product_storage.maximum_stock : this.addArticleFormGroup.value.maximum_stock,
            measurement_unit_id: res.data.products[0].measurement_unit ? res.data.products[0].measurement_unit.id : this.addArticleFormGroup.value.measurement_unit_id,
            //warehouse_id : res.data.products[0].warehouse ? res.data.products[0].warehouse.id : null,
            //quantity_measurement: res.data.products[0].quantity_measurement,
            coin_id: res.data.products[0].coin ? res.data.products[0].coin.id : null,
            type_product_id: res.data.products[0].type_product ? res.data.products[0].type_product.id : null,
            state: res.data.products[0].state ? true : false,
            area_id: res.data.products[0].printer ? (res.data.products[0].printer.area ? res.data.products[0].printer.area.id : null) : null,
            category_id: res.data.products[0].sub_category ? (res.data.products[0].sub_category.category ? res.data.products[0].sub_category.category.id : null) : null,
            modifier: res.data.products[0].product_modifier.map(x => x.modifier.id),
            headquarter: res.data.products[0].product_headquarter.map(x => x.headquarter.id),
          });
          let taxIDIGV = []
          let taxIDISC = null;
          res.data.products[0].product_tax.map(x => {
            if(x.tax.type === 0) taxIDIGV.push(x.tax.id);
            else if(x.tax.type === 1) taxIDISC = x.tax.id; 
          })
          this.addArticleFormGroup.patchValue(
            {
              tax: taxIDIGV,
              tax_isc: taxIDISC,
            }
          );
          if (res.data.products[0].composite_product.length > 0) {
            this.addArticleFormGroup.patchValue({
              compound_article: true
            });
            this.modaldataSource.data = [].concat(
              res.data.products[0].composite_product.map(x => {
                return {
                  id: x.product.id, db_id: x.id, component: x.product.name, qty: x.quantity, cost: x.product.cost, price: x.product.price
                }
              })
            )
          }
          this.setNetPrice(parseFloat(res.data.products[0].price));
          res.data.products[0].sub_category ? (res.data.products[0].sub_category.category ? this.getSubCategoriesByCat(res.data.products[0].sub_category.category.id) : null) : null;
          res.data.products[0].printer ? (res.data.products[0].printer.area ? this.getPrintersByArea(res.data.products[0].printer.area.id) : null) : null;
          this.modifiersSelectedEdit = (res.data.products[0].product_modifier) ? res.data.products[0].product_modifier : [];
          this.taxesSelectedEdit = (res.data.products[0].product_tax) ? res.data.products[0].product_tax : [];
          this.setModifiersState();
          this.setTaxessState();
        }
      }
    }, err => {
      console.log(err);
    });

  }
  edit(data: any) {
    this.productsService.updateProduct(this.data.id, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if (this.dialogRef) {
        this.dialogRef.close(res.data.updateProduct);
      }
    }, err => {
      console.log(err);
    });
  }

  getProviders() {
    this.providersService.getProviders().subscribe(res => {
      if (res.data) this.providers = [].concat(res.data.providers);
    }, err => {
      console.log(err);
    });
  }

  getCoins() {
    this.coinService.getCoins().subscribe(res => {
      if (res.data) this.currencies = [].concat(res.data.coins);
    }, err => {
      console.log(err);
    });
  }

  getPrinters() {
    this.printService.getPrinters().subscribe(res => {
      if (res.data) this.printers = [].concat(res.data.printers);
    }, err => {
      console.log(err);
    });
  }

  getPrintersByArea(id) {
    this.printService.getPrintersByArea(id).subscribe(res => {
      if (res.data) this.printers = [].concat(res.data.printer_with_area);
    }, err => {
      console.log(err);
    });
  }

  getProductTypes() {
    this.productTypeService.getProductTypes().subscribe(res => {
      if (res.data) this.product_types = [].concat(res.data.type_products);
    }, err => {
      console.log(err);
    });
  }

  getModifiers() {
    this.modifierService.getModifiers().subscribe(res => {
      if (res.data) this.modifiers = [].concat(res.data.modifier).map(x => {
        x.checked = false;
        x.db_id = 0;
        return x;
      });
      this.setModifiersState();
    }, err => {
      console.log(err);
    });
  }

  addArticle(value: any, idx) {
    const data = this.modaldataSource.data;
    let post = data.findIndex(x => x.id === value.id);
    if (post !== -1) {
      data["qty"] += 1;
    }
    else data.push({ id: value.id, db_id: 0, component: value.name, qty: 1, cost: value.cost, price: value.price });
    this.modaldataSource.data = data;
    // if(this.compositeProducts.indexOf(value) === -1) {
    //   this.compositeProducts.push(value);
    // }
    // this.addArticleFormGroup.patchValue({
    //   product_id_composite_product: this.compositeProducts
    // });
  }

  addProductsQty(qty: any, idx, cost) {
    if (this.compositeProductsQty[idx]) {
      this.compositeProductsQty.splice(idx, 1, qty.target.value);
    } else {
      this.compositeProductsQty.push(qty.target.value);
    }
    this.addArticleFormGroup.patchValue({
      quantity_composite_product: this.compositeProductsQty
    });
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

          const data = this.modaldataSource.data;
          if (data[idx].db_id) {
            this.productsService.deleteCompositeProduct(data[idx].db_id).subscribe(res => {
              this.toastr.success("Operación realizada satisfactoriamente");
              data.splice(idx, 1);
              this.modaldataSource.data = data;
            }, err => {
              console.log(err);
            });
          } else {
            data.splice(idx, 1);
            this.modaldataSource.data = data;
          }

        }
      });

  }

  compareObjects(o1: any, o2: any) {
    if (o1 === o2) return true;
    else return false
  }

  getProducts() {
    this.productsService.getProducts().subscribe(res => {
      if (res.data) this.articles = res.data.products;
      this.filterProducts();
    }, err => {
      console.log(err);
    });
  }

  getHeadquarters() {
    this.headquarterService.getHeadquarters().subscribe(res => {
      if (res.data) this.stores = [].concat(res.data.headquarters);
    }, err => {
      console.log(err);
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(res => {
      if (res.data) this.categories = [].concat(res.data.categories);
    }, err => {
      console.log(err);
    });
  }

  getSubCategoriesByCat(id) {
    this.subCategoryService.getSubCategoryByCategory(id).subscribe(res => {
      if (res.data) this.subcategories = [].concat(res.data.sub_category_with_category);
    });
  }

  getSubCategories() {
    this.subCategoryService.getSubCategories().subscribe(res => {
      if (res.data) this.subcategories = [].concat(res.data.sub_category);
    }, err => {
      console.log(err);
    });
  }

  getAreas() {
    this.areaService.getAreas().subscribe(res => {
      if (res.data) this.areas = [].concat(res.data.areas);
    }, err => {
      console.log(err);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  verifyIGV() {
    let data = this.taxes.find(x => x.description.toLowerCase() === "igv");
    if (Array.isArray(this.addArticleFormGroup.value.tax)) {
      if (data && this.addArticleFormGroup.value.tax.indexOf(data.id) === -1) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  }

  setIGV() {
    let data = this.taxes.find(x => x.description.toLowerCase() === "igv");
    if (Array.isArray(this.addArticleFormGroup.value.tax)) {
      let idx = this.addArticleFormGroup.value.tax.indexOf(data.id);
      if (idx === -1) {
        this.addArticleFormGroup.patchValue({
          tax: [data.id]
        })
      }
    }
  }

  getTaxes() {
    this.taxService.getTaxes().subscribe(res => {
      if (res.data) this.taxes = [].concat(res.data.taxes).map(x => {
        x.checked = false;
        x.db_id = 0;
        return x;
      });
      if (this.taxes.length > 0 && !this.data.id) {
        let data = this.taxes.find(x => x.description.toLowerCase() === "igv");
        if (data) {
          this.addArticleFormGroup.patchValue({
            tax: [data.id]
          })
        }
      }
      this.setTaxessState();
    }, err => {
      console.log(err);
    });
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  changeModifier(status, index) {
    if (!status) {
      this.coolDialogs.confirm('Se deshabilitará el modificador indicado', {
        theme: 'default',
        okButtonText: 'Ok',
        cancelButtonText: 'Cancelar',
        color: 'darkblue',
        title: '¿Desea realizar esta acción?'
      })
        .subscribe(res => {
          if (res) {
            if (this.modifiers[index]["db_id"]) {
              this.productsService.deleteProductModifier(this.modifiers[index]["db_id"]).subscribe(res => {
                this.toastr.success("Operación realizada satisfactoriamente");
              }, err => {
                console.log(err);
              });
            }
          } else {
            this.modifiers[index]["checked"] = true;
          }
        });
    }
  }

  changeTax(status, index) {
    if (!status) {
      this.coolDialogs.confirm('Se deshabilitará el impuesto indicado', {
        theme: 'default',
        okButtonText: 'Ok',
        cancelButtonText: 'Cancelar',
        color: 'darkblue',
        title: '¿Desea realizar esta acción?'
      })
        .subscribe(res => {
          if (res) {
            if (this.taxes[index]["db_id"]) {
              this.productsService.deleteProductTax(this.taxes[index]["db_id"]).subscribe(res => {
                if (res.data) this.toastr.success("Operación realizada satisfactoriamente");
              }, err => {
                console.log(err);
              });
            }
          } else {
            this.taxes[index]["checked"] = true;
          }
        });
    }
  }

  setModifiersState() {
    if (this.modifiers.length > 0 && this.modifiersSelectedEdit.length > 0) {
      this.modifiersSelectedEdit.forEach((x, index: number) => {
        let pos = this.modifiers.findIndex(m => m.id === x.modifier.id);
        if (pos !== -1) {
          this.modifiers[pos]["checked"] = true;
          this.modifiers[pos]["db_id"] = x.id;
        }
      })
    }
  }

  setTaxessState() {
    if (this.taxes.length > 0 && this.taxesSelectedEdit.length > 0) {
      this.taxesSelectedEdit.forEach((x, index: number) => {
        let pos = this.taxes.findIndex(m => m.id === x.tax.id);
        if (pos !== -1) {
          this.taxes[pos]["checked"] = true;
          this.taxes[pos]["db_id"] = x.id;
        }
      })
    }
  }


}
