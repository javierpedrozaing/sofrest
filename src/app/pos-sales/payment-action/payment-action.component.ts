import { Component, OnInit, Input, Inject } from '@angular/core';
import { formatNumber } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { CustomerDialog } from '../pay-pos/pay-pos.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthFormDialogComponent } from 'src/app/auth/auth-form-dialog/auth-form-dialog.component';
import { CustomerService } from 'src/app/services/customer.service';
import { CoinService } from 'src/app/services/coin.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { SalesService } from 'src/app/services/Sales/sales.service';
import { PaymentMethodService } from 'src/app/services/payment-method.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { NotifyService } from 'src/app/services/notify.service';
import { DiscountService } from 'src/app/services/discount.service';

@Component({
  selector: 'app-payment-action',
  templateUrl: './payment-action.component.html',
  styleUrls: ['./payment-action.component.scss']
})
export class PaymentActionComponent implements OnInit {
  @Input() activePay;
  @Input() activeAdmPay;
  @Input() items: any = [];
  paymentsMethods: any[] = [];
  discount : any = null;
  faCreditCard = faCreditCard;
  clientFormGroup: FormGroup;
  payFormGroup: FormGroup;
  paymentTypes = [{ amount: 0, payment_type: '' }];
  billingFormGroup: FormGroup;
  cardFormGroup: FormGroup;
  card_type: any;
  cardEnable = false;
  foodType: any;
  customers: any;
  filteredOptions: Observable<string[]>;
  coins: any;
  availablesTables: any;
  selectedCurrency = "soles";
  activeSearch = false;
  enableDiscount = false;
  discounts: any[] = [{
    discount_id : null,
    motive: null,
  }];
  document_type: any;
  clientData: any;
  discountsData: any[] = [];
  clientDiscountAuthorized : any = null;
  ngOnInit() {
    this.getCustomers();
    this.getCoins();
    this.getDiscounts();
  }


  constructor(
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private customerService: CustomerService,
    private coinService: CoinService,
    private salesService: SalesService,
    private toastr: ToastrService,
    private discountService: DiscountService,
  ) {
    this.clientFormGroup = this._formBuilder.group({
      customer_id: [null, Validators.required],
      tip: [null],
      operation_type_id: [null, Validators.required],
      coin_id: [null, Validators.required],
      total: [null, Validators.required],
      subtotal: [null, Validators.required],
      igv: [null],
      reference: [null, Validators.required],
      observation: [null],
      administrative_payment: [null, Validators.required],
      total_discount: [null],
      ticket_number: [null, Validators.required],
      exchange_rate: [null, Validators.required],
      unaffected: [0],
      exonerated: [0],
      serial_number: [null],
      voucher_type_id: [null, Validators.required],
    });
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  paySale() {
    // quantity_sale_detail
    // subtotal_sale_detail
    // total_sale_detail
    // unit_price_sale_detail
    // dish_id_sale_detail
    // amount_sale_discount
    //authorized_by_sale_discount
    //discount_id_sale_discount

    // amount_sale_payment
    // payment_method_id_sale_payment
    // coin_id_sale_payment

    // product_id_sale_product
    // quantity_sale_product
    // subtotal_sale_product
    // total_sale_product
    // unit_price_sale_product
    // igv_sale_product
    // percentage_sale_product
    this.clientFormGroup.value.product_id_sale_product = [];
    this.clientFormGroup.value.quantity_sale_product = [];
    this.clientFormGroup.value.subtotal_sale_product = [];
    this.clientFormGroup.value.total_sale_product = [];
    this.clientFormGroup.value.unit_price_sale_product = [];
    this.clientFormGroup.value.igv_sale_product = [];
    this.clientFormGroup.value.percentage_sale_product = [];
    this.items.map(x => {
      this.clientFormGroup.value.product_id_sale_product.push(x.id);
      this.clientFormGroup.value.quantity_sale_product.push(x.qty);
      this.clientFormGroup.value.subtotal_sale_product.push(x.price * x.qty);
      this.clientFormGroup.value.total_sale_product.push((x.price * x.qty) * 1.18);
      this.clientFormGroup.value.unit_price_sale_product.push(x.price);
      this.clientFormGroup.value.igv_sale_product.push((x.price * x.qty) * 0.18);
      this.clientFormGroup.value.percentage_sale_product.push(0);
    })
    this.clientFormGroup.value.customer_id = this.clientFormGroup.value.customer_id.id;
    this.clientFormGroup.value.date_send_sunat = this.formatDate(new Date());
    this.clientFormGroup.value.subtotal = this.getSubTotalCost();
    this.clientFormGroup.value.igv = (this.getSubTotalCost() * 18) / 100;
    this.clientFormGroup.value.total = ((this.getSubTotalCost() * 1.18) + (this.clientFormGroup.value.tip ? this.clientFormGroup.value.tip : 0));
    const dialogRef = this.dialog.open(PaymentMethodClient, {
      width: '60vw',
      data: this.clientFormGroup.value
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //Hacer un evento
      }
    });

  }

