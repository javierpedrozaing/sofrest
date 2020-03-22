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
import { CoinService } from 'src/app/services/coin.service';
import { TasteService } from 'src/app/services/taste.service';
import { DishCategoryService } from 'src/app/services/dish-category.service';
import { DishService } from 'src/app/services/dish.service';
import { ColorService } from 'src/app/services/color.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { MeasurementUnitService } from 'src/app/services/measurement-unit.service';
import { FileQueueObject, ImageUploaderOptions } from 'ngx-image-uploader';
import { PrintersService } from 'src/app/services/printers.service';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-plate-form',
  templateUrl: './plate-form.component.html',
  styleUrls: ['./plate-form.component.scss']
})
export class PlateFormComponent implements OnInit {


  @Input() dishID: any;
  public form: FormGroup;
  items: any[] = [{ name: "archie" }, { name: "jake" }, { name: "richard" }];
  dataSource: MatTableDataSource<any>;
  dataSourceRecipe: MatTableDataSource<any>;
  public categories = [];
  public subcategories = [];
  public headquarters: any[] = [];
  public products: any[] = [];
  public tastes: any[] = [];
  public currencies: any[] = [];
  public dishCategories : any[] = [];
  public colours : any[] = [];
  public recipes : any[] = [];
  public recipesArray = [];
  public terms = [{db_id:0,description:null}];
  rules = {name: null, increment: null};
  recipesSelected : any[] = [];
  rulesArray = [];
  mUnits = [];
  optionRule = [{name:'Con',value:1}, {name:'Sin',value:0}];
  selectRule : any[] = [{
    db_id:0,
    attribute : null,
    product : {},
    max_quantity : 0,
    price_attribute : 0,
  }]

  areas = [];
  printers = [];

  public recipesArraySelected = [{ recipe: null, qty: 0 }];
  public productCtrl: FormControl = new FormControl();
  public productFilterCtrl: FormControl = new FormControl();
  public filteredProducts: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  public _onDestroy = new Subject<void>();

  public articles: any[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['name', 'price', 'qty', 'options'];
  displayedColumnsRecipes : string[] = ['name', 'price', 'options'];

  public recipeCtrl: FormControl = new FormControl();
  public recipeFilterCtrl: FormControl = new FormControl();
  public filteredRecipes: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect3', { static: true }) singleSelect3: MatSelect;

  public categoryCtrl: FormControl = new FormControl();
  public categoryFilterCtrl: FormControl = new FormControl();
  public filteredCategories: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect1', { static: true }) singleSelect1: MatSelect;

  public subCategoryCtrl: FormControl = new FormControl();
  public subCategoryFilterCtrl: FormControl = new FormControl();
  public filteredSubCategories: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect2', { static: true }) singleSelect2: MatSelect;

  options: ImageUploaderOptions = {
    thumbnailHeight: 150,
    thumbnailWidth: 150,
    autoUpload: true,
    uploadUrl: 'https://fancy-image-uploader-demo.azurewebsites.net/api/demo/upload',
    allowedImageTypes: ['image/png', 'image/jpeg'],
    maxImageSize: 3
  };

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public categoryService: CategoryService,
    public printService: PrintersService,
    private areaService: AreaService,
    public subCategoryService: SubCategoryService,
    public headquarterService: HeadquarterService,
    private productsService: ProductsService,
    private comboService: ComboService,
    public coinService: CoinService,
    public tasteService: TasteService,
    public dishCategoryService : DishCategoryService,
    public dishService : DishService,
    public colorService : ColorService,
    public recipeService: RecipeService,
    private router: Router,
    public route: ActivatedRoute,
    private coolDialogs: NgxCoolDialogsService,
    public measureUnitsService : MeasurementUnitService
  ) {
    this.rulesArray.push(this.rules);
    this.form = fb.group({
        name : [null, [Validators.required]],
        code : [null, []],
        barcode : [null, []],
        coin_id : [null, [Validators.required]],
        net_price : [null, []],
        price : [null, [Validators.required]],
        cost : [null, [Validators.required]],
        dish_maximum_allowed : [null, [Validators.required]],
        dish_category_id : [null, [Validators.required]],
        observation : [null, []],
        image : [null, [Validators.required]],
        state : [true, []],
        area_id : [true, []],
        printer_id : [true, []],
    });
  }

