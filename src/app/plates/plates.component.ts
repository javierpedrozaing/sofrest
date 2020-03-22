import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ScreenMobileChangeService } from '../services/screen/screen-mobile-change.service';
import { ToastrService } from 'ngx-toastr';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DishCategoryService } from '../services/dish-category.service';
import { DishService } from '../services/dish.service';
import { Router, NavigationEnd } from '@angular/router';

export interface PlatesElement {
  name: string;
  recipes: any;
  image: any;
  rules: any;
  terms: any;
  status: boolean;
}

const ELEMENT_DATA: PlatesElement[] = [
  {name: 'Milanesa de Pollo con Pure de Papas y Platanos', terms: 2, recipes: 2, image: null, rules: 3, status: true},
  {name: 'Ceviche de Pescado con Tostones', recipes: 2 , terms: 2, image: null, rules: 3, status: true},
  {name: 'Pasticho de Carne con Pan', recipes: 5, terms: 2, image: null, rules: 3, status: true}
];

@Component({
  selector: 'app-plates',
  templateUrl: './plates.component.html',
  styleUrls: ['./plates.component.scss']
})
export class PlatesComponent implements OnInit,OnDestroy {

  displayedColumns: string[] = ['image', 'name', 'terms', 'options'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  public isMobile: boolean;
  subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    public dishCategoryService: DishCategoryService,
    public dishService: DishService,
    private coolDialogs: NgxCoolDialogsService,
    private router: Router
  ) {
    this.isMobile = this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
      this.router.events.subscribe((ev) => {
        this.getDishes();
      })
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getDishes();
  }

  getDishes() {
    this.dishService.getDishes().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.dishes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });
  }

  deleteDish(id, index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado', {
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
      .subscribe(res => {
        if (res) {
          this.dishService.deleteDish(id).subscribe(res => {
            this.toastr.success("Operación realizada satisfactoriamente");
            this.dataSource.data.splice(index, 1);
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
        this.dishService.updateStateDish({state: !this.dataSource.data[index]["state"]},id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
          this.dataSource.data[index]["state"] =  !this.dataSource.data[index]["state"];
          this.dataSource.data = [].concat(this.dataSource.data);
        }, err => {
          console.log(err);
        });
      }
    });
  }


  openDetail(id){
    const dialogRef = this.dialog.open(DialogViewPlate, {
      maxWidth: '100vw',
      minWidth: '60vw',
      data: {}
    });
    dialogRef.componentInstance.dishID = id;
    dialogRef.afterClosed().subscribe(result => {
      this.getDishes();
    });
  }

}
@Component({
  selector: 'dialog-new-plate',
  templateUrl: 'dialog-new-plate.html',
})
export class DialogNewPlate {

  currencies : any[] = [];
  rules = {name: null, increment: null};
  rulesArray = [];
  selectedRule = {'0': null};
  recipesArray = [
    {name: 'Pasticho de Carne Molida'},
    {name: 'Pure de Papas'},
    {name: 'Arroz a la Jardinera'},
    {name: 'Tostones'}
  ];

  optionProduc = [
    {name: 'Producto 1'},
    {name: 'Producto 2'},
    {name: 'Producto 3'},
    {name: 'Producto 4'}
  ];

  optionRule = [
    {name: 'Sin'},
    {name: 'Con'},
  ];

  selectRecipesConfig = {
    displayKey: 'name',
    search: true,
    height: 'auto',
    moreText: 'mas',
    placeholder: 'Recetas',
    noResultsFound: 'Sin Resultados!'
  };

  selectRule = {
    displayKey: 'name',
    search: true,
    height: 'auto',
    moreText: 'mas',
    placeholder: 'Regla',
    noResultsFound: 'Sin Resultados!'
  };

  selectProduc = {
    displayKey: 'name',
    search: true,
    height: 'auto',
    moreText: 'mas',
    placeholder: 'Productos',
    noResultsFound: 'Sin Resultados!'
  };

  terms = [null];

  addTerm(){
    this.terms.push(null);
  }

  deleteTerm(index:number){
    this.terms.splice(index,1);
  }

  constructor(
    public dialogRef: MatDialogRef<DialogNewPlate>) {
      this.rulesArray.push(this.rules);
    }

    compareObjects(o1: any, o2: any) {
      if(o1 === o2) return true;
      else return false
    }

    addRule() {
      this.rulesArray.push(this.rules);
      this.selectedRule[this.rulesArray.length - 1] = this.rules.name;
    }

    deleteRule(idx){
      this.rulesArray.splice(idx,1);
    }



    onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-view-plate',
  templateUrl: 'dialog-view-plate.html',
})
export class DialogViewPlate implements OnInit {
  @Input() dishID : any;
  public ingredientsArray : any[] = [];
  public response : any = {};
  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    public dishCategoryService: DishCategoryService,
    public dishService: DishService,
    private coolDialogs: NgxCoolDialogsService,
    public dialogRef: MatDialogRef<DialogViewPlate>) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getDish(id) {
    this.dishID = id;
    this.dishService.getDish(id).subscribe(res => {
      if(res.data){
        if (res.data.dishes.length === 0) {
          this.toastr.error("No se encuentra el registro indicado")
        } else {
          this.response = res.data.dishes[0];
        }
      }
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
      if (this.dishID) {
        this.getDish(this.dishID);
      }
  }

}