  addDiscountData() {
    this.discounts.push({
      discount_id : null,
      motive: null,
    });
  }

  getDiscounts(){
    this.discountService.getDiscounts().subscribe((res)=>{
      if(res.data){
        this.discountsData = res.data.discount;
      }
    },
    err=>{
      console.log(err);
    })
  }

  removeDiscount(index) {
    this.discounts.splice(index, 1);
  }

  getOptionText(option) {
    if (option) return option.name;
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(response => {
      if(response.data) this.customers = response.data.customers;
      this.filteredOptions = this.clientFormGroup.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    });
  }

  getCoins() {
    this.coinService.getCoins().subscribe(response => {
      if(response.data) this.coins = response.data.coins;
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.customers.filter(option => option.document.toLowerCase().includes(filterValue));
  }

  addPayment() {
    this.paymentTypes.push({ amount: 0, payment_type: '' });
  }

  enableCard(type: any) {
    if (type === 'tdc') {
      this.cardEnable = true;
    }
  }

  addDiscount() {
    const dialogRef = this.dialog.open(AuthFormDialogComponent, {
      width: '40vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.enableDiscount = true;
      }
    });
  }

  openClientDialog(): void {
    const dialogRef = this.dialog.open(CustomerDialog, {
      width: '80vw',
      panelClass: 'config-modal',
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
      this.card_type = { type: "Visa", value: "visa", img: "https://img.icons8.com/officel/2x/visa.png" };

    // Mastercard
    // Updated for Mastercard 2017 BINs expansion
    if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
      this.card_type = { type: "MasterCard", value: "mastercard", img: "https://img.icons8.com/color/452/mastercard.png" };

    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null)
      this.card_type = { type: "American Express", value: "amex", img: "https://img.icons8.com/cotton/2x/amex.png" };

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null)
      this.card_type = { type: "Discover", value: "discover", img: "https://img.icons8.com/cotton/2x/discover.png" };

    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null)
      this.card_type = { type: "Diners", value: "diners", img: "https://img.icons8.com/offices/452/diners-club.png" };

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null)
      this.card_type = { type: "Diners Carte Blanche", value: "dinerscb", img: "https://img.icons8.com/offices/452/diners-club.png" };

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null)
      this.card_type = { type: "JCB", value: "jcb", img: "https://img.icons8.com/cotton/2x/jcb.png" };

    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null)
      this.card_type = { type: "Visa Electron", value: "visae", img: "http://www.iconarchive.com/download/i86737/uiconstock/e-commerce/visa-electron.ico" };

    return "";
  }

  getSubTotalCost() {
    return this.items.map(t => t.price * t.qty).reduce((acc, value) => acc + value, 0);
  }

  verifyEntryValue(evt) {
    if (isNaN(evt.data)) {
      evt.target.value = null;
      this.clientFormGroup.patchValue({
        tip: null
      })
    }
  }

}

@Component({
  selector: 'payment-methods-client',
  templateUrl: 'payment-methods-client.html',
})
export class PaymentMethodClient implements OnInit {

