import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ClientsFormOrder } from '../payment-order/payment-order.component';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Location} from '@angular/common';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-payment-order-form',
  templateUrl: './payment-order-form.component.html',
  styleUrls: ['./payment-order-form.component.scss']
})
export class PaymentOrderFormComponent implements OnInit {
  @Input() ordersID: any;
  @Input() total: any;

  tiles: Tile[] = [
    {text: '7', cols: 1, rows: 1, color: 'lightblue'},
    {text: '8', cols: 1, rows: 1, color: 'lightblue'},
    {text: '9', cols: 1, rows: 1, color: 'lightblue'},
    {text: '4', cols: 1, rows: 1, color: 'lightblue'},
    {text: '5', cols: 1, rows: 1, color: 'lightblue'},
    {text: '6', cols: 1, rows: 1, color: 'lightblue'},
    {text: '1', cols: 1, rows: 1, color: 'lightblue'},
    {text: '2', cols: 1, rows: 1, color: 'lightblue'},
    {text: '3', cols: 1, rows: 1, color: 'lightblue'},
    {text: '0', cols: 2, rows: 1, color: 'lightblue'},
    {text: '.', cols: 1, rows: 1, color: 'lightblue'},
  ];

  faCreditCard = faCreditCard;
  billingFormGroup: FormGroup;
  cardFormGroup: FormGroup;
  discountFormGroup: FormGroup;
  card_type: any;
  payments : any = [
    {amount : 0, type : null}
  ];
  discount : boolean = false;
  constructor(
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private toastr: ToastrService,
    private _location: Location
  ) {
      if((!this.total && !this.router.getCurrentNavigation().extras.state) || (!this.ordersID && !this.router.getCurrentNavigation().extras.state))  this.router.navigateByUrl('/orders/payment');
      if(!this.total && this.router.getCurrentNavigation().extras.state.total) this.total = this.router.getCurrentNavigation().extras.state.total;
      if(!this.ordersID && this.router.getCurrentNavigation().extras.state.orders) this.ordersID = this.router.getCurrentNavigation().extras.state.orders;
      this.billingFormGroup = this._formBuilder.group({
        name: [{value:null,disabled: true}, Validators.required],
        document_type: [null, Validators.required],
        dni: [null, Validators.required],
      });
      this.cardFormGroup = this._formBuilder.group({
        card_number: ['', Validators.required],
        cardholder_name: ['', Validators.required],
        expire_date: ['', Validators.required],
        cvv: ['', Validators.required]
      });
      this.discountFormGroup = this._formBuilder.group({
        discount_type: [null],
        motive: [null, Validators.required],
        discount_amount: [0, Validators.required],
      });
    }

    backClicked() {
      this._location.back();
    }

    ngOnInit(){

    }

    search(){
      this.openDialog();
    }

    getRest(indexPayment : number){
      let actual = 0;
      for (let index = 0; index < this.payments.length; index++) {
        if(index!=indexPayment) actual+= this.payments[index]["amount"];
      }
      if(actual>=this.total){
        this.payments[indexPayment]["amount"] = 0;
      }
      else this.payments[indexPayment]["amount"] = this.total - actual;
    }

    setKey(value) {
      console.log(value)
      this.payments[this.payments.length-1].amount = parseFloat(this.payments[this.payments.length-1].amount+value);
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(ClientsFormOrder, {
        maxWidth : '100vw',
        minWidth: '60vw',
        data: {
          dni : this.billingFormGroup.value.dni,
        }
      });

      dialogRef.afterClosed().subscribe(result => {
      });
    }

    addPaymentMethod(){
      let actual = 0;
      for (let index = 0; index < this.payments.length; index++) {
        actual+= this.payments[index]["amount"];
      }
      if(actual < this.total) this.payments.push( {amount : 0, type : null});
      else this.toastr.error('Ya ha alcanzado el total del monto');
    }

    removePaymentMethod(index:number){
      this.payments.splice(index,1);
    }

    execPayment(){
      this.verifyAmount();
    }

    verifyAmount(){
      this.toastr.clear();
      let actual = 0;
      for (let index = 0; index < this.payments.length; index++) {
        actual+= this.payments[index]["amount"];
      }
      if(actual > this.total) this.toastr.warning('Los montos indicados superan al total');
      else if(actual < this.total) this.toastr.warning('Los montos indicados son inferiores al total');
      else return true;
      return false;
    }

    GetCardType(number) {
      number = number.toString();
      // visa
      var re = new RegExp("^4");
      if (number.match(re) != null)
        this.card_type = {type:"Visa", value: "visa", img: "https://img.icons8.com/officel/2x/visa.png"};

      // Mastercard
      // Updated for Mastercard 2017 BINs expansion
      if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
        this.card_type = {type:"MasterCard", value: "mastercard", img: "https://img.icons8.com/color/452/mastercard.png"};

      // AMEX
      re = new RegExp("^3[47]");
      if (number.match(re) != null)
      this.card_type = {type:"American Express", value: "amex", img: "https://img.icons8.com/cotton/2x/amex.png"};

      // Discover
      re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
      if (number.match(re) != null)
      this.card_type = {type:"Discover", value: "discover", img: "https://img.icons8.com/cotton/2x/discover.png"};

      // Diners
      re = new RegExp("^36");
      if (number.match(re) != null)
      this.card_type = {type:"Diners", value: "diners", img: "https://img.icons8.com/offices/452/diners-club.png"};

      // Diners - Carte Blanche
      re = new RegExp("^30[0-5]");
      if (number.match(re) != null)
      this.card_type = {type:"Diners Carte Blanche", value: "dinerscb", img: "https://img.icons8.com/offices/452/diners-club.png"};

      // JCB
      re = new RegExp("^35(2[89]|[3-8][0-9])");
      if (number.match(re) != null)
      this.card_type = {type:"JCB", value: "jcb", img: "https://img.icons8.com/cotton/2x/jcb.png"};

      // Visa Electron
      re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
      if (number.match(re) != null)
      this.card_type = {type:"Visa Electron", value: "visae", img: "http://www.iconarchive.com/download/i86737/uiconstock/e-commerce/visa-electron.ico"};

      return "";
    }

}
