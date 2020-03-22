import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Inject, Input } from '@angular/core';
import { MatTableDataSource, MatSelect } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { element } from 'protractor';
import { PayPosDialog, CustomerDialog } from '../pay-pos/pay-pos.component';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from 'src/app/services/products.service';
import { CategoryService } from 'src/app/services/category.service';
import { NotifyService } from 'src/app/services/notify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { OrdersTypeService } from 'src/app/services/orders-type.service';
import { variable } from '@angular/compiler/src/output/output_ast';
import { SalesService } from 'src/app/services/Sales/sales.service';
import { DiscountService } from 'src/app/services/discount.service';
import { AuthFormDialogComponent } from 'src/app/auth/auth-form-dialog/auth-form-dialog.component';
import { PaymentMethodService } from 'src/app/services/payment-method.service';
import { BoxService } from 'src/app/services/box.service';

export interface Product {
  name: string;
  price: number,
  pic: string,
  type: string;
}

export interface ArticlesSelected {
  product: string;
  price: number;
  qty: number;
}

const ELEMENT_DATA: ArticlesSelected[] = [];

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  hideSpecialPay = false;

  productsList: any[] = [];
  cashPaymentList: any[] = [];
  debitPaymentList: any[] = [];
  creditPaymentList: any[] = [];
  orderTypePayment: any = null;
  paymentsDebit : any[] = [
        {
      amount : null,
      reference: null,
      additional : null,
    },
    {
      amount : null,
      reference: null,
      additional : null,
    },
    {
      amount : null,
      reference: null,
      additional : null,
    },
  ];
  paymentsCredit : any[] = [
        {
      amount : null,
      reference: null,
      additional : null,
    },
    {
      amount : null,
      reference: null,
      additional : null,
    },
    {
      amount : null,
      reference: null,
      additional : null,
    },
  ];
  paymentsCash : any[] = [
        {
      amount : null,
      reference: null,
      additional : null,
    },
    {
      amount : null,
      reference: null,
      additional : null,
    },
    {
      amount : null,
      reference: null,
      additional : null,
    },
  ];
  categories: any = [];
  invoice = false;
  box : any = null;
  ticket = false;
  displayedColumns: string[] = ['qty', 'product', 'price', 'options'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  dataArray : any[] = [];
  activePay = false;
  activeAdmPay = false;
  activeSpecialPay = false;
  public showImg = true;
  setClientInfo = true;
  setPaymentMode = false;
  setDiscounttMode = false;
  setAdditionalMode = false;
  public clientForm: FormGroup;
  public discountsData : any[] = [];
  public enabledDiscounts : boolean = false;
  protected products: any[];
  public productCtrl: FormControl = new FormControl();
  public productFilterCtrl: FormControl = new FormControl();
  public filteredProducts: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public discountPercentage : any = 0;
  public discountAmount : any = 0;
  public total = 0;
  public subTotalPayment = 0;
  public totalCashPayment = 0;
  public totalDebitPayment = 0;
  public totalCreditPayment = 0;
  public totalAdditionalPayment = 0;
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  public _onDestroy = new Subject<void>();
  subscription: Subscription;
  detailPayment : boolean = false;
  detailClient = false;
  fastCash = false;
  public discounts: any[] = [
    {
    id : null,
    value: null,
    mode : null
  },
  {
    id : null,
    value: null,
    mode : null
  },
  {
    id : null,
    value: null,
    mode : null
  }
];
public discountAuxID : any[] = [null,null,null];
  constructor(
    public dialog: MatDialog,
    private productService: ProductsService,
    private categoriesService: CategoryService,
    private notifyService : NotifyService,
    private router: Router,
    public route: ActivatedRoute,
    private fb: FormBuilder,
    public common: CommonService,
    public salesService : SalesService,
    private toastr: ToastrService,
    public discountService : DiscountService,
    public BoxService : BoxService
    ) {
      this.clientForm = fb.group({
        name: [null, []],
        identity: [null, []],
        email :[null,[]],
        address: [null],
        phone: [null, []],
        document: [null, []],
      });
      this.subscription = notifyService.successPayment$.subscribe(
        successful => {
          if(successful) {
            this.emptyDataSource();
            this.activePay = false;
            this.activeAdmPay = false;
            this.activeSpecialPay = false
            this.router.navigateByUrl("/sales");
          }
      });
  }

  
  verifyOpenBox(){
    this.BoxService.assignedBox().subscribe(res=>{
      if(res.data){
        if(res.data.assigned_box === null) {
          this.toastr.clear();
          this.toastr.error("No tiene caja aperturada","Acción inválida");
          this.router.navigate(['/sales']);
        }
        else{
          this.box = res.data.assigned_box;
        }
      }
    },
    err=>{
      console.log(err);
    })
  }

  getTotalCashPayment(){
    let total = 0;
    this.paymentsCash.map(x => {
      if(x.amount) total += x.amount
    })
    this.totalCashPayment = total;
    this.getTotalAdditional();
  }

  getTotalAdditional(){
    let total = 0;
    this.paymentsCash.map(x => {
      if(x.additional) total += x.additional
    });
    this.paymentsDebit.map(x => {
      if(x.additional) total += x.additional
    })
    this.paymentsCredit.map(x => {
      if(x.additional) total += x.additional
    })
    this.totalAdditionalPayment = total;
  }

  getTotalDebitPayment(){
    let total = 0;
    this.paymentsDebit.map(x => {
      if(x.amount) total += x.amount
    })
    this.totalDebitPayment = total;
    this.getTotalAdditional();
  }

  getTotalCreditPayment(){
    let total = 0;
    this.paymentsCredit.map(x => {
      if(x.amount) total += x.amount
    })
    this.totalCreditPayment = total;
    this.getTotalAdditional();
  }

  addDiscount() {
    const dialogRef = this.dialog.open(AuthFormDialogComponent, {
      width: '40vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.enabledDiscounts = true;
      }
    });
  }

  addDiscountRow() {
    this.discounts.push({
      id : null,
      value: null,
      type: null
    });
    this.discountAuxID.push(null);
  }
  
  removeDiscount(index) {
    this.discounts.splice(index,1);
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

  setstatusData(variable){
    this.setClientInfo = false;
    this.setPaymentMode = false;
    this.setDiscounttMode = false;
    this.setAdditionalMode = false;
    this[variable] = true;
  }

  sidebarStatus() {
    this.common.isSidebarOpen = !this.common.isSidebarOpen;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PayPosDialog, {
      width: '95vw'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  

  openCashDialog(): void {  
    const dialogRef = this.dialog.open(CashOptionsDialog, {
      minWidth: '50vw',
      maxWidth : '50vw',
      position:{
        top: '10%'
      },
      data: {
        payments : this.paymentsCash
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.paymentsCash = result;
      }
      this.getTotalCashPayment();
    });
  }

  openDebitDialog(): void {
    const dialogRef = this.dialog.open(DebitOptionsDialog, {
      minWidth: '70vw',
      maxWidth : '100vw',
      position:{
        top: '10%'
      },
      data: {
        payments : this.paymentsDebit
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.paymentsDebit = result;
      }
      this.getTotalDebitPayment();
    });
  }

  openCreditDialog(): void {
  
    const dialogRef = this.dialog.open(DebitOptionsDialog, {
      minWidth: '70vw',
      maxWidth : '100vw',
      position:{
        top: '10%'
      },
      data: {
        payments : this.paymentsCredit
      }
    });
    dialogRef.componentInstance.credit = true;
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.paymentsCredit = result;
      }
      this.getTotalCreditPayment();
    });
  }

  openConfirmOptionsDialog(): void {
  
    const dialogRef = this.dialog.open(ConfirmOptionsDialog, {
      minWidth: '60vw',
      maxWidth : '100vw',
      data: {
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        //this.dataSource.data[index]["adjust"] = result;
      }
    });
  }

  openFastCashOptionsDialog(): void {
  
    const dialogRef = this.dialog.open(FastCashOptionsDialog, {
      minWidth: '100vw',
      maxWidth : '100vw',
      height:'100vh',
      minHeight:'100vh',
      maxHeight:'100vh',
      panelClass : 'dialog-padding-zero',
      data: {
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        //this.dataSource.data[index]["adjust"] = result;
      }
    });
  }

  

  openModifyDialog(i): void {
  
      const dialogRef = this.dialog.open(ModifyOptionsDialog, {
      minWidth: '58vw',
      maxWidth : '100vw',
      position:{
        top: '15vh',
        left:'1vw'
      },
      height: '70vh',
      data: {
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
 
      }
    });
  }

  openItemOptionsDialog(i): void {
  
    const dialogRef = this.dialog.open(ItemOptionsDialog, {
      width: '40vw',
      position:{
        top: '10%'
      },
      panelClass: 'dialog-padding',
    data: {
    }
  });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(result === 1) return this.openModifyCantDialog(i);
        if(result === 2) return this.openModifyDialog(i);
        if(result === 3) return this.deleteElement(i);
      }
    });
}

  openModifyCantDialog(i): void {
    const dialogRef = this.dialog.open(CantOptionsDialog, {
      width: '50vw',
      data: {
        quantity : this.dataSource.data[i]["qty"]
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataSource.data[i]["qty"] = result;
      }
    });
  }

  insertValue(value): void {
    let data = null
    switch(value){
      case 'identity':
        data = this.clientForm.value.identity;
        break;
    }
    const dialogRef = this.dialog.open(AmountOptionsDialog, {
      width: '50vw',
      position:{
      },
      data: {
        quantity : data
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        switch(value){
          case 'identity':
            this.clientForm.patchValue({
              identity : result
            });
            this.getClientByDNI(result);
            break;
        }
      }
    });
  }

  openOrderTypeOptionsDialog(): void {
    const dialogRef = this.dialog.open(OrderTypeOptionsDialog, {
      minWidth: '50vw',
      maxWidth : '70vw',
      position:{
        top: '10%'
      },
      data: {
      },
    });
    dialogRef.componentInstance.orderTypeID = this.orderTypePayment;
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.orderTypePayment = result;
      }
    });
  }


  openEditDialog(index): void {
    const dialogRef = this.dialog.open(cardTypeOptionsDialog, {
      minWidth: '50vw',
      maxWidth : '50vw',
      position:{
        top: '10%'
      },
      data: {
      }
    });
    dialogRef.componentInstance.cardTypeID = 1;


    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataSource.data[index]["adjust"] = result;
      }
    });
  }
  // ############################

  openConfigDialog(index): void {
    const dialogRef = this.dialog.open(DirectSaleConfigDialog, {
      minWidth: '40vw',
      maxWidth: '40vw',
      data: {
        adjust : this.dataSource.data[index]["adjust"] ? this.dataSource.data[index]["adjust"] : null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataSource.data[index]["adjust"] = result;
      }
    });
  }

  getProducts() {
    this.productService.productsWithSaleItem().subscribe(response => {
      if(response.data) this.productsList = response.data.product_with_sale_item;
      this.products = this.productsList;
      this.filteredProducts.next(this.products.slice());
      this.productFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterFunction();
        });
    });
  }

  getClientByDNI(doc: any) {
    this.salesService.getClientByDNI(doc).subscribe(response => {
      if(response.nombres === "") this.getClientByRUC(doc);
      else this.clientForm.patchValue({
        name: response.nombres + ' ' + response.apellidoPaterno + ' ' + response.apellidoMaterno
      })
    });
  }

  getClientByRUC(doc: any) {
    this.salesService.getClientByRUC(doc).subscribe(response => {
      if(typeof response === "string") return this.toastr.warning("No se ha encontrado informacioón del documento indicado")
      else this.clientForm.patchValue({
        name: response.razonSocial,
        address: response.direccion,
      })
    });
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe(response => {
      if(response.data) {
        this.categories = response.data.categories;
        this.categories[0]['selected'] = true;
      }
    });
  }

  getSubTotalCost() {
    this.total = this.dataArray.map(t => t.price * t.qty).reduce((acc, value) => acc + value, 0);
    this.discountPercentage = 0;
    this.discountAmount = 0;
    this.discounts.filter(x => x.id && x.mode && x.mode !== 1).map(x =>{
      this.discountAmount += parseFloat(x.value);
    });
    this.discounts.filter(x => x.id && x.mode && x.mode === 1).map(x =>{
      this.discountPercentage += parseFloat(x.value);
    });
    this.subTotalPayment = this.total - (this.total*(this.discountPercentage/100)) - this.discountAmount;
    return this.subTotalPayment;
  }

  getSubTotal(evt, el) {
    if (parseInt(evt.key) >= 0) {
      let idx = this.dataSource.data.findIndex(x => x.product === el.product);
      this.dataSource.data[idx].qty = parseInt(evt.target.value);
    }
  }

  deleteElement(index) {
    this.dataArray.splice(index,1);
    this.dataSource.data = [].concat(this.dataArray);

  }

  emptyDataSource() {
    this.dataArray = [];
    this.dataSource.data = this.dataArray;
  }

  addProductToCart(prod: any) {
    this.hideSpecialPay = true;
    let idx = this.dataSource.data.findIndex(x => x.product === prod.name);
    let product = {
      product: prod.name,
      id: prod.id,
      price: prod.price,
      type: prod.type,
      qty: 1
    }
    if (idx === -1) {
      this.dataArray.push(product);
      this.dataSource.data = this.dataArray;
    }else{
      this.dataArray[idx]["qty"]+=1;
      this.dataSource.data = this.dataArray;
    }
  }

  protected filterProducts() {
    if (!this.productsList) {
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

  selectedCategory(index: number) {
    this.categories.forEach(element => {
      element.selected = false;
    });
    this.categories[index].selected = true;
  }

  ngOnInit() {
    this.getDiscounts();
    this.getProducts();
    this.getCategories();
    this.common.manageSidebar();
    this.verifyOpenBox();
  }

  protected filterFunction() {
    if (!this.products) {
      return;
    }
    // get the search keyword
    let search = this.productFilterCtrl.value;
    if (!search) {
      this.filteredProducts.next(this.products.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredProducts.next(
      this.products.filter(product => product.name.toLowerCase().indexOf(search) > -1)
    );
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
    this.subscription.unsubscribe();
    this.common.isSidebarOpen = true;
  }

}
@Component({
  selector: 'direct-sale-config-dialog',
  templateUrl: 'direct-sale-config-dialog.html',
})
export class DirectSaleConfigDialog {

  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DirectSaleConfigDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.form = fb.group({
        adjust: [data.adjust, [ Validators.required]],
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(data): void {
    this.dialogRef.close(data);
  }

}




// ######################################

@Component({
  selector: 'item-options-dialog',
  templateUrl: 'item-options-dialog.html',
  styles:[
    `
    .text-list{
      color: black;
      font-size: 35px;
      text-align: center;
      cursor: pointer;
    }

    .text-list-red{
      color: #ff0000;
      font-size: 35px;
      text-align: center;
      cursor: pointer;
    }
    `
  ]
})
export class ItemOptionsDialog {

  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ItemOptionsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.form = fb.group({
        adjust: [data.adjust, [ Validators.required]],
      });
    }

  onNoClick(value): void {
    this.dialogRef.close(value);
  }

  submit(data): void {
    console.log(data);
    this.dialogRef.close(data);
  }

}

@Component({
  selector: 'cant-options-dialog',
  templateUrl: 'cant-options-dialog.html',
  styles :  [`
    .cancel-button{
      border: 1px solid black;
      color: #ff0000;
      font-size: 20px;
      height: 55px;
      background-color : white;
    }

    .input-options{
      border: 1px solid black;
      color: black;
      font-size: 20px;
      height: 40px;
      background-color : white;
    }

    .button-options{
      color: white;
      font-size: 50px;
      background-color : #aeaeae;
    }

    .clear-options{
      color: white;
      font-size: 30px;
      background-color : #e53935;
    }

    .erase-options{
      color: white;
      font-size: 30px;
      background-color : #e53935;
    }

    .close-options{
      color: white;
      font-size: 40px;
      background-color : #aeaeae;
    }

    .accept-button{
      color: white;
      background-color : #fe6e00;
      font-size: 20px;
      height: 55px;
    }
  `]
})
export class CantOptionsDialog {

  public quantity : any = '';
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CantOptionsDialog>,
    public toast : ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      if(data.quantity) this.quantity = data.quantity.toString();
    }

  onNoClick(): void {
   this.dialogRef.close();

  }

  submit(): void {
    if(this.quantity !== "") this.dialogRef.close(parseInt(this.quantity));
    else this.toast.warning("Debe especificar una cantidad");
  }

  add(): void {
    if(this.quantity === '') this.quantity = "1";
    else{
      this.quantity = (parseInt(this.quantity) + 1).toString();
    }
  }

  sust(): void {
    if(this.quantity === '') this.quantity = "0";
    else{
      let actualValue = parseInt(this.quantity);
      if(actualValue === 0) return;
      this.quantity = (actualValue - 1).toString();
    }
  }

  entryValue(value){
    this.quantity = parseInt(this.quantity+value).toString();
  }

  clearOption(){
    this.quantity = "";
  }

  eraseLast(){
    if(this.quantity.length <= 1) {
      this.quantity = "";
      return;
    }
    this.quantity = this.quantity.substr(0, this.quantity.length-1);
  }
}

@Component({
  selector: 'amount-options-dialog',
  templateUrl: 'amount-options-dialog.html',
  styles :  [`
    .cancel-button{
      border: 1px solid black;
      color: #ff0000;
      font-size: 20px;
      height: 55px;
      background-color : white;
    }

    .input-options{
      border: 1px solid black;
      color: black;
      font-size: 20px;
      height: 40px;
      background-color : white;
    }

    .button-options{
      color: white;
      font-size: 50px;
      background-color : #aeaeae;
    }

    .clear-options{
      color: white;
      font-size: 30px;
      background-color : #e53935;
    }

    .erase-options{
      color: white;
      font-size: 30px;
      background-color : #e53935;
    }

    .close-options{
      color: white;
      font-size: 40px;
      background-color : #aeaeae;
    }

    .accept-button{
      color: white;
      background-color : #fe6e00;
      font-size: 20px;
      height: 55px;
    }
  `]
})
export class AmountOptionsDialog {

  public quantity : any = '';
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AmountOptionsDialog>,
    public toast : ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      if(data.quantity) this.quantity = data.quantity.toString();
    }

  onNoClick(): void {
   this.dialogRef.close();

  }

  submit(): void {
    if(this.quantity !== "") this.dialogRef.close(parseInt(this.quantity));
    else this.toast.warning("No existe valor a asignar");
  }

  add(): void {
    if(this.quantity === '') this.quantity = "1";
    else{
      this.quantity = (parseInt(this.quantity) + 1).toString();
    }
  }

  sust(): void {
    if(this.quantity === '') this.quantity = "0";
    else{
      let actualValue = parseInt(this.quantity);
      if(actualValue === 0) return;
      this.quantity = (actualValue - 1).toString();
    }
  }

  entryValue(value){
    if(value === '.'){
      this.quantity = this.quantity.indexOf(value) === -1 ? (
        this.quantity === "" ? "0." : this.quantity + value
      ) : this.quantity
    }
    else this.quantity = this.quantity+value;
  }

  clearOption(){
    this.quantity = "";
  }

  eraseLast(){
    if(this.quantity.length <= 1) {
      this.quantity = "";
      return;
    }
    this.quantity = this.quantity.substr(0, this.quantity.length-1);
  }
}

@Component({
  selector: 'modify-options-dialog',
  templateUrl: 'modify-options-dialog.html',
  styles :  [`
    .cancel-button{
      border: 1px solid black;
      color: #ff0000;
      font-size: 20px;
      height: 55px;
      background-color : white;
    }

    .apply-button{
      border: 1px solid black;
      color: black;
      font-size: 35px;
      height: 55px;
      background-color : white;
    }

    .input-options{
      border: 1px solid black;
      color: black;
      font-size: 20px;
      height: 40px;
      background-color : white;
    }

    .button-options{
      color: white;
      font-size: 50px;
      background-color : #aeaeae;
    }

    .clear-options{
      color: white;
      font-size: 30px;
      background-color : #e53935;
    }

    .erase-options{
      color: white;
      font-size: 30px;
      background-color : #e53935;
    }

    .close-options{
      color: white;
      font-size: 40px;
      background-color : #aeaeae;
    }

    .arrow-options{
      color: #bcbccb;
      font-size: 40px;
    }

    .button-option{
      border-radius: 50%;
      border : 1px solid black;
      font-size: 40px;
    }

    .accept-button{
      color: white;
      background-color : #fe6e00;
      font-size: 20px;
      height: 55px;
    }

    .text-config{
      font-size: 35px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .height-container{
      max-height : calc(100% - 105px);
      min-height : calc(100% - 105px);
      overflow-y : auto;
    }

    .long-and-truncated {
      flex: 1;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .long-and-truncated-with-child {
      flex: 1;
      min-width: 0;
      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .flex-parent {
      display: flex;
      align-items: center;
    }

    @media (max-width: 1195px) {
      .text-config{
        font-size: 25px;
      }

      .apply-button{
        font-size: 25px;
      }

      .height-container{
        max-height : calc(100% - 85px);
        min-height : calc(100% - 85px);
      }

      .button-option{
        font-size: 30px;
      }

      .arrow-options{
        font-size: 30px;
      }
    }

    @media (max-width: 793px) {

      .button-option{
        font-size: 25px;
      }

      .arrow-options{
        font-size: 25px;
      }

      .apply-button{
        font-size: 15px;
      }
    }
  `]
})
export class ModifyOptionsDialog {

  public quantity : any = 1;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModifyOptionsDialog>,
    public toast : ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.dialogRef.updatePosition({ top: '50px',});
    }

  onNoClick(): void {
   this.dialogRef.close();

  }

  submit(): void {

  }

}

@Component({
  selector: 'cash-options-dialog',
  templateUrl: 'cash-options-dialog.html',
  styles :  [`
    .button-option{
      border-radius: 50%;
      border : 1px solid black;
      font-size: 20px;
      color: black;
    }
  `]
})
export class CashOptionsDialog {

  public quantity : any = '';
  public payments : any[] = [
  ]
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CashOptionsDialog>,
    public toast : ToastrService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.payments = data.payments;
    }

    openFastCashOptionsDialog(i,key): void {
  
      const dialogRef = this.dialog.open(FastCashOptionsDialog, {
        minWidth: '100vw',
        maxWidth : '100vw',
        height:'100vh',
        minHeight:'100vh',
        maxHeight:'100vh',
        panelClass: 'dialog-padding-zero',
        data: {
          amount: this.payments[i][key]
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.payments[i][key] = result;
          if(key==='additional' && this.payments[i]['additional']> this.payments[i]['amount']){
            this.toast.warning("La propina supera al monto indicado");
            this.payments[i]['additional'] = 0;
          }
        }
      });
    }

  onNoClick(): void {
   this.dialogRef.close(this.payments);

  }

  add(){
    this.payments.push(
      {
        amount : null,
        reference: null
      }
    );
  }

  submit(): void {
    if(this.quantity !== "") this.dialogRef.close(parseInt(this.quantity));
    else this.toast.warning("Debe especificar una cantidad");
  }

}

