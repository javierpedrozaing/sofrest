import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inv-avz',
  templateUrl: './inv-avz.component.html',
  styleUrls: ['./inv-avz.component.scss']
})
export class InvAvzComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<InvAvzComponent>
  ) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

}
