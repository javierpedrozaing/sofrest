import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormStoreComponent } from '../form-store/form-store.component';
import { StockStoreComponent } from '../stock-store/stock-store.component';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

export interface Store {
  description: string;
  direction: string;
  status: boolean;
  store_type: any;
}

const ELEMENT_DATA: Store[] = [
  { description: 'Almacen 1', direction: 'Direccion', status: true, store_type: 1 },
  { description: 'Almacen 2', direction: 'Direccion', status: true, store_type: 1 },
  { description: 'Almacen 3', direction: 'Direccion', status: true, store_type: 1 },
];

@Component({
  selector: 'app-list-store',
  templateUrl: './list-store.component.html',
  styleUrls: ['./list-store.component.scss']
})
export class ListStoreComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['position', 'description', 'address', 'store_type', 'options',];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: MatTableDataSource<any>
  public isMobile: boolean;
  subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    public warehouseService: WarehouseService,
    private coolDialogs: NgxCoolDialogsService
  ) {
    this.isMobile = this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog(id, index): void {
    const dialogRef = this.dialog.open(FormStoreComponent, {
      maxWidth: '100vw',
      minWidth: '60vw',
      panelClass: 'config-modal'
    });
    if (id) dialogRef.componentInstance.storeID = id;
    dialogRef.componentInstance.showClose = true;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (id) {
          this.dataSource.data[index] = result;
        } else {
          this.dataSource.data.push(result);
        }
        this.dataSource.data = [].concat(this.dataSource.data);
      }
    });
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
        this.warehouseService.updateStateWarehouse({ state: !this.dataSource.data[index]["state"] }, id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
          this.dataSource.data[index]["state"] = !this.dataSource.data[index]["state"];
          this.dataSource.data = [].concat(this.dataSource.data);
        }, err => {
          console.log(err);
        });
      }
    });
  }

  // changeVisibility(id, index) {
  //   this.warehouseService.updateStateWarehouse({ state: !this.dataSource.data[index]["state"] }, id).subscribe(res => {
  //     this.toastr.success("Operación realizada satisfactoriamente");
  //     this.dataSource.data[index]["state"] = !this.dataSource.data[index]["state"];
  //     this.dataSource.data = [].concat(this.dataSource.data);
  //   }, err => {
  //     console.log(err);
  //   });
  // }

  openDialogStockStore(id): void {
    const dialogRef = this.dialog.open(DialogStockStore, {
      width: '50vw',
      panelClass: 'config-modal'
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>([]);
    this.getWarehouses();
  }

  getWarehouses() {
    this.warehouseService.getWarehouses().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.warehouses);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });
  }

  deleteWarehouse(id, index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado', {
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
      .subscribe(res => {
        if (res) {
          this.warehouseService.deleteWarehouse(id).subscribe(res => {
            this.toastr.success("Operación realizada satisfactoriamente");
            this.dataSource.data.splice(index, 1);
            this.dataSource.data = [].concat(this.dataSource.data);
          }, err => {
            console.log(err);
          });
        }
      });
  }

}

@Component({
  selector: 'dialog-form-store',
  templateUrl: 'dialog-form-store.html',
})
export class DialogFormStore {

  constructor(
    public dialogRef: MatDialogRef<DialogFormStore>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-stock-store',
  templateUrl: 'dialog-stock-store.html',
})
export class DialogStockStore {

  constructor(
    public dialogRef: MatDialogRef<DialogFormStore>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
