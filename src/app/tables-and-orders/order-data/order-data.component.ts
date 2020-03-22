import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort, MatSelect, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClientsForm } from 'src/app/clients/clients/clients.component';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';

@Component({
  selector: 'app-order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.scss']
})
export class OrderDataComponent implements OnInit {

  clientFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  @Input() dni: any;
  total = 0;
  tables = [
    { name: 1},
    { name: 2},
    { name: 3},
    { name: 4},
    { name: 5},
    { name: 6},
  ]

  displayedColumns: string[] = ["article", "price", "qty", "add", "without", "total", "options",];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  subscription: Subscription; 
  constructor(
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private router: Router,
    private screenMobileChangeService: ScreenMobileChangeService,
    ) {
      if(this.screenMobileChangeService.isMobile) this.router.navigate(['/orders-mobile/status']);
      this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
          if(isMobile) this.router.navigate(['/orders-mobile/status']);
        });
    }

  ngOnInit() {
    this.clientFormGroup = this._formBuilder.group({
      name: [{value: null, disabled: false}, [Validators.required]],
      surname: [{value: null, disabled: false}, [Validators.required]],
      email: [{value: null, disabled: false}, [Validators.required]],
      dni: [null, [Validators.required]],
      type: [null, [Validators.required]],
      phone: [{value: null, disabled: false}, [Validators.required]],
      qty: [0, [Validators.required]],
    });
    this.secondFormGroup = this._formBuilder.group({
      table: [null, Validators.required],
      qty: [0, [Validators.required]],
    });
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }


  chargeClients(){
    if(this.secondFormGroup.value.qty>=1){
      for (let index = 0; index < Math.ceil(this.secondFormGroup.value.qty); index++) {
        this.dataSource.data.push(
          {
            "code": null,
            "article": null,
            "qty": 0,
            "plate": 0,
            "product": false,
            "add": null,
            "addValue": 0,
            "exclude": null,
            "price": 0,
            "total_price": 0,
            "additionals": null,
            "term": null,
            "observations": null,
          }
        )
      }
      this.dataSource.data = [].concat(this.dataSource.data);
    }else this.toastr.error("Debe ingresar un número válido de comensales");
  }

  searchClient(){
    if(this.clientFormGroup.value.dni){
      if(this.clientFormGroup.value.dni === "123456"){
        this.clientFormGroup.patchValue({
          "name":"José Rafael",
          "surname":"Guzmán",
          "email":"jrguzman@gmail.com",
          "phone":"000123654",
        });
      }else this.toastr.error("No existe un cliente registrado con el DNI");
    }
    else{
      this.toastr.error("Debe indicar el DNI");
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ClientsForm, {
      width: '55vw',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogProduct(data,index): void {
    const dialogRef = this.dialog.open(DialogProduct, {
      maxWidth : '100vw',
      minWidth: '60vw',
      data: data === null ? {} : data
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result && !data) {
        this.dataSource.data.push(result);
      }
      if(data && result){
        this.dataSource.data[index]=result;
        this.toastr.success("Operación Realizada Satisfactoriamente");
      }
      this.dataSource.data = [].concat(this.dataSource.data);
      this.getTotal();
    });
  }

  changeQty(index,value:number){
    if(this.dataSource.data[index]["qty"] >=0){
      this.dataSource.data[index]["qty"] = this.dataSource.data[index]["qty"] + (value ===-1 && this.dataSource.data[index]["qty"]===0 ? 0 : value );
   }
   else this.dataSource.data[index]["qty"] = 0;
   this.dataSource.data = [].concat(this.dataSource.data);
   this.calculateValue(index);
  }

  calculateValue(index){
    this.dataSource.data[index]["total_price"] = (this.dataSource.data[index]["qty"]*this.dataSource.data[index]["price"]) + (this.dataSource.data[index]["qty"]*this.dataSource.data[index]["addValue"])
    this.getTotal();
  }

  removeElement(index){
    this.dataSource.data.splice(index,1);
    this.dataSource.data = [].concat(this.dataSource.data);
    this.getTotal();
  }

  getTotal(){
    let total = 0;
    this.dataSource.data.forEach((article)=>{
      total += article.total_price
    })
    this.total = total;
  }

}


@Component({
  selector: 'dialog-product',
  templateUrl: 'dialog-product.html',
})
export class DialogProduct implements OnInit {
  public form: FormGroup;

  public plusItems = [
    {
      "name": "Papas Fritas", "code": "0012522", "price": 5, status: true, plate:true,
    },
    {
      "name": "Mermelada", "code": "0012522", "price": 5, status: true, plate:true,
    },
    {
      "name": "Camarones En Salsa", "code": "0012522", "price": 10, status: true, plate:true,
    },
  ];

  public excludeItems = [
    {
      "name": "Cebolla", "code": "0012522",
    },
    {
      "name": "Salsas", "code": "0012522",
    },
    {
      "name": "Sal", "code": "0012522",
    },
  ];

  additionals : any = [
    {
      "name": "Otro",
    },
  ]

  terms : any = [
    "Cocido",
  ]

  public products: any[] = [
    {
      "name": "Pollo Dulce", "code": "0012522", "price": 20, status: true, plate:true,
    },
    {
      "name": "Gaseosa", "code": "0012518", "price": 15, status: true, plate:false,
    },
    {
      "name": "Lasagna", "code": "0012518", "price": 25, status: true,plate:true,
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

  // public orderCtrl: FormControl = new FormControl();
  // public orderFilterCtrl: FormControl = new FormControl();
  // public filteredOrder: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  // @ViewChild('singleSelect3', { static: true }) singleSelect3: MatSelect;

  constructor(
    public dialogRef: MatDialogRef<DialogProduct>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.form = fb.group({
      "code": [data.code || null, [Validators.required]],
      "article": [data.article || null, [Validators.required]],
      "qty": [data.qty || 1, [Validators.required]],
      "plate": [data.plate || 0, [Validators.required]],
      "product": [data.product || false, [Validators.required]],
      "add": [data.add || null , []],
      "addValue": [data.addValue  || 0 , []],
      "exclude": [data.exclude || null, []],
      "price": [data.price || 0, [Validators.required]],
      "total_price": [data.total_price || 0, [Validators.required]],
      "additionals": [data.additionals || null, [Validators.required]],
      "term": [data.term || null, [Validators.required]],
      "observations": [data.observations || null, [Validators.required]],
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
      this.calculateTotalPrice();
  }

  changeValueCategory(event) { }
  changeValueSubCategory(event) { }
  changeValue(event) {
    if(event.value){
      this.form.patchValue({
        plate: event.value.plate,
        code: event.value.code,
        article: event.value.name,
        price: event.value.price,
        add: [],
        exclude: [],
      });
    }
    this.calculateTotalPrice();
  }

  compareObjects(o1: any, o2: any) {
    if(o1.name === o2.name) return true;
    else return false
  }

  compareData(o1: any, o2: any){
    return o1 === o2;
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

  save(data){
    this.dialogRef.close(data);
  }

  changeAditionals(){
    let total = 0;
    if(this.form.value.add){
      if(Array.isArray(this.form.value.add)){
        this.form.value.add.map((element)=>{
          if(element.price) total+=element.price
        })
      }
    }
    this.form.patchValue({
      addValue : total
    })
    return total;
  }

  calculateTotalPrice(){
    let aditionals = this.changeAditionals();
    this.form.patchValue({
      total_price : ((this.form.value.price || 0) * ( this.form.value.qty || 0) + (this.form.value.qty || 0) * ( aditionals || 0))
    })
  }
}