  public paymentMethods: any[] = [];
  public coins: any[] = [];
  faCreditCard = faCreditCard;
  billingFormGroup: FormGroup;
  cardFormGroup: FormGroup;
  discountFormGroup: FormGroup;
  card_type: any;
  payments: any = [
    { amount: 0, type: null }
  ];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PaymentMethodClient>,
    public paymentMethodService: PaymentMethodService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private salesService: SalesService,
    private coinService: CoinService,
    private notifyService: NotifyService,
  ) {
    this.billingFormGroup = this.fb.group({
      name: [{ value: null, disabled: true }, Validators.required],
      document_type: [null, Validators.required],
      dni: [null, Validators.required],
    });
    this.cardFormGroup = this.fb.group({
      card_number: ['', Validators.required],
      cardholder_name: ['', Validators.required],
      expire_date: ['', Validators.required],
      cvv: ['', Validators.required]
    });
    this.discountFormGroup = this.fb.group({
      discount_type: [null],
      motive: [null, Validators.required],
      discount_amount: [0, Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.getPaymentMethods();
    this.getCoins();
  }

  getPaymentMethods() {
    this.paymentMethodService.getPaymentMethods().subscribe(res => {
      if(res.data) this.paymentMethods = [].concat(res.data.payment_methods);
    }, err => {
      console.log(err);
    });
  }

  submit() {
    this.data.amount_sale_payment = [];
    this.data.payment_method_id_sale_payment = [];
    this.data.coin_id_sale_payment = [];
    if (this.payments.length === 0) return this.toastr.warning("Debe seleccionar uno o mas métodos de pago");
    let acumulate = 0;
    for (let index = 0; index < this.payments.length; index++) {
      if (!this.payments[index]["coin_id"] || !this.payments[index]["id"] || !this.payments[index]["amount"]) return this.toastr.error("Existe información no válida");
      acumulate += this.payments[index]["amount"]
    }
    if( parseFloat((this.data.total).toFixed(2)) !== parseFloat((acumulate).toFixed(2))) return this.toastr.warning("Los montos a pagar no coinciden con el total")
    this.payments.map(x => {
      this.data.amount_sale_payment.push(x.amount);
      this.data.payment_method_id_sale_payment.push(x.id);
      this.data.coin_id_sale_payment.push(x.coin_id);
    })
    this.salesService.createSale(this.data).subscribe(response => {
      this.toastr.success("Operación Realizada Correctamente");
      this.notifyService.notifyPayment(true);
      this.dialogRef.close(response);
    }, err => {
      console.log(err);
    })
  }

  getRest(indexPayment: number) {
    let actual = 0;
    for (let index = 0; index < this.payments.length; index++) {
      if (index != indexPayment) actual += this.payments[index]["amount"];
    }
    if (actual >= this.data.total) {
      this.payments[indexPayment]["amount"] = 0;
    }
    else this.payments[indexPayment]["amount"] = parseFloat((this.data.total - actual).toFixed(2));
  }

  setKey(value) {
    this.payments[this.payments.length - 1].amount = parseFloat(this.payments[this.payments.length - 1].amount + value);
  }

  openDialog(): void {
    // const dialogRef = this.dialog.open(ClientsFormOrder, {
    //   maxWidth : '100vw',
    //   minWidth: '60vw',
    //   data: {
    //     dni : this.billingFormGroup.value.dni,
    //   }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    // });
  }

  addPaymentMethod() {
    let actual = 0;
    for (let index = 0; index < this.payments.length; index++) {
      actual += this.payments[index]["amount"];
    }
    if (actual < this.data.total) this.payments.push({ amount: 0, type: null });
    else this.toastr.error('Ya ha alcanzado el total del monto');
  }

  execPayment() {
    this.verifyAmount();
  }

  verifyAmount() {
    this.toastr.clear();
    let actual = 0;
    for (let index = 0; index < this.payments.length; index++) {
      actual += this.payments[index]["amount"];
    }
    if (actual > this.data.total) this.toastr.warning('Los montos indicados superan al total');
    else if (actual < this.data.total) this.toastr.warning('Los montos indicados son inferiores al total');
    else return true;
    return false;
  }

  GetCardType(number) {
    number = number.toString();
    // visa
    var re = new RegExp("^4");
    if (number.match(re) != null)
      this.card_type = { type: "Visa", value: "visa", img: "https://img.icons8.com/officel/2x/visa.png" };

    // Mastercard
    // Updated for Mastercard 2017 BINs expansion
    if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
      this.card_type = { type: "MasterCard", value: "mastercard", img: "https://img.icons8.com/color/452/mastercard.png" };

    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null)
      this.card_type = { type: "American Express", value: "amex", img: "https://img.icons8.com/cotton/2x/amex.png" };

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null)
      this.card_type = { type: "Discover", value: "discover", img: "https://img.icons8.com/cotton/2x/discover.png" };

    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null)
      this.card_type = { type: "Diners", value: "diners", img: "https://img.icons8.com/offices/452/diners-club.png" };

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null)
      this.card_type = { type: "Diners Carte Blanche", value: "dinerscb", img: "https://img.icons8.com/offices/452/diners-club.png" };

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null)
      this.card_type = { type: "JCB", value: "jcb", img: "https://img.icons8.com/cotton/2x/jcb.png" };

    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null)
      this.card_type = { type: "Visa Electron", value: "visae", img: "http://www.iconarchive.com/download/i86737/uiconstock/e-commerce/visa-electron.ico" };

    return "";
  }

  getCoins() {
    this.coinService.getCoins().subscribe(response => {
      if(response.data) this.coins = response.data.coins;
    });
  }

}