import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroupDirective, Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect, MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import { CategoryService } from 'src/app/services/category.service';
import { SubCategoryService } from 'src/app/services/sub-category.service';
import { HeadquarterService } from 'src/app/services/headquarter.service';
import { ProductsService } from 'src/app/services/products.service';
import { ComboService } from 'src/app/services/combo.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';

@Component({
  selector: 'app-special-sales-form',
  templateUrl: './special-sales-form.component.html',
  styleUrls: ['./special-sales-form.component.scss']
})
export class SpecialSalesFormComponent implements OnInit {

  @Input() specialSaleID: any;
  public form: FormGroup;
  items: any[] = [{ name: "archie" }, { name: "jake" }, { name: "richard" }];
  dataSource: MatTableDataSource<any>;
  dataSourceCombo : MatTableDataSource<any>;
  categories = [];
  subcategories = [];
  public headquarters: any[] = [];
  public products: any[] = [];
  public productCtrl: FormControl = new FormControl();
  public productFilterCtrl: FormControl = new FormControl();
  public filteredProducts: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  public _onDestroy = new Subject<void>();

  public combos: any[] = [
  ];
  
  public comboCtrl: FormControl = new FormControl();
  public comboFilterCtrl: FormControl = new FormControl();
  public filteredCombos: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelectCombo', { static: true }) singleSelectCombo: MatSelect;
  public articles : any[] = [];
  public combosSelected : any[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['name', 'price', 'qty','options'];

  public categoryCtrl: FormControl = new FormControl();
  public categoryFilterCtrl: FormControl = new FormControl();
  public filteredCategories: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect1', { static: true }) singleSelect1: MatSelect;

  public subCategoryCtrl: FormControl = new FormControl();
  public subCategoryFilterCtrl: FormControl = new FormControl();
  public filteredSubCategories: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect2', { static: true }) singleSelect2: MatSelect;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public categoryService: CategoryService,
    public subCategoryService: SubCategoryService,
    public headquarterService: HeadquarterService,
    private productsService: ProductsService,
    private comboService: ComboService,
    private promotionService: PromotionService,
    private coolDialogs: NgxCoolDialogsService,
    private router: Router,
    public route: ActivatedRoute,
  ) {
    this.form = fb.group({
      description: [null, [Validators.required]],
      state: [true, [Validators.required]],
      price: [0, [Validators.required]],
      cost: [0, [Validators.required]],
      headquarter_id: [null, [Validators.required]],
      promotion_mode:[0],
      discount_rate : [0,[Validators.required]],
    });
  }

