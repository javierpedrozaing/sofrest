import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.scss']
})
export class StockFormComponent implements OnInit {

  @Input() stockID: any;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = fb.group({
      product: [null, [ Validators.required]],
      cant: [null, [ Validators.required]],
    });
  }

  ngOnInit() {
  }

  save(data: any) {

  }

  edit(data: any) {

  }
}
