import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OrdersTypeService } from 'src/app/services/orders-type.service';
import { ToastrService } from 'ngx-toastr';
import { OperationOrderService } from 'src/app/services/operation-order.service';

@Component({
  selector: 'app-add-order-type',
  templateUrl: './add-order-type.component.html',
  styleUrls: ['./add-order-type.component.scss']
})
export class AddOrderTypeComponent implements OnInit {
  @Input() orderTypeID : any;
  public newOrderType: FormGroup;
  public operationOrders: any[] = [];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddOrderTypeComponent>,
    public OrdersTypeService : OrdersTypeService,
    public OperationOrderService : OperationOrderService,
    private toastr: ToastrService,
  ) {
    this.newOrderType = fb.group({
      description: [null, [ Validators.required]],
      code: [null, [ Validators.required]],
      state: [true, [ Validators.required]],
    });
   }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    if (this.orderTypeID) {
      this.getOrderType(this.orderTypeID);
    }
    this.getOperationOrders();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  getOrderType(id) {
    this.orderTypeID = id;
    this.OrdersTypeService.getOrderType(id).subscribe(res => {
      if(res.data){
      if (res.data.order_types.length === 0) {
        this.toastr.error("No se encuentra el registro indicado")
      } else {
        this.newOrderType.patchValue({
          state: res.data.order_types[0].state,
          code: res.data.order_types[0].code,
          description: res.data.order_types[0].description,
          operation_order_id : (res.data.order_types[0].operation_order) ? res.data.order_types[0].operation_order.id : null
        });
      }}
    }, err => {
      console.log(err);
    });
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if (this.orderTypeID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.OrdersTypeService.createOrderType(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.createOrderType);
      }
    }, err => {
      console.log(err);
    });
  }

  edit(data: any) {
    this.OrdersTypeService.updateOrderType(this.orderTypeID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.updateOrderType);
      }
    }, err => {
      console.log(err);
    });
  }

  getOperationOrders() {
    // this.OperationOrderService.getOperationOrders().subscribe(res => {
    //   if(res.data) this.operationOrders = [].concat(res.data.operation_orders);
    // }, err => {
    //   console.log(err);
    // });
  }

  compareObjects(o1: any, o2: any) {
    if(o1 === o2) return true;
    else return false
  }

}
