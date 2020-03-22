import { Component, OnInit, ViewChild, Inject, OnDestroy, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-client-plan',
  templateUrl: './client-plan.component.html',
  styleUrls: ['./client-plan.component.scss']
})
export class ClientPlanComponent implements OnInit {

  displayedColumns: string[] = ['name', 'price', 'options'];
  dataSource = new MatTableDataSource<any>([]);
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public isMobile: boolean;
  subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    public planService: PlanService,
    private coolDialogs: NgxCoolDialogsService
  ) {
    this.isMobile = this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  getPlans() {
    this.planService.getPlans().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.plans);
    }, err => {
      console.log(err);
    });
  }

  deleteCategory(id,index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado',{
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
        this.planService.deletePlan(id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
          this.dataSource.data.splice(index,1);
          this.dataSource.data = [].concat(this.dataSource.data);
        }, err => {
          console.log(err);
        });
      }
    });
  }

  changeVisibility(id,index,status) {
    let action = '';

    status == true ? (action = 'ocultará') : (action = 'mostrará');

    this.coolDialogs.confirm(`Se ${action} el registro indicado`,{
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
        this.planService.updateStatePlan({state: !this.dataSource.data[index]["state"]},id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
           this.dataSource.data[index]["state"] =  !this.dataSource.data[index]["state"];
          this.dataSource.data = [].concat(this.dataSource.data);
        }, err => {
          console.log(err);
        });
      }
    });
  }

  openDialog(id,index): void {
    const dialogRef = this.dialog.open(PlansFormComponent, {
      maxWidth: '50vw',
      minWidth: '60vw',
      panelClass: 'config-modal',
      data: {id:id}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(id){
          this.dataSource.data[index] = result;
        }else{
          this.dataSource.data.push(result);
        }
        this.dataSource.data = [].concat(this.dataSource.data);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.getPlans();
    this.dataSource.paginator = this.paginator;
  }

}

@Component({
  selector: 'plans-form-component',
  templateUrl: 'plans-form-component.html',
})
export class PlansFormComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public planService: PlanService,
    public dialogRef: MatDialogRef<PlansFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = fb.group({
      name: [null, [Validators.required]],
      detail: [null, [Validators.required]],
      price: [null, [Validators.required]],
      state: [true, [Validators.required]]
    });
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if(this.data.id) {
      this.edit(data)
    }
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.planService.createPlan(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if (this.dialogRef) {
        this.dialogRef.close(res.data.createPlan);
      }
    }, err => {
      console.log(err);
    });
  }

  getPlan(id){
    this.planService.getPlan(id).subscribe(res => {
      if(res.data){
        if(res.data.plans.length ===  0){
          this.toastr.error("No se encuentra el registro indicado")
        }else{
          this.form.patchValue({
            name: res.data.plans[0].name,
            state: res.data.plans[0].state,
            price: res.data.plans[0].price,
            detail: res.data.plans[0].detail
          });
        }
      }
    }, err => {
      console.log(err);
    });
  }

  edit(data: any) {
    this.planService.updatePlan(this.data.id, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.updatePlan);
      }
    }, err => {
      console.log(err);
    });
}

ngOnInit() {
  if(this.data.id){
    this.getPlan(this.data.id)
  }
}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
