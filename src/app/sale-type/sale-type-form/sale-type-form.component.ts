import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sale-type-form',
  templateUrl: './sale-type-form.component.html',
  styleUrls: ['./sale-type-form.component.scss']
})
export class SaleTypeFormComponent implements OnInit {

  @Input() saleTypeID: any;
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
