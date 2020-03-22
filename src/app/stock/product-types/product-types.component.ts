import { Component, OnInit, ViewChild, OnDestroy, Inject, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort } from '@angular/material';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { ToastrService } from 'ngx-toastr';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { ProductTypesFormComponent } from './product-types-form/product-types-form.component';

@Component({
  selector: 'app-product-types',
  templateUrl: './product-types.component.html',
  styleUrls: ['./product-types.component.scss']
})
export class ProductTypesComponent implements OnInit, OnDestroy {

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public isMobile: boolean;
  displayedColumns: string[] = ['description', 'code', 'options'];
  dataSource = new MatTableDataSource<any>([]);
  subscription: Subscription;

  constructor(
    private screenMobileChangeService: ScreenMobileChangeService,
    private productTypeService: ProductTypeService,
    public dialog: MatDialog,
    public coolDialogs: NgxCoolDialogsService,
    private toastr: ToastrService,
  ) {
    this.isMobile = this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changeVisibility(id, index,status) {
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
        this.productTypeService.updateStateTypeProduct({state: !this.dataSource.data[index]["state"]},id).subscribe(res => {
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
  //   this.productTypeService.updateStateTypeProduct({state: !this.dataSource.data[index]["state"]},id).subscribe(res => {
  //     this.toastr.success("Operación realizada satisfactoriamente");
  //      this.dataSource.data[index]["state"] =  !this.dataSource.data[index]["state"];
  //     this.dataSource.data = [].concat(this.dataSource.data);
  //   }, err => {
  //     console.log(err);
  //   });
  // }

  getProductTypes() {
    this.productTypeService.getProductTypes().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.type_products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });
  }

  deleteProductType(id,index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado',{
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
        this.productTypeService.deleteTypeProduct(id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
          this.dataSource.data.splice(index,1);
          this.dataSource.data = [].concat(this.dataSource.data);
        }, err => {
          console.log(err);
        });
      }
    });
  }

  openDialog(id,index): void {
    const dialogRef = this.dialog.open(ProductTypesFormComponent, {
      maxWidth: '100vw',
      minWidth: '60vw',
      panelClass: 'config-modal',
      data: {}
    });
    if (id) { dialogRef.componentInstance.productTypesID = id };
    dialogRef.componentInstance.hideBack = true;
    dialogRef.componentInstance.showClose = true;
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(id){
          this.dataSource.data[index] = result;
        }else{
          this.dataSource.data.push(result);
        }
        this.dataSource.data = [].concat(this.dataSource.data);
      }
      //this.getProductTypes();
    });
  }

  ngOnInit() {
    this.getProductTypes();
  }

}

@Component({
  selector: 'app-product-types-container-form-dialog',
  templateUrl: 'product-types-form-dialog.html',
})
export class ProductTypesContainerFormComponent {

  @Input() productTypeID: any;

  constructor(
    private productTypeService: ProductTypeService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ProductTypesContainerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
