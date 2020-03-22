import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-tpv',
  templateUrl: './add-tpv.component.html',
  styleUrls: ['./add-tpv.component.scss']
})
export class AddTpvComponent implements OnInit {

  public newtPV: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddTpvComponent>
  ) {
    this.newtPV = fb.group({
      name: [null, [ Validators.required]],
      store: [null, [ Validators.required]],
    });
   }

   ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

}
