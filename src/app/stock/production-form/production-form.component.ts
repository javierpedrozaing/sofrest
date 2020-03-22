import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArrayName } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-production-form',
  templateUrl: './production-form.component.html',
  styleUrls: ['./production-form.component.scss']
})
export class ProductionFormComponent implements OnInit {

  @Input() productionID: any;
  
  public form: FormGroup;
  stores: any = [
    {
      "id": 1,
      "name": "Local 1",
    },
    {
      "id": 1,
      "name": "Local 2",
    },
  ];
  public articles = [];

  public products: any[] = [
    {
      "name": "Papas", "cost": 22, "price": 20, status: true,
    },
    {
      "name": "Tomates", "cost": 18, "price": 15, status: true,
    },
{    "name": "Pollo", "cost": 22, "price": 20, status: true, },
{"name": "Cebolla", "cost": 18, "price": 15, status: true,},
{"name": "Salsas", "cost": 18, "price": 25, status: true,},
{"name": "Pasta","cost": 22, "price": 20, status: true,},
{"name": "Ají Dulce", "cost": 18, "price": 15, status: true,},
{"name": "Queso", "cost": 18, "price": 25, status: true,},
  ];

  public categories : any = [
    { 
      name: "Pollo Dulce",
      products: [
        {
          product :{ "name": "Pollo", "cost": 22, "price": 20, status: true, },
          "qty":1,
        },
        {
          product : {"name": "Cebolla", "cost": 18, "price": 15, status: true,},
          "qty":5,
        },
        {
          product : { "name": "Salsas", "cost": 18, "price": 25, status: true, },
          "qty":1,
        },
      ]
  },
  { 
    name: "Lasagna",
    products: [
      {
        "product" : {"name": "Pasta","cost": 22, "price": 20, status: true,},
        "qty":1, 
      },
      {
        product : {"name": "Ají Dulce", "cost": 18, "price": 15, status: true,},
        "qty":1,
      },
      {
        product : { "name": "Queso", "cost": 18, "price": 25, status: true,},
        "qty":2,
      }
    ]
},
  ]

  listOptions: any = [
    { product: null, qty: 0 }
  ]

  total = 0;

  public productCtrl: FormControl = new FormControl();
  public productFilterCtrl: FormControl = new FormControl();
  public filteredProducts: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  public _onDestroy = new Subject<void>();

  public categoryCtrl: FormControl = new FormControl();
  public categoryFilterCtrl: FormControl = new FormControl();
  public filteredCategories: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect1', { static: true }) singleSelect1: MatSelect;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.form = fb.group({
      production: [null, [Validators.required]],
      shop: [null, [Validators.required]],
      description: [null, [Validators.required]],
      product : this.fb.array([this.createItem()]),
      amount : [0,[Validators.required]],
      qty : [0,[Validators.required]],
    });
  }


  createItem(): FormGroup {
    return this.fb.group({
      product: null,
      qty: 0,
    });
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
  changeValueCategory(value){
    this.listOptions = value.products.concat(this.listOptions);
    console.log(this.listOptions);
  }

  ngOnInit() {
    this.filteredProducts.next(this.products.slice());
    this.productFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterProducts();
      });
      this.categoryFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCategories();
      });
    this.filteredCategories.next(this.categories.slice());
  }

  addOption() {
    this.listOptions.push({ product: null, qty: 0 });
    this.getTotal();
  }

  deleteOption(index: number) {
    this.listOptions.splice(index, 1);
    this.getTotal();
  }

  getTotal() {
    let total = 0;
    console.log(this.listOptions);
    this.listOptions.forEach((product) => {
      total += product.product.price * product.qty;
    })
    this.total = total;
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

  save(data){

  }

  edit(data){
    
  }

  compareObjects(o1: any, o2: any) {
    console.log(o1,o2);
    if(o1.name === o2.name) return true;
    else return false
  }

}
