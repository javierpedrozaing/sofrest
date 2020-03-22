import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as _moment from 'moment';
import { DialogFormPaymentMethod } from 'src/app/payment-method/payment-method-list/payment-method-list.component';
import { DialogFormPaymentWay } from 'src/app/payment-way/payment-way-list/payment-way-list.component';
import { ClientsForm } from 'src/app/clients/clients/clients.component';
import { DialogFormSaleType } from 'src/app/sale-type/sale-type-list/sale-type-list.component';
import { Subject } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';

const moment =  _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
  styleUrls: ['./sales-form.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class SalesFormComponent implements OnInit {

  @Input() orderID: any;
  public Sales: FormGroup;
  searchTerm$ = new Subject<string>();
  // date = new FormControl();
  public productList : any = [
    
  ];

  public productListStock : any = [];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public product : ScreenMobileChangeService
  ) {
    this.Sales = fb.group({
      type_document: [null, [ Validators.required]],
      serie: [null, [ Validators.required]],
      correlative: [null, [ Validators.required]],
      fec_create: [moment(), [ Validators.required]],
      client: [null, [ Validators.required]],
      type_sale: [null, [ Validators.required]],
      payment_method: [null, [ Validators.required]],
      way_to_pay: [null, [ Validators.required]],
      searchText: [null, [ Validators.required]],

    });

    this.product.search(this.searchTerm$).subscribe(res =>{
      this.productListStock = res;
    })
  }

  ngOnInit() {
  }

  addProductList(item){
    this.productList.push(item);
    this.productListStock = [];
  }

  deleteProductList(idx){
    this.productList.splice(idx,1);
  }

  addCantidad(idx){
    this.productList[idx].cant = this.productList[idx].cant + 1;
    this.productList[idx].price =  this.productList[idx].price * this.productList[idx].cant;
  }

  removeCantidad(idx){
    this.productList[idx].cant = this.productList[idx].cant - 1;
    this.productList[idx].price =  this.productList[idx].price * this.productList[idx].cant;
  }

  subTotal(){
    let aux : number = 0;
    this.productList.map( item => {
      aux = aux + item.price;
    })

    return {subtotal : aux, total : (aux + (aux * 0.05) )};
  }

  save(data: any) {

  }

  edit(data: any) {

  }

  Payment(): void {
    const dialogRef = this.dialog.open(DialogFormPaymentMethod, {
      width: '50vw',
      panelClass: 'config-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  AddClient(): void {
    const dialogRef = this.dialog.open(ClientsForm, {
      width: '50vw',
      panelClass: 'config-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  PayWay(): void {
    const dialogRef = this.dialog.open(DialogFormPaymentWay, {
      width: '50vw',
      panelClass: 'config-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  SaleType(): void {
    const dialogRef = this.dialog.open(DialogFormSaleType, {
      width: '50vw',
      panelClass: 'config-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  applyFilter(value){
    console.log(value)
  }

}


@Component({
  selector: 'sales-new-client',
  templateUrl: 'sales-new-client.html',
  styles : []
})
export class SalesNewClient {

  constructor(
    public dialogRef: MatDialogRef<SalesNewClient>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
