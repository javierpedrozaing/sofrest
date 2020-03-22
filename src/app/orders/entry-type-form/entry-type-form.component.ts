import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-entry-type-form',
  templateUrl: './entry-type-form.component.html',
  styleUrls: ['./entry-type-form.component.scss']
})
export class EntryTypeFormComponent implements OnInit {

  @Input() entryTypeID: any;
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