@Component({
  selector: 'debit-options-dialog',
  templateUrl: 'debit-options-dialog.html',
  styles :  [`
    .button-option{
      border-radius: 50%;
      border : 1px solid black;
      font-size: 20px;
      color: black;
    }
  `]
})
export class DebitOptionsDialog {
  @Input() credit : boolean;
  public quantity : any = '';
  public payments : any[] = [

  ]
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DebitOptionsDialog>,
    public toast : ToastrService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.payments = data.payments;
    }

    openFastCashOptionsDialog(i,key): void {
  
      const dialogRef = this.dialog.open(FastCashOptionsDialog, {
        minWidth: '100vw',
        maxWidth : '100vw',
        height:'100vh',
        minHeight:'100vh',
        maxHeight:'100vh',
        panelClass: 'dialog-padding-zero',
        data: {
          amount: this.payments[i][key]
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.payments[i][key] = result;
          if(key==='additional' && this.payments[i]['additional']> this.payments[i]['amount']){
            this.toast.warning("La propina supera al monto indicado");
            this.payments[i]['additional'] = 0;
          }
        }
      });
    }

    insertValue(value): void {
      const dialogRef = this.dialog.open(AmountOptionsDialog, {
        width: '50vw',
        position:{
          //top: '10%'
        },
        data: {
          quantity : this.payments[value]["reference"]
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.payments[value]["reference"] = result;
        }
      });
    }

  onNoClick(): void {
   this.dialogRef.close(this.payments);
  }

  add(){
    this.payments.push(
      {
        amount : null,
        reference: null
      }
    );
  }

  openCardType(i){
    const dialogRef = this.dialog.open(cardTypeOptionsDialog, {
      minWidth: '50vw',
      maxWidth : '50vw',
      position:{
        top: '10%'
      },
      disableClose:true,
      data: {
      }
    });
    if(this.payments[i]["card_type"]) dialogRef.componentInstance.cardTypeID = this.payments[i]["card_type"];

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.payments[i]["card_type"] = result;
      }
    });
  }

  submit(): void {
    if(this.quantity !== "") this.dialogRef.close(parseInt(this.quantity));
    else this.toast.warning("Debe especificar una cantidad");
  }

}

