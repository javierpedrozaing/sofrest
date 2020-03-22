import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-employee-dropout',
  templateUrl: './employee-dropout.component.html',
  styleUrls: ['./employee-dropout.component.scss']
})
export class EmployeeDropoutComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EmployeeDropoutComponent>
  ) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

}
