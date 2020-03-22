import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentTypeService } from 'src/app/services/payment-type.service';

@Component({
  selector: 'app-payment-way-form',
  templateUrl: './payment-way-form.component.html',
  styleUrls: ['./payment-way-form.component.scss']
})
export class PaymentWayFormComponent implements OnInit {

  @Input() paymentTypeID: any;
  public form: FormGroup;
  public filesControl = new FormControl(null, FileUploadValidators.filesLimit(1));

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    public route: ActivatedRoute,
    public paymentTypeService: PaymentTypeService,
  ) {
    this.form = fb.group({
      description: [null, [ Validators.required]],
      code: [null, [ Validators.required]],
      sunat_code: [null, [ Validators.required]],
      state: [true, [ Validators.required]],
    });
  }

  ngOnInit() {
    if (this.paymentTypeID) {
      this.getPaymentType(this.paymentTypeID);
    }else if(this.route.snapshot.params.id){
      this.getPaymentType(this.route.snapshot.params.id);
    }
  }

  submit(data: any, formDirective: FormGroupDirective) {
    data.image = "HI U";
    if (this.paymentTypeID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.paymentTypeService.createPaymentType(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
    }, err => {
      console.log(err);
    });
  }

  edit(data: any) {
    this.paymentTypeService.updatePaymentType(this.paymentTypeID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
    }, err => {
      console.log(err);
    });
  }

  getPaymentType(id) {
    this.paymentTypeID = id;
    this.paymentTypeService.getPaymentType(id).subscribe(res => {
      if(res.data){
        if (res.data.payment_methods.length === 0) {
          this.toastr.error("No se encuentra el registro indicado")
        } else {
          this.form.patchValue({
            description : res.data.payment_methods[0].description,
            code : res.data.payment_methods[0].code,
            sunat_code : res.data.payment_methods[0].sunat_code,
            state: res.data.payment_methods[0].state,
          });
        }
      }
    }, err => {
      console.log(err);
    });
  }
}
