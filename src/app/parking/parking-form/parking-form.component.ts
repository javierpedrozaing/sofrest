import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect, MatTableDataSource } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/services/products.service';
import { HeadquarterService } from 'src/app/services/headquarter.service';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { ParkingService } from 'src/app/services/parking.service';

@Component({
  selector: 'app-parking-form',
  templateUrl: './parking-form.component.html',
  styleUrls: ['./parking-form.component.scss']
})
export class ParkingFormComponent implements OnInit {

  public form: FormGroup;
  public productCtrl: FormControl = new FormControl();
  public productFilterCtrl: FormControl = new FormControl();
  public filteredProducts: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  public productCtrl1: FormControl = new FormControl();
  public productFilterCtrl1: FormControl = new FormControl();
  public filteredProducts1: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect1', { static: true }) singleSelect1: MatSelect;
  public _onDestroy = new Subject<void>();
  dataSource: MatTableDataSource<any>;
  availability = 0;
  public warehouses : any[] = [];
  units = {
    "weight": [
      {
        "name": "Miligramos",
        "unit": "mg",
      },
      {
        "name": "Gramos",
        "unit": "g"
      },
      {
        "name": "Kilogramos",
        "unit": "Kg"
      }
    ],
    "vol": [
      {
        "name": "Mililitros",
        "unit": "ml",
      },
      {
        "name": "Litros",
        "unit": "L"
      },],
    "unit": [{
      name: "Unidad",
      unit: "unit"
    }]
  }

