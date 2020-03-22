import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { PaymentMethodService } from 'src/app/services/payment-method.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

export interface PaymentMethod {
  description: string;
  status: boolean;
  code: string;
  icon: any;
}

const ELEMENT_DATA: PaymentMethod[] = [
  { description: 'Metodo 1', status : true, code : '000000', icon : './assets/images/food.jpg' },
  { description: 'Metodo 2', status : true, code : '000000', icon : './assets/images/food.jpg'},
  { description: 'Metodo 3', status : true, code : '000000', icon : './assets/images/food.jpg'},
];

@Component({
  selector: 'app-payment-method-list',
  templateUrl: './payment-method-list.component.html',
  styleUrls: ['./payment-method-list.component.scss']
})
export class PaymentMethodListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['position', 'description', 'code', 'icon', 'options', ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: MatTableDataSource<any>;
public isMobile : boolean ;
  subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    public paymentMethodService: PaymentMethodService,
    private coolDialogs: NgxCoolDialogsService,
    private router: Router,
    public route: ActivatedRoute,
  ) { 
       this.isMobile= this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => { 
      this.isMobile = isMobile;
    }); 
  }

    ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changeVisibility(id, index, status) {
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
        this.paymentMethodService.updateStatePaymentMethod({state: !this.dataSource.data[index]["state"]},id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
           this.dataSource.data[index]["state"] =  !this.dataSource.data[index]["state"];
          this.dataSource.data = [].concat(this.dataSource.data);
        }, err => {
          console.log(err);
        });
      }
    });
  }

  // changeVisibility(id,index) {
  //   this.paymentMethodService.updateStatePaymentMethod({state: !this.dataSource.data[index]["state"]},id).subscribe(res => {
  //     this.toastr.success("Operación realizada satisfactoriamente");
  //      this.dataSource.data[index]["state"] =  !this.dataSource.data[index]["state"];
  //     this.dataSource.data = [].concat(this.dataSource.data);
  //   }, err => {
  //     console.log(err);
  //   });
  // }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getPaymentMethods();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogFormPaymentMethod, {
      width: '50vw',
      panelClass: 'config-modal',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getPaymentMethods() {
    this.paymentMethodService.getPaymentMethods().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.payment_methods);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });
  }

  deletePaymentMethod(id,index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado',{
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
        this.paymentMethodService.deletePaymentMethod(id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
          this.dataSource.data.splice(index,1);
          this.dataSource.data = [].concat(this.dataSource.data);
        }, err => {
          console.log(err);
        });
      }
    });
  }

}

@Component({
  selector: 'dialog-form-payment-method',
  templateUrl: 'dialog-form-payment-method.html',
  styles : [`
    .content-header-modal{
      padding : 10px;
    }
  `]
})
export class DialogFormPaymentMethod {

  constructor(
    public dialogRef: MatDialogRef<DialogFormPaymentMethod>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