@Component({
  selector: 'order-options-dialog',
  templateUrl: 'order-options-dialog.html',
  styles :  [`
    .button-option{
      border-radius: 50%;
      border : 1px solid black;
      font-size: 20px;
      color: black;
    }
  `]
})
export class OrderTypeOptionsDialog implements OnInit{

  @Input() orderTypeID : any;
  public quantity : any = '';
  public orders : any[] = [
  ]
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<OrderTypeOptionsDialog>,
    public toast : ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public orderTypeService : OrdersTypeService
    ) {
      if(data.orderTypeID) this.orderTypeID = data.orderTypeID;
    }

    trackByIndex(index: number, obj: any): any {
      return index;
    }

  onNoClick(value): void {
   this.dialogRef.close(value);
  }

  ngOnInit(){
    this.getOrderTypes();
  }



  
  getOrderTypes(){
    this.orderTypeService.getOrderTypes().subscribe(
      res=>{
        if(res.data) this.orders = [].concat(res.data.order_types);
      },
      error =>{
        console.log(error);
      })
  }

  submit(): void {
    if(this.quantity !== "") this.dialogRef.close(parseInt(this.quantity));
    else this.toast.warning("Debe especificar una cantidad");
  }

}

@Component({
  selector: 'card-options-dialog',
  templateUrl: 'card-options-dialog.html',
  styles :  [`
    .card-type{
      border: 1px solid black;
      color: black;
      font-size: 25px;
      cursor:pointer;
      background-color:white;
      padding-left: 5px;
      padding-right: 5px;
    }

    .card-type-selected{
      color: white;
      background-color:#fd7e14;
    }
  `]
})
export class cardTypeOptionsDialog implements OnInit{