  public products: any[] = [

  ];
  public products1: any[] = [
  ];
  displayedColumns: string[] = ['name', 'qty', 'qty_product','total','options'];
  merma : boolean = false;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public productsService : ProductsService,
    public warehouseService : WarehouseService,
    public parkingService : ParkingService,
  ) {
    this.form = fb.group({
      // description: [null, [Validators.required]],
      // quantity: [null, [Validators.required]],
      // status: [false, [Validators.required]],
      // warehouse_id: [false, [Validators.required]],
      // merma: [null, []],
      quantity : [null, [Validators.required]],
      decrease : [null, [Validators.required]],
      product_id : [null, [Validators.required]],
      warehouse_id : [null, [Validators.required]],
    });
  }

  getProducts() {
    this.productsService.portioningProducts().subscribe(res => {
      if(res.data) this.products =  [].concat(res.data.product_with_portioning_item);
      if(res.data) this.products1 =  [].concat(res.data.product_with_portioning_item);
      this.filterProducts();
      this.filterProducts1();
    }, err => {
      console.log(err);
    });
  }

  getProductionProducts() {
    // this.productsService.getProducts().subscribe(res => {
    //   if(res.data) this.products1 =  [].concat(res.data.products);
    //   this.filterProducts1();
    // }, err => {
    //   console.log(err);
    // });
  }

  compareObjects(o1: any, o2: any) {
    if (o1 === o2) return true;
    else return false
  }
  
  ngOnInit() {
    this.filteredProducts.next(this.products.slice());
    this.productFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterProducts();
      });
    this.filteredProducts1.next(this.products1.slice());
    this.productFilterCtrl1.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterProducts1();
      });
    this.dataSource = new MatTableDataSource([]);
    this.getProducts();
    this.getWarehouses();
    this.getProductionProducts();
  }

  convert(value, unitFrom, unitTo) {
    let factor = 1;
    switch (unitFrom) {
      case 'Kg':
        switch (unitTo) {
          case "mg":
            factor = 1000000;
            break;
          case "g":
            factor = 1000;
            break;
            default:
              factor = 1;
        }
        break;
      case 'mg':
        switch (unitTo) {
          case "Kg":
            factor = (1 / 1000000);
            break;
          case "g":
            factor = 0.001;
            break;
            default:
                factor = 1;
        }
        break;
      case 'g':
        switch (unitTo) {
          case "Kg":
            factor = (1 / 1000);
            break;
          case "mg":
            factor = 1000;
            break;
            default:
                factor = 1;
        }
        break;
      case 'ml':
        switch (unitTo) {
          case "L":
            factor = (1 / 1000);
            break;
            default:
                factor = 1;
        }
        break;
      case 'L':
        switch (unitTo) {
          case "ml":
            factor = 1000;
            break;
            default:
                factor = 1;
        }
        break;
    }
    return value*factor;
  }

  save(data: any) {
    if(this.availability<0)  return this.toastr.error("No tiene disponibilidad");
    data.product_to_parking_parking_detail = this.dataSource.data.map(x =>x.id);
    data.necessary_quantity_parking_detail = this.dataSource.data.map(x =>x.qty);
    data.production_quantity_parking_detail = this.dataSource.data.map(x =>x.qty_product);
    data.total_parking_detail = this.dataSource.data.map(x =>{
      return (!x.qty || !x.qty_product) ? 0 : x.qty * x.qty_product
    });
    this.parkingService.createParking(data).subscribe(response =>{
      this.toastr.success("Operación realizada satisfactoriamente");
      this.form.patchValue({
        quantity : null,
        decrease : null,
        product_id : null,
        warehouse_id : null,
      })
    },
    err=>{
      console.log(err);
    }
    )
  }

  edit(data: any) {

  }

  getWarehouses() {
    this.warehouseService.getWarehouses().subscribe(response => {
      if (response.data) this.warehouses = response.data.warehouses;
    }, err => {
      console.log(err);
    })
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

  public filterProducts1() {
    if (!this.products1) {
      return;
    }
    let search = this.productFilterCtrl1.value;
    if (!search) {
      this.filteredProducts1.next(this.products1.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredProducts.next(
      this.products1.filter(product => product.name.toLowerCase().indexOf(search) > -1)
    );
  }

  verifyQtyProduct(evt) {
    if (!isNaN(evt.data)) {
      if (this.form.value.quantity > this.productCtrl.value.qty) this.form.controls.quantity.setValue(this.productCtrl.value.qty);
      this.calculateAvailability();
    } else this.form.controls.quantity.setValue(0);
  }

  verifyQtyMerma(evt) {
    if (!isNaN(evt.data)) {
      if (this.form.value.decrease > this.availability) this.form.controls.decrease.setValue(this.availability);
    } else this.form.controls.decrease.setValue(0);
  }

  addProduct(evt) {
    if (evt.value) {
      if (!this.dataSource.data.find(x => x.name === evt.value.name)) {
        this.dataSource.data.push(evt.value);
        this.dataSource.data = [].concat(this.dataSource.data);
      } else this.toastr.warning("El articulo ya ha sido seleccionado");
    }
  }

  removeElement(index: number) {
    this.dataSource.data.splice(index, 1);
    this.dataSource.data = [].concat(this.dataSource.data);
    this.calculateAvailability();
  }

  calculateAvailability(){
    let total = 0;
    if(!this.form.value.quantity) return;
    this.dataSource.data.map((element)=>{
      if(element.qty && element.qty_product){
        total += element.qty_product*(element.qty);
      }
    })
    this.availability = this.form.value.quantity - total;
    this.form.controls.decrease.setValue(this.availability < 0 ? 0 : this.availability);
  }

  verifyAvailability(qty,unitFrom, unitTo){
    let amount = this.changeQtyInput
  }
  
  changeQtyInput(evt,i,key){
    if (!isNaN(evt.data)) {
      this.calculateAvailability();
    } else{
      evt.target.value = 0;
      this.dataSource.data[i][key] = 0;
    }
    this.dataSource.data = [].concat(this.dataSource.data);
  }

  enableMerma(value){
    if(value){
      if(this.availability<0) this.toastr.error("No tiene disponibilidad");
      else this.merma = true; 
    }
    else this.merma = false;
  }
}