  ngOnInit() {
    this.filteredCombos.next(this.combos.slice());
    this.filteredProducts.next(this.products.slice());
    this.productFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterProducts();
    });
    this.comboFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCombos();
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
        if (this.specialSaleID) {
          this.getPromotion(this.specialSaleID);
        } else if (this.route.snapshot.params.id) {
          this.getPromotion(this.route.snapshot.params.id);
        }
      this.dataSource = new MatTableDataSource([]);
      this.dataSourceCombo = new MatTableDataSource([]);
      this.getCategories();
      this.getHeadquarters();
      this.getProducts();
      //this.getSubCategories();
      this.getCombos();
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
 
  public filterCombos() {
    if (!this.combos) {
      return;
    }
    let search = this.comboFilterCtrl.value;
    if (!search) {
      this.filteredCombos.next(this.combos.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredCombos.next(
      this.combos.filter(combo => combo.name.toLowerCase().indexOf(search) > -1)
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

  submit(data: any, formDirective: FormGroupDirective) {
    data.cost = this.getTotal();
    data.combo_for_combo_promotion = this.combosSelected.map(x => x.id);
    data.product_promotion_id = this.articles.map( x => { return x.db_id});
    data.combo_promotion_id = this.combosSelected.map(x => x.db_id);
    if(this.articles.length===0){
      this.toastr.clear();
      this.toastr.warning("Debe ingresar uno o mas artículos");
    }else{
      data.product = this.articles.map( x => { return x.id});
      data.quantity = this.articles.map( x => { return x.qty});
      data.price_product = this.articles.map( x => { return x.price});
      if (this.specialSaleID) this.edit(data);
      else this.save(data, formDirective);
    }
  }

  save(data: any, formDirective: FormGroupDirective) {    
    this.promotionService.createPromotion(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.router.navigateByUrl('/combos/special-sales');
    }, err => {
      console.log(err);
    });
  }

  getPromotion(id) {
    this.specialSaleID = id;
    this.promotionService.getPromotion(id).subscribe(res => {
      if(res.data){
        if (res.data.promotion.length === 0) {
          this.toastr.error("No se encuentra el registro indicado")
        } else {
          this.form.patchValue({
            description: res.data.promotion[0].description,
            state: res.data.promotion[0].state,
            price: res.data.promotion[0].price,
            cost: res.data.promotion[0].cost,
            headquarter_id: res.data.promotion[0].headquarter ? res.data.promotion[0].headquarter.id : null,
            promotion_mode : res.data.promotion[0].promotion_mode,
            discount_rate : res.data.promotion[0].discount_rate,
          });
          if(res.data.promotion[0].product_promotion.length>0){
            this.articles = res.data.promotion[0].product_promotion.map(x =>{
              return {
                id : (x.product) ? x.product.id : null,
                name : (x.product) ? x.product.name : null,
                qty : x.quantity ? (typeof x.quantity === 'string' ? parseInt(x.quantity) : x.quantity) : 0,
                price : (x.product) ? x.product.price : 0,
                db_id : x.id
              }
            })
            this.dataSource.data = this.articles;
          }
          if(res.data.promotion[0].combo_promotion.length>0){
            this.combosSelected = res.data.promotion[0].combo_promotion.map(x =>{
              return {
                id : (x.combo) ? x.combo.id : null,
                description : (x.combo) ? x.combo.description : null,
                qty : x.quantity ? (typeof x.quantity === 'string' ? parseInt(x.quantity) : x.quantity) : 0,
                price : (x.combo) ? x.combo.price : 0,
                db_id : x.id
              }
            })
            this.dataSourceCombo.data = this.combosSelected;
          }
  
        }
      }
    }, err => {
      console.log(err);
      this.toastr.clear();
      this.toastr.error('Ha ocurrido un error');
    });
  }

  edit(data: any) {
    this.promotionService.updatePromotion(this.specialSaleID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.router.navigateByUrl('/combos/special-sales');
    }, err => {
      console.log(err);
      this.toastr.clear();
      this.toastr.error('Ha ocurrido un error');
    });
  }

  changeValue(value){
    if(value){
      if(value.value){
        let index = this.articles.findIndex(x => x.name === value.value.name);
        if(index!==-1){
          this.toastr.error("Ya ha agregado el producto/plato/combo")
        }else{
          this.articles.push(Object.assign({},value.value,{qty:1,db_id:0}));
          this.dataSource.data = this.articles;
        }
      }
    }
    this.productCtrl.setValue(null);
  }

  changeValueCombo(value){
    if(value){
      if(value.value){
        let index = this.combosSelected.findIndex(x => x.name === value.value.name);
        if(index!==-1){
          this.toastr.error("Ya ha agregado el producto/plato/combo")
        }else{
          this.combosSelected.push(Object.assign({},value.value,{qty:1,db_id:0}));
          this.dataSourceCombo.data = this.combosSelected;
        }
      }
    }
    this.comboCtrl.setValue(null);
  }

  changeQty(index: number, value: number) {
    if (this.articles[index]["qty"] >= 0) {
      this.articles[index]["qty"] = this.articles[index]["qty"] + (value === -1 && this.articles[index]["qty"] === 0 ? 0 : value);
    }
    else this.articles[index]["qty"] = 0;
  }

  changeQtyCombo(index: number, value: number) {
    if (this.combosSelected[index]["qty"] >= 0) {
      this.combosSelected[index]["qty"] = this.combosSelected[index]["qty"] + (value === -1 && this.combosSelected[index]["qty"] === 0 ? 0 : value);
    }
    else this.combosSelected[index]["qty"] = 0;
  }

  removeElement(index:number){
    this.coolDialogs.confirm('Se eliminará el registro indicado',{
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
        if(!this.articles[index]["db_id"]){
          this.articles.splice(index, 1);
          this.dataSource.data = this.articles;
        }else{
          this.promotionService.deleteProductPromotion(this.articles[index]["db_id"]).subscribe(res => {
            this.toastr.success("Operación realizada satisfactoriamente");
            this.articles.splice(index, 1);
            this.dataSource.data = this.articles;
          }, err => {
            console.log(err);
          });
        }
      }
    });
  }

  removeElementCombo(index:number){
    this.coolDialogs.confirm('Se eliminará el registro indicado',{
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
        if(!this.combosSelected[index]["db_id"]){
          this.combosSelected.splice(index, 1);
          this.dataSourceCombo.data = this.combosSelected;
        }else{
          this.promotionService.deleteComboPromotion(this.combosSelected[index]["db_id"]).subscribe(res => {
            this.toastr.success("Operación realizada satisfactoriamente");
            this.combosSelected.splice(index, 1);
            this.dataSourceCombo.data = this.combosSelected;
          }, err => {
            console.log(err);
          });
        }
      }
    });

  }

  getTotal(){
    let total = 0;
    this.articles.forEach((article)=>{
      total += (article.price * article.qty);
    })
    this.combosSelected.forEach((combo)=>{
      total += (combo.price * combo.qty);
    })
    return total;
  }

  getHeadquarters() {
    this.headquarterService.getHeadquarters().subscribe(res => {
      if(res.data) this.headquarters = [].concat(res.data.headquarters);
    }, err => {
      console.log(err);
      this.toastr.clear();
      this.toastr.error('Ha ocurrido un error');
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

  getCombos() {
    this.comboService.getCombos().subscribe(res => {
      if(res.data) this.combos = [].concat(res.data.combo);
      this.filterCombos();
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

  compareObjects(o1: any, o2: any) {
    if (o1 === o2) return true;
    else return false
  }

}