  @Input() cardTypeID : any;
  public quantity : any = '';
  public cardTypes : any[] = [

  ]
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<cardTypeOptionsDialog>,
    public toast : ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public orderTypeService : OrdersTypeService,
    public paymentMethodService : PaymentMethodService,
    ) {
      if(data.cardTypeID) this.cardTypeID = data.cardTypeID;
    }

    trackByIndex(index: number, obj: any): any {
      return index;
    }

  onNoClick(): void {
   this.dialogRef.close();
  }

  setType(elem){
    this.cardTypeID = elem;
    this.dialogRef.close(this.cardTypeID);
  }

  ngOnInit(){
    this.getPaymentMethods();
  }

  getPaymentMethods(){
    this.paymentMethodService.getPaymentMethods().subscribe(res=>{
      if(res.data) this.cardTypes = res.data.payment_methods;
    },err=>{
      console.log(err);
    })
  }

}

@Component({
  selector: 'confirm-options-dialog',
  templateUrl: 'confirm-options-dialog.html',
  styles:[
    `
    `
  ]
})
export class ConfirmOptionsDialog {

  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ConfirmOptionsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      
    }

  onNoClick(value): void {
    this.dialogRef.close(value);
  }

}

@Component({
  selector: 'fast-cash-options-dialog',
  templateUrl: 'fast-cash-options-dialog.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class FastCashOptionsDialog {
  @Input() dataTable : any;
  public form: FormGroup;
  public amount : any = '';
  public enableExchangeRate : boolean =false;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FastCashOptionsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      if(data.amount) this.amount = data.amount;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getSubTotalCost() {
    if(this.dataTable) return this.dataTable.map(t => t.price * t.qty).reduce((acc, value) => acc + value, 0);
    else 0;
  }

  getSubTotal(evt, el) {
    if (parseInt(evt.key) >= 0) {
      let idx = this.dataTable.findIndex(x => x.product === el.product);
      this.dataTable[idx].qty = parseInt(evt.target.value);
    }
  }

  add(): void {
    if(this.amount === '') this.amount = "1";
    else{
      this.amount = (parseInt(this.amount) + 1).toString();
    }
  }

  sust(): void {
    if(this.amount === '') this.amount = "";
    else{
      let actualValue = parseFloat(this.amount);
      if(actualValue === 0) return;
      this.amount = (actualValue - 1).toString();
    }
  }

  entryValue(value){
    if(value === '.'){
      this.amount = this.amount.indexOf(value) === -1 ? (
        this.amount === "" ? "0." : this.amount + value
      ) : this.amount
    }
    else this.amount = this.amount+value;
  }

  clearOption(){
    this.amount = "";
  }

  eraseLast(){
    if(this.amount.length <= 1) {
      this.amount = "";
      return;
    }
    this.amount = this.amount.substr(0, this.amount.length-1);
  }

  enter(){
    this.dialogRef.close( this.amount === '' ? null : parseFloat(this.amount));
  }

}