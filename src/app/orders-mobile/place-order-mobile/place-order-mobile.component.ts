import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-place-order-mobile',
  templateUrl: './place-order-mobile.component.html',
  styleUrls: ['./place-order-mobile.component.scss']
})
export class PlaceOrderMobileComponent implements OnInit {

  isLinear = false;
  card_type: any;
  document_types = [
    { name: "Boleta", value: 1 }
  ]
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder
  ) { }

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

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      document_type: ['', Validators.required],
      document_number: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      cardholder_name: ['', Validators.required],
      card_number: ['', Validators.required],
      expire_date: ['', Validators.required],
      card_cvv: ['', Validators.required],
      card_address: ['', Validators.required]
    });
  }

}
