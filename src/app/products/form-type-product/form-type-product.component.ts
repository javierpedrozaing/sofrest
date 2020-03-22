import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-type-product',
  templateUrl: './form-type-product.component.html',
  styleUrls: ['./form-type-product.component.scss']
})
export class FormTypeProductComponent implements OnInit {

  @Input() productTypeID: any;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = fb.group({
      description: [null, [ Validators.required]],
      status: [true, [ Validators.required]],
    });
  }

  ngOnInit() {
  }

  save(data: any) {

  }

  edit(data: any) {

  }
}
