import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { MatTableDataSource, MatSelect, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { ReplaySubject, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { AmazingTimePickerService } from 'amazing-time-picker';

@Component({
  selector: 'app-out-stock-form',
  templateUrl: './out-stock-form.component.html',
  styleUrls: ['./out-stock-form.component.scss']
})
export class OutStockFormComponent implements OnInit {

  @Input() outStockID: any;
  public form: FormGroup;
  items: any[] = [{ name: "archie" }, { name: "jake" }, { name: "richard" }];
  dataSource: MatTableDataSource<any>;
  minDate = new Date();

  public categoryCtrl: FormControl = new FormControl();
  public categoryFilterCtrl: FormControl = new FormControl();
  public filteredCategories: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect1', { static: true }) singleSelect1: MatSelect;

  public subCategoryCtrl: FormControl = new FormControl();
  public subCategoryFilterCtrl: FormControl = new FormControl();
  public filteredSubCategories: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect2', { static: true }) singleSelect2: MatSelect;

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

  public products: any[] = [
    {
      "name":"Plato Redondo", "cost": 22, "price": 20, status : true,
    },
    {
      "name":"Pasta Larga", "cost": 18, "price": 15, status : true,
    },
    {
      "name":"Tenedor", "cost": 18, "price": 25, status : true,
    },
  ];
  public productCtrl: FormControl = new FormControl();
  public productFilterCtrl: FormControl = new FormControl();
  public filteredProducts: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  public _onDestroy = new Subject<void>();
  public total = 0;
  public articles : any[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['name', 'price', 'qty', 'options'];

  stores : any = [
    {
      "id" : 1,
      "name" : "Local 1",
    },
    {
      "id" : 1,
      "name" : "Local 2",
    },
  ];

  employees : any = [
    {
      "id" : 1,
      "name" : "Pedro Pérez",
    },
    {
      "id" : 2,
      "name" : "Petra Pérez",
    },
    {
      "id" : 3,
      "name" : "Josefa Pérez",
    },
  ];

  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private atp: AmazingTimePickerService
  ) {
    this.form = fb.group({
      description: [null, [Validators.required]],
      solicitante: [null, [Validators.required]],
      entregado: [null, [Validators.required]],
      entry: [null, [Validators.required]],
      entry_time: [null, [ Validators.required]],
      status: [false, [Validators.required]],
      price: [0,[Validators.required]]
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
      this.dataSource = new MatTableDataSource([]);
  }

  pickStartTime() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
        this.form.controls['entry_time'].setValue(time);
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

  submit(data: any, formDirective: FormGroupDirective) {
    if (this.outStockID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.toastr.clear();
    this.toastr.success('Operación Exitosa');
  }

  edit(data: any) {
    this.toastr.clear();
    this.toastr.success('Operación Exitosa');
  }

  changeValue(value){
    if(value){
      if(value.value){
        let index = this.articles.findIndex(x => x.name === value.value.name);
        if(index!==-1){
          this.articles[index]["qty"]+=1;
        }else{
          this.articles.push(Object.assign({},value.value,{qty:1}));
        }
        this.dataSource.data = this.articles;
      }
    }
    this.getTotal();
  }

  changeQty(index : number, value: number){
    if(this.articles[index]["qty"] >=0){
       this.articles[index]["qty"] = this.articles[index]["qty"] + (value ===-1 && this.articles[index]["qty"]===0 ? 0 : value );
    }
    else this.articles[index]["qty"] = 0;
    this.getTotal();
  }

  removeElement(index:number){
    this.articles.splice(index,1);
    this.dataSource.data = this.articles;
    this.getTotal();
  }

  getTotal(){
    let total = 0;
    this.articles.forEach((article)=>{
      total += article.qty;
    })
    this.total= total;
  }

}
