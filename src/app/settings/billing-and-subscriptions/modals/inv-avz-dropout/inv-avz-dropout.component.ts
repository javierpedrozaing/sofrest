import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inv-avz-dropout',
  templateUrl: './inv-avz-dropout.component.html',
  styleUrls: ['./inv-avz-dropout.component.scss']
})
export class InvAvzDropoutComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<InvAvzDropoutComponent>
  ) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

}
