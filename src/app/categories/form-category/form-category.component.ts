import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss']
})
export class FormCategoryComponent implements OnInit {
  @Input() categoryID: any;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = fb.group({
      description: [null, [ Validators.required]],
      status: [true, [Validators.required]],
    });
  }

  ngOnInit() {
  }

  save(data: any) {

  }

  edit(data: any) {

  }

}
