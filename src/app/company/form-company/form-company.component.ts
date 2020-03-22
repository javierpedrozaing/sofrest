import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form-company',
  templateUrl: './form-company.component.html',
  styleUrls: ['./form-company.component.scss']
})
export class FormCompanyComponent implements OnInit {
  @Input() companyID: any;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.form = fb.group({
      ruc: ['00000000', [ Validators.required]],
      direction: ['Av. Principal del Centro', [ Validators.required]],
      ubigeo: ['option1', [ Validators.required]],
      phone: ['000 000 00 00', [ Validators.required]],
      business_name: ['EMPRESA C.A.', [ Validators.required]],
      commercial_name: ['EMPRESA C.A.', [ Validators.required]],
      email: ['mywebmail@empresa.com', [ Validators.required]],
      web: ['https://www.empresa.com', [ Validators.required]],
    });
  }

  ngOnInit() {
  }

  save(data: any) {

  }

  edit(data: any) {

  }

}
