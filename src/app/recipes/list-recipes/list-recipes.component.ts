import { Component, OnInit, Inject, OnDestroy, ViewChild, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription, ReplaySubject, Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { MatSelect, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { CategoryService } from 'src/app/services/category.service';
import { SubCategoryService } from 'src/app/services/sub-category.service';
import { HeadquarterService } from 'src/app/services/headquarter.service';
import { ProductsService } from 'src/app/services/products.service';
import { ComboService } from 'src/app/services/combo.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { ProductionAreaService } from 'src/app/services/production-area.service';
import { MeasurementUnitService } from 'src/app/services/measurement-unit.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { ImageUploaderOptions, FileQueueObject } from 'ngx-image-uploader';
import { DishCategoryService } from 'src/app/services/dish-category.service';
import { CoinService } from 'src/app/services/coin.service';

export interface IngredientElement {
  name: string;
  ingredients: any;
  total: any;
  status: boolean;
}

const ELEMENT_DATA: IngredientElement[] = [
  { name: 'Milanesa de Pollo', ingredients: 5, total: 25, status: true },
  { name: 'Ceviche de Pescado', ingredients: 5, total: 25, status: true },
  { name: 'Pasticho de Carne', ingredients: 5, total: 25, status: true }
];

@Component({
  selector: 'app-list-recipes',
  templateUrl: './list-recipes.component.html',
  styleUrls: ['./list-recipes.component.scss']
})
export class ListRecipesComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['name', 'ingredients', 'total', 'options'];
  dataSource = new MatTableDataSource([]);
  public isMobile: boolean;
  subscription: Subscription;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    public toastr: ToastrService,
    public recipeService: RecipeService,
    private coolDialogs: NgxCoolDialogsService,
    public measurementUnitService: MeasurementUnitService,
  ) {
    this.isMobile = this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(id,index): void {
    const dialogRef = this.dialog.open(DialogNewRecipe, {
      maxWidth: '100vw',
      minWidth: '80vw',
      data: {}
    });
    if(id) dialogRef.componentInstance.recipeID = id;
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let data = this.dataSource.data;
        if(id){
          data[index] = result;
        }else{
          data.push(result);
        }
        this.dataSource = new MatTableDataSource([].concat(data));
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  openViewDialog(recipe): void {
    const dialogRef = this.dialog.open(DialogViewRecipe, {
      maxWidth: '100vw',
      minWidth: '60vw',
      data: {}
    });
    dialogRef.componentInstance.recipeID = recipe;
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getRecipes() {
    this.recipeService.getRecipes().subscribe(res => {
      if(res.data)  this.dataSource = new MatTableDataSource(res.data.recipes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });
  }

  deleteRecipe(id,index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado',{
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
        this.recipeService.deleteRecipe(id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
          this.dataSource.data.splice(index,1);
          this.dataSource.data = [].concat(this.dataSource.data);
        }, err => {
          console.log(err);
        });
      }
    });
  }

  changeVisibility(id,index,status) {
    let action = '';

    status == true ? (action = 'ocultará') : (action = 'mostrará');

    this.coolDialogs.confirm(`Se ${action} el registro indicado`,{
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
        this.recipeService.updateStateRecipe({state: !this.dataSource.data[index]["state"]},id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
           this.dataSource.data[index]["state"] =  !this.dataSource.data[index]["state"];
          this.dataSource.data = [].concat(this.dataSource.data);
        }, err => {
          console.log(err);
        });
      }
    });
  }


  ngOnInit() {
    this.dataSource = new MatTableDataSource([
    ]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getRecipes();
  }

}
@Component({
  selector: 'dialog-new-recipe',
  templateUrl: 'dialog-new-recipe.html',
})
export class DialogNewRecipe implements OnInit {

  @Input() recipeID : any;
  ingredients = { product: null, qty: null, unit: null, db_id:0};
  recipe_type = 1;
  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  recipes = [];
  ingredientsArray = [];
  recipesTypes: number;
  categories = [];
  subcategories = [];
  public headquarters: any[] = [];
  public products: any[] = [];
  public production_areas: any[] = [];
  productsArray = [
  ];
  unitsArray = [];
  recipesArray = [];
  // selectProductConfig = {
  //   height: 'auto' ,
  //   displayKey: 'name',
  //   search: true,
  //   moreText: 'mas',
  //   placeholder: 'Producto',
  //   searchPlaceholder:'Buscar',
  //   noResultsFound: 'Sin Resultados!'
  // };
  // selectQtyConfig = {
  //   height: 'auto' ,
  //   displayKey: 'name',
  //   search: true,
  //   moreText: 'mas',
  //   placeholder: 'Unidad',
  //   searchPlaceholder:'Buscar',
  //   noResultsFound: 'Sin Resultados!'
  // };
  // selectRecipeConfig = {
  //   displayKey: 'name',
  //   search: true,
  //   moreText: 'mas',
  //   placeholder: 'Receta',
  //   searchPlaceholder:'Buscar',
  //   noResultsFound: 'Sin Resultados!'
  // };
  public form: FormGroup;

