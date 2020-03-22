import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormTypeStoreComponent } from '../form-type-store/form-type-store.component';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-store',
  templateUrl: './form-store.component.html',
  styleUrls: ['./form-store.component.scss']
})
export class FormStoreComponent implements OnInit, OnChanges {
  @Input() storeID: any;
  @Input() showClose: boolean;

  public form: FormGroup;
  warehousesTypes: any[] = [];
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public warehouseService: WarehouseService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<FormStoreComponent>,
  ) {
    this.form = fb.group({
      description: [null, [Validators.required]],
      address: [null, []],
      state: [true, [Validators.required]],
      warehouse_type_id: [null, [Validators.required]],
      code: [null, [Validators.minLength(2),Validators.maxLength(2)]],
      headquarter_id: [1, [Validators.required]],
      phone: [null, []],
    });
  }

  ngOnInit() {
    if (this.storeID) {
      this.getWarehouse(this.storeID);
    }
    this.getWarehouseTypes();
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if (this.storeID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.warehouseService.createWarehouse(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if (this.dialogRef) {
        this.dialogRef.close(res.data.createWarehouse);
      }
    }, err => {
      console.log(err);
    });
  }

  getWarehouseTypes() {
    this.warehouseService.getWarehousesTypes().subscribe(res => {
      if(res.data) this.warehousesTypes = res.data.warehouse_types;
    }, err => {
      console.log(err);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['storeID']) {
      this.getWarehouse(this.storeID);
    }
  }

  getWarehouse(id) {
    this.warehouseService.getWarehouse(id).subscribe(res => {
      if(res.data){
      if (res.data.warehouses.length === 0) {
        this.toastr.error("No se encuentra el registro indicado")
      } else {
        this.form.patchValue({
          description: res.data.warehouses[0].description,
          state: res.data.warehouses[0].state,
          address: res.data.warehouses[0].address,
          code: res.data.warehouses[0].code,
          warehouse_type_id: (res.data.warehouses[0].warehouse_type) ? res.data.warehouses[0].warehouse_type.id : null,
          //headquarter_id: res.data.warehouses[0].headquarter_id,
          phone: res.data.warehouses[0].phone,
        });
      }
    }
    }, err => {
      console.log(err);
    });
  }

  edit(data: any) {
    this.warehouseService.updateWarehouse(this.storeID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if (this.dialogRef) {
        this.dialogRef.close(res.data.updateWarehouse);
      }
    }, err => {
      console.log(err);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FormTypeStoreComponent, {
      width: '50vw',
      //panelClass: 'config-modal'
    });

    dialogRef.componentInstance.showClose = true;

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.warehousesTypes.push(result);
      }
    });
  }

  compareObjects(o1: any, o2: any) {
    if(o1 === o2) return true;
    else return false
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-form-type-store',
  templateUrl: 'dialog-form-type-store.html',
})
export class DialogFormTypeStore {

  constructor(
    public dialogRef: MatDialogRef<DialogFormTypeStore>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
