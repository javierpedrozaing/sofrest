import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentMethodService } from 'src/app/services/payment-method.service';

@Component({
  selector: 'app-payment-method-form',
  templateUrl: './payment-method-form.component.html',
  styleUrls: ['./payment-method-form.component.scss']
})
export class PaymentMethodFormComponent implements OnInit {

  @Input() paymentMethodID: any;
  public form: FormGroup;
  public filesControl = new FormControl(null, FileUploadValidators.filesLimit(1));

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    public route: ActivatedRoute,
    public paymentMethodService: PaymentMethodService,
  ) {
    this.form = fb.group({
      description: [null, [ Validators.required]],
      code: [null, [ Validators.minLength(2),Validators.maxLength(2)]],
      sunat_code: [null, []],
      discount: [0, [ ]],
      image: this.filesControl,
      state: [true, [ Validators.required]],
    });
  }

  ngOnInit() {
    if (this.paymentMethodID) {
      this.getPaymentMethod(this.paymentMethodID);
    }else if(this.route.snapshot.params.id){
      this.getPaymentMethod(this.route.snapshot.params.id);
    }
  }

  submit(data: any, formDirective: FormGroupDirective) {
    data.image = "HI U";
    if (this.paymentMethodID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.paymentMethodService.createPaymentMethod(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.router.navigateByUrl("/payment-methods/list");
    }, err => {
      console.log(err);
    });
  }

  edit(data: any) {
    this.paymentMethodService.updatePaymentMethod(this.paymentMethodID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.router.navigateByUrl("/payment-methods/list");
    }, err => {
      console.log(err);
    });
  }

  getPaymentMethod(id) {
    this.paymentMethodID = id;
    this.paymentMethodService.getPaymentMethod(id).subscribe(res => {
      if(res.data){
        if (res.data.payment_methods.length === 0) {
          this.toastr.error("No se encuentra el registro indicado")
        } else {
          this.form.patchValue({
            description : res.data.payment_methods[0].description,
            code : res.data.payment_methods[0].code,
            sunat_code : res.data.payment_methods[0].sunat_code,
            discount : res.data.payment_methods[0].discount,
            state: res.data.payment_methods[0].state,
          });
        }
      }
    }, err => {
      console.log(err);
    });
  }


}
