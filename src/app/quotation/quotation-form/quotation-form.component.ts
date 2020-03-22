import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroupDirective, Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatTableDataSource, MatSelect } from '@angular/material';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quotation-form',
  templateUrl: './quotation-form.component.html',
  styleUrls: ['./quotation-form.component.scss']
})
export class QuotationFormComponent implements OnInit {

  @Input() quotationID: any;
  public form: FormGroup;
  minDate = new Date();
  dataSource: MatTableDataSource<any>;
  public articles : any[] = [];
  public cant : string = "Si";
  public currencies: any =
  [
    {
      id: 1,
      name: "Soles"
    },
    {
      id: 2,
      name: "USD"
    }
  ]
  public products: any[] = [
    {
      "name":"Producto 1", "cost": 22, "price": 20, status : true,
    },
    {
      "name":"Producto 2", "cost": 18, "price": 15, status : true,
    },
    {
      "name":"Producto 3", "cost": 18, "price": 25, status : true,
    },
  ];
  displayedColumns: string[] = ['name', 'availability','qty','price','options'];
  employees: any = [
    {
      "id": 1,
      "name": "Pedro Pérez",
    },
    {
      "id": 2,
      "name": "Petra Pérez",
    },
    {
      "id": 3,
      "name": "Josefa Pérez",
    },
  ];
  public isMobile: boolean;
  subscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
  ) {
    this.isMobile = this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
    this.form = fb.group({
      correlative: {value: "COP4508", disabled: true},
      serial_number: {value: "25987", disabled: true},
      client: [null, [Validators.required]],
      date: [null, [Validators.required]],
      observation: [null, [Validators.required]],
      entry :[new Date(),[Validators.required]]
    });
  }

  ngOnInit() {
    this.filteredProducts.next(this.products.slice());
    this.productFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterProducts();
      });
      this.dataSource = new MatTableDataSource([]);
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if (this.quotationID) this.edit(data);
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
    /* if(this.cant<=0 || isNaN(this.cant)) this.toastr.error("Cantidad Inválida");
    if(value){
      let index = this.articles.findIndex(x => x.name === value.name);
      if(index!==-1){
        this.articles[index]["availability"]+=this.cant;
      }else{ */
        this.articles.push(Object.assign({},value,{availability:this.cant,qty:1}));
        // this.articles.push(value);
      //}
      this.dataSource.data = this.articles;
      this.cant=null;
      /*
      this.cant = 1;
      this.productCtrl.setValue(null);
    }else this.toastr.error("Debe especificar un producto"); */
  }

  public productCtrl: FormControl = new FormControl();
  public productFilterCtrl: FormControl = new FormControl();
  public filteredProducts: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  public _onDestroy = new Subject<void>();

  changeQty(index : number, value: number){
    if(this.articles[index]["availability"] >=0){
       this.articles[index]["availability"] = this.articles[index]["availability"] + (value ===-1 && this.articles[index]["availability"]===0 ? 0 : value );
    }
    else this.articles[index]["availability"] = 0;
  }

  removeElement(index:number){
    this.articles.splice(index,1);
    this.dataSource.data = this.articles;
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
}
