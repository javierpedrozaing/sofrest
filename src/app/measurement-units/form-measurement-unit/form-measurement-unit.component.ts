import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-measurement-unit',
  templateUrl: './form-measurement-unit.component.html',
  styleUrls: ['./form-measurement-unit.component.scss']
})
export class FormMeasurementUnitComponent implements OnInit {

  @Input() measurementUnitID: any;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = fb.group({
      description: [null, [ Validators.required]],
      code: [null, [ Validators.required]],
      sunat_code: [null, [ Validators.required]],
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
