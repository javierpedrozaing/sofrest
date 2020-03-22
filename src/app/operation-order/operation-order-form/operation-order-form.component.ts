
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { HeadquarterService } from 'src/app/services/headquarter.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OperationOrderService } from 'src/app/services/operation-order.service';

@Component({
  selector: 'app-operation-order-form',
  templateUrl: './operation-order-form.component.html',
  styleUrls: ['./operation-order-form.component.scss']
})
export class OperationOrderFormComponent implements OnInit {

  @Input() operationOrderID: any;
  @Input() hideBack: boolean;
  @Input() showClose: boolean;
  public form: FormGroup;
  public headquarterTypes : any[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public operationOrderService: OperationOrderService,
    private coolDialogs: NgxCoolDialogsService,
    private router: Router,
    public route: ActivatedRoute,
    public dialogRef: MatDialogRef<OperationOrderFormComponent>,
  ) {
    this.form = fb.group({
      description: [null, [ Validators.required]],
      state: [true, [ Validators.required]],
    });
  }

  ngOnInit() {
    if (this.operationOrderID) {
      this.getHeadquarterType(this.operationOrderID);
    }else if(this.route.snapshot.params.id){
      this.getHeadquarterType(this.route.snapshot.params.id);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  getHeadquarterType(id) {
    this.operationOrderID = id;
    this.operationOrderService.getOperationOrder(id).subscribe(res => {
      if(res.data){
        if (res.data.operation_orders.length === 0) {
          this.toastr.error("No se encuentra el registro indicado")
        } else {
          this.form.patchValue({
            state: res.data.operation_orders[0].state,
            description: res.data.operation_orders[0].description,
          });
        }
      }
    }, err => {
      console.log(err);
    });
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if (this.operationOrderID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.operationOrderService.createOperationOrder(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.createOperationOrder);
      }
    }, err => {
      console.log(err);
    });
  }

  edit(data: any) {
    this.operationOrderService.updateOperationOrder(this.operationOrderID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.updateOperationOrder);
      }
    }, err => {
      console.log(err);
    });
  }
}
