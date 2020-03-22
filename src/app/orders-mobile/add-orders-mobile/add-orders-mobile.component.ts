import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-orders-mobile',
  templateUrl: './add-orders-mobile.component.html',
  styleUrls: ['./add-orders-mobile.component.scss']
})
export class AddOrdersMobileComponent implements OnInit {

  addFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      phone_number: ['', Validators.required],
      email: ['', Validators.required],
      diners_number: ['', Validators.required]
    });
  }

}
