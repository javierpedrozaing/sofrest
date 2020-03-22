import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { ReasonSpendingService } from 'src/app/services/reason-spending.service';
import { ExpenditureService } from 'src/app/services/expenditure.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payments-expenses-form',
  templateUrl: './payments-expenses-form.component.html',
  styleUrls: ['./payments-expenses-form.component.scss']
})
export class PaymentsExpensesFormComponent implements OnInit {


  @Input() paymentExpenseID: any;
  public form: FormGroup;
  minDate = new Date();
  public paymentImg = new FormControl(null, [FileUploadValidators.filesLimit(4),FileUploadValidators.sizeRange({
    minSize:0,
    maxSize:80
  })]);

  motives : any =[]

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private reasonSpendingService: ReasonSpendingService,
    private toastr: ToastrService,
    private expenditureService : ExpenditureService,
    private router: Router,
    public route: ActivatedRoute,
  ) {
    this.form = fb.group({
      invoice_date: [new Date(), [ Validators.required]],
      amount: [null, [ Validators.required]],
      pay_day: [new Date(), [ Validators.required]],
      bill: [null, [ Validators.required]],
      paid_out: [true, [ Validators.required]],
      reason_spending_id: [null, [ Validators.required]],
      // paymentImg: this.paymentImg
    });
  }

  ngOnInit() {
    this.getReasonsSpending();
    if (this.paymentExpenseID) {
      this.getExpenditure(this.paymentExpenseID);
    }else if(this.route.snapshot.params.id){
      this.getExpenditure(this.route.snapshot.params.id);
    }
  }

  compareObjects(o1: any, o2: any) {
    if (o1 === o2) return true;
    else return false
  }
  

  getReasonsSpending() {
    this.reasonSpendingService.getReasonsSpending().subscribe(res => {
      if(res.data) this.motives = [].concat(res.data.reason_spending);
    }, err => {
      console.log(err);
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

  submit(data: any, formDirective: FormGroupDirective) {
    data.invoice_date = this.formatDate(data.invoice_date) ;
    data.pay_day = this.formatDate(data.pay_day);
    if (this.paymentExpenseID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.expenditureService.createExpenditure(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.router.navigateByUrl('/accounting/payments-expenses');
    }, err => {
      console.log(err);
    });
  }

  edit(data: any) {
    this.expenditureService.updateExpenditure(this.paymentExpenseID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.router.navigateByUrl('/accounting/payments-expenses');
    }, err => {
      console.log(err);
    });
  }

  getExpenditure(id){
    this.paymentExpenseID = id;
    this.expenditureService.getExpenditure(id).subscribe(res => {
      if(res.data){
        if(res.data.expenditure.length ===  0){
          this.toastr.error("No se encuentra el registro indicado")
        }else{
          this.form.patchValue({
            invoice_date : new Date(res.data.expenditure[0].invoice_date),
            amount : res.data.expenditure[0].amount,
            pay_day : new Date(res.data.expenditure[0].pay_day),
            bill : res.data.expenditure[0].bill,
            paid_out : res.data.expenditure[0].paid_out,
            reason_spending_id : res.data.expenditure[0].reason_spending ?  res.data.expenditure[0].reason_spending.id : null
          });
        }

      }
    }, err => {
      console.log(err);
    });
  }
}
