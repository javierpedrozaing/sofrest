import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-loyalty',
  templateUrl: './loyalty.component.html',
  styleUrls: ['./loyalty.component.scss']
})
export class LoyaltyComponent implements OnInit {

  public Lealtad: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.Lealtad = fb.group({
      loyalty_type: ['Sistema de bonificaciones', [ Validators.required]],
      percentage: [null, [ Validators.required]],
    });
   }

   ngOnInit() {
  }

}
