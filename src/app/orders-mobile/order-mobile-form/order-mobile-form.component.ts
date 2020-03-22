import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Product } from 'src/app/pos-sales/shopping-cart/shopping-cart.component';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';

@Component({
  selector: 'app-order-mobile-form',
  templateUrl: './order-mobile-form.component.html',
  styleUrls: ['./order-mobile-form.component.scss']
})
export class OrderMobileFormComponent implements OnInit {

  productsList: any[] = [
    { name: "CocaCola 2 Litros", price: 1.20, type: '', pic: "https://images-na.ssl-images-amazon.com/images/I/71V7zBtnJHL._SX385_.jpg" },
    { name: "Marquesa Chocolate", plate:true, price: 20, type: '', pic: "https://static.guiainfantil.com/media/9083/c/tarta-marquesa-de-chocolate-receta-casera-venezolana-md.jpg" },
    { name: "Jugo de Naranja", price: 0.75, type: '', pic: "https://i.blogs.es/ae99e7/984422_20524935/450_1000.jpg" },
    { name: "Lomito Saltado", plate:true, price: 50, type: 'recipe',  pic: "http://sazonboricua.com/wp-content/uploads/2013/01/lomo-saltado.jpg" },
    { name: "Papas a la Huancaina", plate:true, price: 55, type: 'recipe', pic: "https://t1.rg.ltmcdn.com/es/images/6/1/1/img_papas_a_la_huancaina_peruanas_32116_600.jpg" },
    { name: "Ceviche de Pescado", plate:true, price: 30, type: 'recipe', pic: "https://t2.rg.ltmcdn.com/es/images/0/4/1/img_ceviche_de_pescado_ecuatoriano_18140_600.jpg" }
  ];
  protected products: any[] = this.productsList;
  public productCtrl: FormControl = new FormControl();
  public productFilterCtrl: FormControl = new FormControl();
  public filteredProducts: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  public _onDestroy = new Subject<void>();
  public showImg = true;
  public clientsControl: FormControl = new FormControl();
  categories: any = [
    {
      name: 'Entradas',
      selected : true,
    },
    {
      name: 'Ensaladas',
    },
    {
      name: 'Piqueos',
    },
    {
      name: 'Carnes',
    },
    {
      name: 'Pastas',
    },
    {
      name: 'Pescados',
    },
    {
      name: 'Bebidas',
    },
    {
      name: 'Bebidas con Alcohol',
    },
  ];
  panelOpenState = false;
  selectedClient = null;
  clients : any[] = [];
  total = 0;
  selectedCategory(index: number) {
    this.categories.forEach(element => {
      element.selected = false;
    });
    this.categories[index].selected = true;
  }

  constructor(
    private toastr: ToastrService,
    public dialog: MatDialog,
    private coolDialogs: NgxCoolDialogsService
  ) { }

  protected filterProducts() {
    if (!this.products) {
      return;
    }
    // get the search keyword
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

  openDialogProduct(data,product,indexClient,index): void {
    const dialogRef = this.dialog.open(DialogProduct, {
      maxWidth : '100vw',
      minWidth: '60vw',
      data: data === null ? {
        product:product
      } : Object.assign({},{form:data},{product})
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result && !data) {
        this.clients[indexClient].data.push(result);
      }
      if(data && result){
        this.clients[indexClient].data[index]=result;
        this.toastr.success("Operación Realizada Satisfactoriamente");
      }
      this.getTotalPriceClient(indexClient);
    });
  }