  onUpload(files: FileQueueObject) {
    let file = files.file;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.form.patchValue({
        image: reader.result
      });
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  getAreas() {
    this.areaService.getAreas().subscribe(res => {
      if (res.data) this.areas = [].concat(res.data.areas);
    }, err => {
      console.log(err);
    });
  }

  getPrintersByArea(id) {
    this.form.patchValue({
      area_id:id
    })
    this.printService.getPrintersByArea(id).subscribe(res => {
      if (res.data) this.printers = [].concat(res.data.printer_with_area);
    }, err => {
      console.log(err);
    });
  }


  ngOnInit() {
    this.filteredRecipes.next(this.recipes.slice());
    this.recipeFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterRecipes();
      });
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
    this.dataSourceRecipe = new MatTableDataSource([]);
    this.getCategories();
    this.getHeadquarters();
    this.getProducts();
    this.getSubCategories();
    this.getCoins();
    //this.getTastes();
    this.getDishCategories();
    //this.getColors();
    this.getRecipes();
    this.getAreas();
    if (this.dishID) {
      this.getDish(this.dishID);
    } else if (this.route.snapshot.params.id) {
      this.getDish(this.route.snapshot.params.id);
    }
    this.getMeasureUnits();
  }

  getMeasureUnits() {
    this.measureUnitsService.getMeasurementUnits().subscribe(response => {
      if (response.data) this.mUnits = response.data.measurement_units;
      if (this.mUnits.length > 0 && !this.dishID) {
        let data = this.mUnits.find(x => x.sunat_code === "07");
        if (data) {
          this.form.patchValue({
            measurement_unit_id: data.id,
            measurement_unit_id_stock: data.id,
          })
        }
      }
    }, err => {
      console.log(err);
    });
  }

  public filterRecipes() {
    if (!this.recipes) {
      return;
    }
    let search = this.recipeFilterCtrl.value;
    if (!search) {
      this.filteredRecipes.next(this.recipes.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredRecipes.next(
      this.recipes.filter(item => item.name.toLowerCase().indexOf(search) > -1)
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
    if(this.recipesSelected.length === 0){
      this.toastr.clear();
      this.toastr.warning("Debe seleccionar una o más recetas");
    }else{
      data.term_for_dish = this.terms.map(x=> {return x.description});
      data.recipe = this.recipesSelected.map( x => { return x.id});
      data.product_attribute = this.selectRule.map( x => { return x.product});
      data.quantity_attribute = this.selectRule.map( x => { return x.max_quantity});
      data.attribute_type = this.selectRule.map( x => { return x.attribute});
      data.price_attribute = this.selectRule.map( x => { return x.price_attribute});
      data.composite_product_id = this.recipesSelected.map( x => { return x.db_id});
      data.term_for_dish_id = this.terms.map(x=> {return x.db_id});
      data.dish_attribute_id = this.selectRule.map( x => { return x.db_id});
      if (this.dishID) this.edit(data);
      else this.save(data, formDirective);
    }
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.dishService.createDish(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.router.navigateByUrl('/plates');
    }, err => {
      console.log(err);
    });
  }

  getDish(id) {
    this.dishID = id;
    this.dishService.getDish(id).subscribe(res => {
      if(res.data){
        if (res.data.dishes.length === 0) {
          this.toastr.error("No se encuentra el registro indicado")
        } else {
          this.form.patchValue({
            name : res.data.dishes[0].name,
            code : res.data.dishes[0].code,
            barcode : res.data.dishes[0].barcode,
            coin_id : res.data.dishes[0].coin ? res.data.dishes[0].coin.id : null,
            net_price : res.data.dishes[0].net_price,
            price : res.data.dishes[0].price,
            cost : res.data.dishes[0].cost,
            dish_maximum_allowed : res.data.dishes[0].dish_maximum_allowed,
            dish_category_id : res.data.dishes[0].dish_category ? res.data.dishes[0].dish_category.id : null,
            observation : res.data.dishes[0].observation,
            image : res.data.dishes[0].image,
            state : res.data.dishes[0].state,
            production_area_id : res.data.dishes[0].production_area ? res.data.dishes[0].production_area.id : null,
            type_recipe : res.data.dishes[0].type_recipe,
            product : res.data.dishes[0].product,
            quantity : res.data.dishes[0].quantity,
            printer_id : res.data.dishes[0].printer ? res.data.dishes[0].printer.id : null,
          });
          res.data.dishes[0].printer ? (res.data.dishes[0].printer.area ? this.getPrintersByArea(res.data.dishes[0].printer.area.id) : null) : null;
          if(res.data.dishes[0].term_for_dish.length>0) this.terms = res.data.dishes[0].term_for_dish.map(x => {
            return {
              db_id : x.id,
              description : x.description
            }
          });
          if(res.data.dishes[0].composite_product.length>0){
            this.recipesSelected = res.data.dishes[0].composite_product.map(x => {
              return Object.assign({}, x.product,{qty:x.quantity,db_id:x.id});
            })
            this.dataSourceRecipe.data = this.recipesSelected;
          }
          if(res.data.dishes[0].dish_attribute.length>0){
            this.selectRule = res.data.dishes[0].dish_attribute.map(x => {
              return {
                attribute : (x.attribute_type) ? (typeof x.attribute_type === 'string' ? parseInt(x.attribute_type) : x.attribute_type) : null,
                product : x.product.id,
                max_quantity : x.quantity,
                price_attribute : x.price,
                db_id : x.id
              }
            })
          }
        }
      }
    }, err => {
      console.log(err);
    });
  }

  edit(data: any) {
    this.dishService.updateDish(this.dishID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.router.navigateByUrl('/plates');
    }, err => {
      console.log(err);
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
          this.articles.push(Object.assign({}, value.value, { qty: 1, db_id:0 }));
        }
        this.dataSource.data = this.articles;
      }
    }
  }

  changeValueRecipe(value) {
    if (value) {
      if (value.value) {
        let index = this.recipesSelected.findIndex(x => x.id === value.value.id);
        if (index !== -1) {
          this.toastr.warning("Ya ha ingresado la receta");
        } else {
          this.recipesSelected.push(Object.assign({}, value.value, { qty: 1 , db_id:0}));
        }
        this.dataSourceRecipe.data = this.recipesSelected;
      }
    }
    this.recipeCtrl.setValue(null);
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
          this.dishService.deleteDishDetail(this.articles[index]["db_id"]).subscribe(res => {
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

  removeElementRecipe(index: number) {
    this.coolDialogs.confirm('Se eliminará el registro indicado',{
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
        if(!this.recipesSelected[index]["db_id"]){
          this.recipesSelected.splice(index, 1);
          this.dataSourceRecipe.data = this.recipesSelected;
        }else{
          this.dishService.deleteDishDetail(this.recipesSelected[index]["db_id"]).subscribe(res => {
            this.toastr.success("Operación realizada satisfactoriamente");
          this.recipesSelected.splice(index, 1);
          this.dataSourceRecipe.data = this.recipesSelected;
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

  setPrice(value) {
    this.form.patchValue({
      price: parseFloat((value + (value * 0.18)).toFixed(2))
    })
  }

  setNetPrice(value) {
    this.form.patchValue({
      net_price: parseFloat((value / 1.18).toFixed(2))
    })
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

  getTastes() {
    this.tasteService.getTastes().subscribe(res => {
      if(res.data) this.tastes = [].concat(res.data.tastes);
    }, err => {
      console.log(err);
    });
  }

  getCoins() {
    this.coinService.getCoins().subscribe(res => {
      if(res.data) this.currencies = [].concat(res.data.coins);
    }, err => {
      console.log(err);
    });
  }

  getDishCategories() {
    this.dishCategoryService.getDishCategories().subscribe(res => {
      if(res.data) this.dishCategories= [].concat(res.data.dish_categories);
    }, err => {
      console.log(err);
    });
  }

  getColors() {
    this.colorService.getColors().subscribe(res => {
      if(res.data) this.colours= [].concat(res.data.colors);
    }, err => {
      console.log(err);
    });
  }

  getRecipes() {
    this.recipeService.getRecipes().subscribe(res => {
      if(res.data) this.recipes = [].concat(res.data.recipes);
      this.filterRecipes();
    }, err => {
      console.log(err);
    });
  }

  compareObjects(o1: any, o2: any) {
    if (o1 === o2) return true;
    else return false
  }

  addTerm(){
    this.terms.push({db_id:0, description:null});
  }

  deleteTerm(index:number){
    this.coolDialogs.confirm('Se eliminará el registro indicado',{
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
        if(!this.terms[index]["db_id"]){
          this.terms.splice(index, 1);
        }else{
          this.dishService.deleteTermForDish(this.terms[index]["db_id"]).subscribe(res => {
            this.toastr.success("Operación realizada satisfactoriamente");
            this.terms.splice(index,1);
          }, err => {
            console.log(err);
          });
        }
      }
    });
  }

  addRule() {
    this.selectRule.push({
      attribute : null,
      product : {},
      max_quantity : 0,
      price_attribute : 0,
      db_id:0
    });
    //this.selectedRule[this.rulesArray.length - 1] = this.rules.name;
  }

  deleteRule(idx){
    this.coolDialogs.confirm('Se eliminará el registro indicado',{
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
        if(!this.selectRule[idx]["db_id"]){
          this.selectRule.splice(idx,1);
        }else{
          this.dishService.deleteDishAttribute(this.selectRule[idx]["db_id"]).subscribe(res => {
            this.toastr.success("Operación realizada satisfactoriamente");
            this.selectRule.splice(idx,1);
          }, err => {
            console.log(err);
          });
        }
      }
    });
  }

  trackByFn(index: any, item: any) {
    return index;
 }

}
