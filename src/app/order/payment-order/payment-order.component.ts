import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

export interface posSales {
  checked: boolean;
  order: string;
  owner: string;
  total: number;
}

const ELEMENT_DATA: posSales[] = [
  {checked: false, order: 'Lomito Salteado', owner: 'Mozo 1', total: 45},
  {checked: false, order: 'Pastel de Papas', owner: 'Mozo 2', total: 45},
  {checked: false, order: 'Alitas', owner: 'Mozo 3', total: 45},
  {checked: false, order: 'Pasticho', owner: 'Mozo 3', total: 45},
  {checked: false, order: 'Ceviche', owner: 'Mozo 4', total: 45}
];

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-payment-order',
  templateUrl: './payment-order.component.html',
  styleUrls: ['./payment-order.component.scss']
})
export class PaymentOrderComponent implements OnInit {


  displayedColumns: string[] = ['order', 'owner', 'total', 'option'];
  dataSource = new MatTableDataSource<posSales>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

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

  constructor(public dialog: MatDialog,private router : Router) { }

  openDialog(): void {
    this.router.navigateByUrl('/orders/payment/method', { state: { total:1000 , orders: 1 } });
    // const dialogRef = this.dialog.open(PayPosOrderDialog, {
    //   maxWidth : '100vw',
    //   minWidth: '95vw',
    //   data: {
    //     total : 121
    //   }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    // });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  checkedElement(value: boolean, index : number){
    this.dataSource.data[index]["checked"] = value;
  }

}

@Component({
  selector: 'pay-pos-dialog-order',
  templateUrl: 'pay-pos-dialog-order.html',
})
export class PayPosOrderDialog {

  faCreditCard = faCreditCard;
  billingFormGroup: FormGroup;
  cardFormGroup: FormGroup;
  card_type: any;
  total : number = 0;
  constructor(
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PayPosOrderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.total = this.data.total;
      this.billingFormGroup = this._formBuilder.group({
        name: [null, Validators.required],
        document_type: [null, Validators.required],
        dni: [null, Validators.required],
      });
      this.cardFormGroup = this._formBuilder.group({
        card_number: ['', Validators.required],
        cardholder_name: ['', Validators.required],
        expire_date: ['', Validators.required],
        cvv: ['', Validators.required]
      });
    }

    search(){
      this.openDialog();
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
  selector: 'clients-form-order',
  templateUrl: 'new-client.html',
  styles : []
})
export class ClientsFormOrder {
  public dni;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ClientsFormOrder>
    ) {
      this.dni = this.data.dni;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
