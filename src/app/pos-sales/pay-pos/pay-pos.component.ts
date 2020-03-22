import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface posSales {
  table: string;
  order: string;
  owner: string;
  total: number;
}

const ELEMENT_DATA: posSales[] = [
  {table: "Mesa 1", order: 'Lomito Salteado', owner: 'Mozo 1', total: 45},
  {table: "Mesa 2", order: 'Pastel de Papas', owner: 'Mozo 2', total: 45},
  {table: "Mesa 3", order: 'Alitas', owner: 'Mozo 3', total: 45},
  {table: "Mesa 4", order: 'Pasticho', owner: 'Mozo 3', total: 45},
  {table: "Mesa 5", order: 'Ceviche', owner: 'Mozo 4', total: 45}
];

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-pay-pos',
  templateUrl: './pay-pos.component.html',
  styleUrls: ['./pay-pos.component.scss']
})
export class PayPosComponent implements OnInit {

  displayedColumns: string[] = ['table', 'order', 'owner', 'total', 'option'];
  dataSource = new MatTableDataSource<posSales>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  tiles: Tile[] = [
    {text: '1', cols: 3, rows: 1, color: 'lightblue'}
  ];

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(PayPosDialog, {
      width: '80vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}
@Component({
  selector: 'pay-pos-dialog',
  templateUrl: 'pay-pos-dialog.html',
})
export class PayPosDialog {

  faCreditCard = faCreditCard;
  clientFormGroup: FormGroup;
  payFormGroup: FormGroup;
  paymentTypes = [{amount: 0, payment_type: ''}];
  billingFormGroup: FormGroup;
  cardFormGroup: FormGroup;
  card_type: any;
  cardEnable = false;
  foodType: any;
  availablesTables: any;
  selectedCurrency = "soles";
  activeSearch = false;

  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PayPosDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.payFormGroup = this._formBuilder.group({
        amount: ['', Validators.required],
        payment_type: ['', Validators.required]
      });
      this.clientFormGroup = this._formBuilder.group({
        client: ['', Validators.required]
      });
      this.billingFormGroup = this._formBuilder.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        zip: ['', Validators.required],
        country: ['', Validators.required]
      });
      this.cardFormGroup = this._formBuilder.group({
        card_number: ['', Validators.required],
        cardholder_name: ['', Validators.required],
        expire_date: ['', Validators.required],
        cvv: ['', Validators.required]
      });
    }

    addPayment() {
      this.paymentTypes.push({amount: 0, payment_type: ''});
    }

    enableCard(type: any) {
      if(type === 'tdc') {
        this.cardEnable = true;
      }
    }

    openClientDialog(): void {
      const dialogRef = this.dialog.open(CustomerDialog, {
        width: '80vw',
        data: {}
      });

      dialogRef.afterClosed().subscribe(result => {
      });
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

    onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'client-dialog',
  templateUrl: 'client-dialog.html',
})
export class CustomerDialog {

  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PayPosDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
    this.dialogRef.close();
  }

}
