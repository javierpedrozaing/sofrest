import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect, MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';
import { SubCategoryService } from 'src/app/services/sub-category.service';
import { HeadquarterService } from 'src/app/services/headquarter.service';
import { ProductsService } from 'src/app/services/products.service';
import { ComboService } from 'src/app/services/combo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';

@Component({
  selector: 'app-combo-form',
  templateUrl: './combo-form.component.html',
  styleUrls: ['./combo-form.component.scss']
})
export class ComboFormComponent implements OnInit {

  @Input() comboID: any;
  public form: FormGroup;
  items: any[] = [{ name: "archie" }, { name: "jake" }, { name: "richard" }];
  dataSource: MatTableDataSource<any>;
  categories = [];
  subcategories = [];
  public headquarters: any[] = [];
  public products: any[] = [];
  public productCtrl: FormControl = new FormControl();
  public productFilterCtrl: FormControl = new FormControl();
  public filteredProducts: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  public _onDestroy = new Subject<void>();

  public articles: any[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['name', 'price', 'qty', 'options'];

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
    private router: Router,
    public route: ActivatedRoute,
    private coolDialogs: NgxCoolDialogsService
  ) {
    this.form = fb.group({
      description: [null, [Validators.required]],
      state: [true, [Validators.required]],
      price: [0, [Validators.required]],
      cost: [0, [Validators.required]],
      headquarter_id: [null, [Validators.required]],
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
    this.filteredSubCategories.next(this.subcategories.slice());
    this.subCategoryFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterSubCategories();
      });
    this.dataSource = new MatTableDataSource([]);
    this.getCategories();
    this.getHeadquarters();
    this.getProducts();
    this.getSubCategories();
    if (this.comboID) {
      this.getCombo(this.comboID);
    } else if (this.route.snapshot.params.id) {
      this.getCombo(this.route.snapshot.params.id);
    }
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

  submit(data: any, formDirective: FormGroupDirective) {
    data.cost = this.getTotal();
    if(this.articles.length===0){
      this.toastr.clear();
      this.toastr.warning("Debe ingresar dos o mas artículos");
    }else{
      data.combo_detail_id = this.articles.map( x => { return x.db_id});
      data.product = this.articles.map( x => { return x.id});
      data.quantity = this.articles.map( x => { return x.qty});
      data.price_product = this.articles.map( x => { return x.price});
      if (this.comboID) this.edit(data);
      else this.save(data, formDirective);
    }
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.comboService.createCombo(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.router.navigateByUrl('/combos/list');
    }, err => {
      console.log(err);
    });
  }

  getCombo(id) {
    this.comboID = id;
    this.comboService.getCombo(id).subscribe(res => {
      if(res.data){
        if (res.data.combo.length === 0) {
          this.toastr.error("No se encuentra el registro indicado")
        } else {
          if(res.data.combo[0].combo_detail.length>0){
            this.articles = res.data.combo[0].combo_detail.map(x =>{
              return {
                id : (x.product) ? x.product.id : null,
                name : (x.product) ? x.product.name : null,
                qty : x.quantity ? (typeof x.quantity === 'string' ? parseInt(x.quantity) : x.quantity) : 0,
                price : x.price,
                db_id : x.id
              }
            });
            this.dataSource.data = this.articles;
          }
          this.form.patchValue({
            description: res.data.combo[0].description,
            state: res.data.combo[0].state,
            price: res.data.combo[0].price,
            cost: res.data.combo[0].cost,
            headquarter_id: res.data.combo[0].headquarter ? res.data.combo[0].headquarter.id : null,
          });
        }
      }
    }, err => {
      console.log(err);
      this.toastr.clear();
      this.toastr.error('Ha ocurrido un error');
    });
  }

  edit(data: any) {
    this.comboService.updateCombo(this.comboID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.router.navigateByUrl('/combos/list');
    }, err => {
      console.log(err);
      this.toastr.clear();
      this.toastr.error('Ha ocurrido un error');
    });
  }

  onNoClick(): void {
    //this.dialogRef.close();
  }

  changeValue(value) {
    if (value) {
      if (value.value) {
        let index = this.articles.findIndex(x => x.name === value.value.name);
        if (index !== -1) {
          this.articles[index]["qty"] += 1;
        } else {
          this.articles.push(Object.assign({}, value.value, { qty: 1 , db_id:0}));
        }
        this.dataSource.data = this.articles;
      }
    }
  }

  changeQty(index: number, value: number) {
    if (this.articles[index]["qty"] >= 0) {
      this.articles[index]["qty"] = this.articles[index]["qty"] + (value === -1 && this.articles[index]["qty"] === 0 ? 0 : value);
    }
    else this.articles[index]["qty"] = 0;
  }

  removeElement(index: number) {
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
          this.comboService.deleteComboDetail(this.articles[index]["db_id"]).subscribe(res => {
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

  getTotal() {
    let total = 0;
    this.articles.forEach((article) => {
      total += (article.price * article.qty);
    })
    return total;
  }

  getHeadquarters() {
    this.headquarterService.getHeadquarters().subscribe(res => {
      //      this.modaldataSourceShops.data = [].concat(res.data.headquarters);
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
      if(res.data) this.subcategories = [].concat(res.data.sub_category);
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

  compareObjects(o1: any, o2: any) {
    if (o1 === o2) return true;
    else return false
  }

}