  public productCtrl: FormControl = new FormControl();
  public productFilterCtrl: FormControl = new FormControl();
  public filteredProducts: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  //@ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  public _onDestroy = new Subject<void>();

  public unitCtrl: FormControl = new FormControl();
  public unitFilterCtrl: FormControl = new FormControl();
  public filteredUnits: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect1', { static: true }) singleSelect1: MatSelect;

  public recipeCtrl: FormControl = new FormControl();
  public recipeFilterCtrl: FormControl = new FormControl();
  public filteredRecipes: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect2', { static: true }) singleSelect2: MatSelect;

  public categoryCtrl: FormControl = new FormControl();
  public categoryFilterCtrl: FormControl = new FormControl();
  public filteredCategories: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect3', { static: true }) singleSelect3: MatSelect;

  public subCategoryCtrl: FormControl = new FormControl();
  public subCategoryFilterCtrl: FormControl = new FormControl();
  public filteredSubCategories: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect4', { static: true }) singleSelect4: MatSelect;
  dishCategories : any[] = [];
  currencies : any[] = [];
  recipesArraySelected = [{ recipe: null, qty: 0 }];
  imgData: any = null;
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
    public categoryService: CategoryService,
    public subCategoryService: SubCategoryService,
    public headquarterService: HeadquarterService,
    private productsService: ProductsService,
    private comboService: ComboService,
    private promotionService: PromotionService,
    public productionAreasService: ProductionAreaService,
    public measurementUnitService: MeasurementUnitService,
    public toastr: ToastrService,
    public recipeService: RecipeService,
    private coolDialogs: NgxCoolDialogsService,
    public dishCategoryService : DishCategoryService,
    public coinService : CoinService,
    public dialogRef: MatDialogRef<DialogNewRecipe>) {
    this.ingredientsArray.push(Object.assign({},this.ingredients));
    this.form = fb.group({
      name : [null, [Validators.required]],
      code : [null, []],
      barcode : [null, []],
      coin_id : [0, [Validators.required]],
      net_price : [0, []],
      price : [0, [Validators.required]],
      cost : [null, [Validators.required]],
      // dish_maximum_allowed : [null, [Validators.required]],
      // dish_category_id : [null, [Validators.required]],
      observation : [null, []],
      image : [null, [Validators.required]],
      state : [true, []],
      production_area_id : [0, [Validators.required]],
      type_recipe : [null, [Validators.required]],
      product : [null, []],
      quantity : [null, []],
    });
  }

  addIngredient() {
    this.ingredientsArray.push(Object.assign({},this.ingredients));
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

  addRecipe() {
    this.recipesArraySelected.push({ recipe: null, qty: 0 });
  }

  removeIngredient(index: number) {
    this.coolDialogs.confirm('Se eliminará el registro indicado',{
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
        if(!this.ingredientsArray[index]["db_id"]){
          this.ingredientsArray.splice(index, 1);
        }else{
          this.recipeService.deleteRecipeDetail(this.ingredientsArray[index]["db_id"]).subscribe(res => {
            this.toastr.success("Operación realizada satisfactoriamente");
            this.ingredientsArray.splice(index, 1);
          }, err => {
            console.log(err);
          });
        }
      }
    });
  }

  removeRecipe(index: number) {
    this.recipesArraySelected.splice(index, 1);
  }

  ngOnInit() {
    this.filteredProducts.next(this.products.slice());
    this.productFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterProducts();
      });
    this.filteredUnits.next(this.unitsArray.slice());
    this.unitFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterUnits();
      });
    this.filteredRecipes.next(this.unitsArray.slice());
    this.recipeFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterRecipes();
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
      if (this.recipeID) {
        this.getRecipe(this.recipeID);
      }
    this.getCategories();
    this.getProducts();
    //this.getSubCategories();
    this.getProductionAreas();
    this.getMeasurementUnit();
    this.getRecipes();
    this.getDishCategories();
    this.getCoins();
  }

  getCoins() {
    this.coinService.getCoins().subscribe(res => {
      if(res.data) this.currencies = [].concat(res.data.coins);
    }, err => {
      console.log(err);
    });
  }
  getTotal() {
    let total = 0;
    this.ingredientsArray.forEach((article) => {
      total += (article.price * article.qty);
    })
    this.recipesArraySelected.forEach((article) => {
      if(article.recipe){
      total += (article.recipe.price * article.qty);}
    })
    this.form.patchValue({
      cost_price : total
    });
    return total;
  }

  submit(data: any, formDirective: FormGroupDirective) {
    //data.cost = this.getTotal();
    if (this.ingredientsArray.length === 0 && this.recipesArraySelected.length === 0) {
      this.toastr.clear();
      this.toastr.warning("Debe ingresar uno o más productos");
    } else {
      let validate = true;
      for (let index = 0; index < this.ingredientsArray.length; index++) {
        if(!this.ingredientsArray[index].product || !this.ingredientsArray[index].qty) {
          validate = false;
          break;
        }
      }
      if(!validate) return this.toastr.warning("Existen campos inválidos en el registro");
      data.recipe_detail_id = this.ingredientsArray.map(x => { return x.db_id });
      data.product = this.ingredientsArray.map(x => { return x.product.id });
      data.quantity = this.ingredientsArray.map(x => { return x.qty });
      //data.unit = this.ingredientsArray.map(x => { return x.unit });
      if (this.recipeID) this.edit(data);
      else this.save(data, formDirective);
    }
  }

  getProductsBySubcategory(id) {
    this.productsService.getProductsBySubcategory(id).subscribe(res => {
      if(res.data) this.products = [].concat(res.data.product_with_subcategory);
      this.filterProducts();
    }, err => {
      console.log(err);
    })
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.recipeService.createRecipe(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.dialogRef.close(res.data.createRecipe);
    }, err => {
      console.log(err);
    });
  }

  getRecipe(id) {
    this.recipeService.getRecipe(id).subscribe(res => {
      if(res.data){
      if (res.data.recipes.length === 0) {
        this.toastr.error("No se encuentra el registro indicado")
      } else {
        this.form.patchValue({
          name : res.data.recipes[0].name,
          code : res.data.recipes[0].code,
          barcode : res.data.recipes[0].barcode,
          coin_id : res.data.recipes[0].coin ? res.data.recipes[0].coin.id : 0,
          net_price : res.data.recipes[0].net_price,
          price : res.data.recipes[0].price,
          cost : res.data.recipes[0].cost,
          observation : res.data.recipes[0].observation,
          image : res.data.recipes[0].image,
          state : res.data.recipes[0].state,
          production_area_id : res.data.recipes[0].production_area ? res.data.recipes[0].production_area.id : 0,
          type_recipe : res.data.recipes[0].type_recipe,
          product : res.data.recipes[0].product,
          quantity : res.data.recipes[0].quantity,
        });
        if(res.data.recipes[0].composite_product.length>0){
          this.ingredientsArray =  res.data.recipes[0].composite_product.map((x)=>{
            return { product: x.product, qty: x.quantity, unit: (x.measurement_unit) ? x.measurement_unit.id : null , db_id:x.id}
          });
        }
      }}
    }, err => {
      console.log(err);
    });
  }

  edit(data: any) {
    this.recipeService.updateRecipe(this.recipeID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.dialogRef.close(res.data.updateRecipe);
    }, err => {
      console.log(err);
    });
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

  public filterUnits() {
    if (!this.unitsArray) {
      return;
    }
    let search = this.unitFilterCtrl.value;
    if (!search) {
      this.filteredUnits.next(this.unitsArray.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredUnits.next(
      this.unitsArray.filter(item => item.description.toLowerCase().indexOf(search) > -1)
    );
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
      this.categories.filter(item => item.description.toLowerCase().indexOf(search) > -1)
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
      this.subcategories.filter(item => item.description.toLowerCase().indexOf(search) > -1)
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
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
      if(res.data)  this.subcategories = [].concat(res.data.sub_category);
      this.filterSubCategories();
    }, err => {
      console.log(err);
    });
  }

  getProducts() {
    this.productsService.productsWithProductionItem().subscribe(res => {
      if(res.data)  this.products = [].concat(res.data.product_with_production_item);
      //if(res.data)  this.products = [].concat(res.data.products);
      this.filterProducts();
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

  getProductionAreas() {
    this.productionAreasService.getProductionAreas().subscribe(res => {
      if(res.data) this.production_areas = [].concat(res.data.production_areas);
    }, err => {
      console.log(err);
    });
  }

  getMeasurementUnit() {
    this.measurementUnitService.getMeasurementUnits().subscribe(res => {
      if(res.data) this.unitsArray = [].concat(res.data.measurement_units);
      this.filterUnits();
    }, err => {
      console.log(err);
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

  compareObjectsByID(o1: any, o2: any) {
    if (o1.id === o2.id) return true;
    else return false
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

  getDishCategories() {
    this.dishCategoryService.getDishCategories().subscribe(res => {
      if(res.data) this.dishCategories= [].concat(res.data.dish_categories);
    }, err => {
      console.log(err);
    });
  }

}

@Component({
  selector: 'dialog-view-recipe',
  templateUrl: 'dialog-view-recipe.html',
})
export class DialogViewRecipe implements OnInit {
  @Input() recipeID : any;
  public ingredientsArray : any[] = [];
  public response : any = {};
  constructor(
    private fb: FormBuilder,
    public categoryService: CategoryService,
    public subCategoryService: SubCategoryService,
    public headquarterService: HeadquarterService,
    private productsService: ProductsService,
    private comboService: ComboService,
    private promotionService: PromotionService,
    public productionAreasService: ProductionAreaService,
    public measurementUnitService: MeasurementUnitService,
    public toastr: ToastrService,
    public recipeService: RecipeService,
    private coolDialogs: NgxCoolDialogsService,
    public dialogRef: MatDialogRef<DialogNewRecipe>) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  
  getRecipe(id) {
    this.recipeService.getRecipe(id).subscribe(res => {
      if(res.data){
        if (res.data.recipes.length === 0) {
          this.toastr.error("No se encuentra el registro indicado")
        } else {
          this.response = res.data.recipes[0];
        }
      }
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
      if (this.recipeID) {
        this.getRecipe(this.recipeID);
      }
  }

}
