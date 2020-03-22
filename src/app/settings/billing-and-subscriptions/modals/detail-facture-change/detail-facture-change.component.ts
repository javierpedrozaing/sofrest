import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-facture-change',
  templateUrl: './detail-facture-change.component.html',
  styleUrls: ['./detail-facture-change.component.scss']
})
export class DetailFactureChangeComponent implements OnInit {

  public Facture: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DetailFactureChangeComponent>
  ) {
    this.Facture = fb.group({
      name: [null, [ Validators.required]],
      email: [null, [ Validators.required]],
    });
   }

  ngOnInit() {
    
  }


  close(): void {
    this.dialogRef.close();
  }

}
