import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-app-store',
  templateUrl: './app-store.component.html',
  styleUrls: ['./app-store.component.scss']
})
export class AppStoreComponent implements OnInit {

  public newStore: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AppStoreComponent>
  ) {
    this.newStore = fb.group({
      name: [null, [ Validators.required]],
      addres: [null, [ Validators.required]],
      phone: [null, [ Validators.required]],
      description: [null, [ Validators.required]],
    });
   }

   ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

}
