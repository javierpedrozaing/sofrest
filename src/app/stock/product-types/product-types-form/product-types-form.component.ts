import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { MatDialogRef, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-product-types-form',
  templateUrl: './product-types-form.component.html',
  styleUrls: ['./product-types-form.component.scss']
})
export class ProductTypesFormComponent implements OnInit {

  @Input() productTypesID: any;
  @Input() hideBack: boolean;
  @Input() showClose: boolean;
  public productTypeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productTypesService: ProductTypeService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ProductTypesFormComponent>,
  ) {
    this.productTypeForm = fb.group({
      description: [null, [ Validators.required]],
      code: [null, []],
      state : [true, [ Validators.required]]
    });
  }

  getProductType(id){
    this.productTypesService.getProductType(id).subscribe(res => {
      if(res.data){
      if(res.data.type_products.length ===  0){
        this.toastr.error("No se encuentra el registro indicado")
      }else{
        this.productTypeForm.patchValue({
          description: res.data.type_products[0].description,
          code: res.data.type_products[0].code,
          state: res.data.type_products[0].state,
        });
      }
    }
    }, err => {
      console.log(err);
    });

  }

  save() {
    if (!this.productTypesID) {
      this.productTypesService.createTypeProduct(this.productTypeForm.value).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.createTypeProduct);
      }
    }, err => {
      console.log(err);
    });
    } else {
      this.productTypesService.updateTypeProduct(this.productTypesID, this.productTypeForm.value).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.updateTypeProduct);
      }
    }, err => {
      console.log(err);
    });
    }
  }

  ngOnInit() {
    if(this.productTypesID){
      this.getProductType(this.productTypesID);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
