import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-employee-amd',
  templateUrl: './employee-amd.component.html',
  styleUrls: ['./employee-amd.component.scss']
})
export class EmployeeAmdComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EmployeeAmdComponent>
  ) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

}
