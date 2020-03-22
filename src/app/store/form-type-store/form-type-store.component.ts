import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-form-type-store',
  templateUrl: './form-type-store.component.html',
  styleUrls: ['./form-type-store.component.scss']
})
export class FormTypeStoreComponent implements OnInit {

  @Input() storeTypeID: any;
  @Input() hideBack: boolean;
  @Input() showClose: boolean;

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public warehouseService: WarehouseService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FormTypeStoreComponent>,
  ) {
    this.form = fb.group({
      description: [null, [ Validators.required]],
      state: [true, [ Validators.required]],
    });
  }

  ngOnInit() {
    if(this.storeTypeID){
      this.getWarehouseType(this.storeTypeID); 
    }
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if(this.storeTypeID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.warehouseService.createWarehouseType(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.createWarehouseType);
      }
    }, err => {
      console.log(err);
    });
  }

  getWarehouseType(id){
    this.warehouseService.getWarehousesType(id).subscribe(res => {
      if(res.data){
      if(res.data.categories.length ===  0){
        this.toastr.error("No se encuentra el registro indicado")
      }else{
        this.form.patchValue({
          description: res.data.categories[0].description,
          state: res.data.categories[0].state
        });
      }
    }
    }, err => {
      console.log(err);
    });
  }
  
    edit(data: any) {
      this.warehouseService.updateWarehouseType(this.storeTypeID,data).subscribe(res => {
        this.toastr.clear();
        this.toastr.success('Operación Exitosa');
        if(this.dialogRef){
          this.dialogRef.close(res.data.updateWarehouseType);
        }
      }, err => {
        console.log(err);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