  addNewOrderClient(indexClient){
    const dialogRef = this.dialog.open(DialogProduct, {
      maxWidth : '100vw',
      minWidth: '60vw',
      data: {product:null,showSearch:true}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        this.clients[indexClient].data.push(result);
      }
      this.getTotalPriceClient(indexClient);
    });
  }
  ngOnInit() {
    this.filteredProducts.next(this.products.slice());
    this.productFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterProducts();
      });
  }
  addProductClient(product){
    if(this.selectedClient === null) this.toastr.warning("Debe seleccionar un cliente");
    else{
      let index = this.clients[this.selectedClient]["data"].findIndex(x => x.article === product.name);
      if(index!==-1){
        this.openDialogProduct(this.clients[this.selectedClient]["data"][index],null,this.selectedClient,index);
      }else{
        this.openDialogProduct(null,product,this.selectedClient,null);
      }
    }
  }

  addClient(){
    if(this.clientsControl.value>=1) this.clientsControl.setValue(this.clientsControl.value+1);
    else{
      this.clientsControl.setValue(1);
    }
    this.clients.push(
      {
        total:0,
        data:[]
      }
    )
  }

  deleteClient(i){
    this.clients.splice(i,1);
    this.toastr.success(`Pedido del comensal #${i+1} eliminado satisfactoriamente`);
    this.clientsControl.setValue(this.clients.length);
    if(this.clients.length===0) this.selectedClient = null;
    this.getTotal();
  }

  chargeClients(){
    if(this.clientsControl.value>=1){
      if(this.clients.length!==0){
        this.coolDialogs.confirm('Existen información de comensales ya cargados, ¿Desea sobreescribirlos?',{
          theme: 'material',
          okButtonText: 'Ok',
          cancelButtonText: 'Cancelar',
          title: '¿Desea realizar esta acción?'
        })
        .subscribe(res => {
          if (res) {
            this.clients = [];
            this.total = 0;
            for (let index = 0; index < Math.ceil(this.clientsControl.value); index++) {
              this.clients.push(
                {
                  total:0,
                  data:[]
                }
              )
            }
          }
        });
      }else {
        for (let index = 0; index < Math.ceil(this.clientsControl.value); index++) {
          this.clients.push(
            {
              total:0,
              data:[]
            }
          )
        }
      }
    }else this.toastr.error("Debe ingresar un número válido de comensales");
  }

  // {
  //   "code": null,
  //   "article": null,
  //   "qty": 0,
  //   "plate": 0,
  //   "product": false,
  //   "add": null,
  //   "addValue": 0,
  //   "exclude": null,
  //   "price": 0,
  //   "total_price": 0,
  //   "additionals": null,
  //   "term": null,
  //   "observations": null,
  // }
  verifyEntryValue(evt){
    if (isNaN(evt.data)){ 
      evt.target.value = null;
      this.clientsControl.setValue(null);
    }
  }

  getTotalPriceClient(index){
    let total = 0;
    this.clients[index].data.map((product)=>{
      total += product.total_price;
    })
    this.clients[index].total = total;
    this.getTotal();
  }
  
  getTotal(){
    let total =0;
    this.clients.map((product)=>{
      total += product.total;
    })
    this.total= total;
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
    if(!this.data.form) this.data.form ={}
    this.productCtrl.setValue(data.product);
    this.form = fb.group({
      "code": [data.form.code || null, [Validators.required]],
      "article": [data.form.article || null, [Validators.required]],
      "qty": [data.form.qty || 1, [Validators.required]],
      "plate": [data.form.plate || 0, [Validators.required]],
      "product": [data.form.product || false, [Validators.required]],
      "add": [data.form.add || null , []],
      "addValue": [data.form.addValue  || 0 , []],
      "exclude": [data.form.exclude || null, []],
      "price": [data.form.price || (data.product!==null ? data.product.price : 0) || 0, [Validators.required]],
      "total_price": [data.form.total_price || 0, [Validators.required]],
      "additionals": [data.form.additionals || null, [Validators.required]],
      "term": [data.form.term || null, [Validators.required]],
      "observations": [data.form.observations || null, [Validators.required]],
    });
    if(this.productCtrl.value){
      this.form.patchValue({
        plate: this.productCtrl.value.plate,
        code: this.productCtrl.value.code,
        article: this.productCtrl.value.name,
        price: this.productCtrl.value.price,
        add: [],
        exclude: [],
      });
    }
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