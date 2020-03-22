import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-food-hall-form',
  templateUrl: './food-hall-form.component.html',
  styleUrls: ['./food-hall-form.component.scss']
})
export class FoodHallFormComponent implements OnInit {

  @Input() foodHallID: any;
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
