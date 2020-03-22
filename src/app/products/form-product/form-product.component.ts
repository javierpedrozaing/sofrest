import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormTypeProductComponent } from '../form-type-product/form-type-product.component';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {
  @Input() productID: any;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.form = fb.group({
      description: [null, [ Validators.required]],
      status: [true, [ Validators.required]],
      product_type: [null, [ Validators.required]],
      product_brand: [null, [ Validators.required]]
    });
  }

  ngOnInit() {
  }

  save(data: any) {

  }

  edit(data: any) {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogFormTypeProduct, {
      width: '50vw'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}

@Component({ 
  selector: 'dialog-form-type-product',
  templateUrl: 'dialog-form-type-product.html',
})
export class DialogFormTypeProduct {

  constructor(
    public dialogRef: MatDialogRef<DialogFormTypeProduct>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
