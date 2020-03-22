import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { FixedAssetService } from 'src/app/services/fixed-asset.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { FixedAssetsFormComponent } from '../fixed-assets-form/fixed-assets-form.component';

@Component({
  selector: 'app-fixed-assets',
  templateUrl: './fixed-assets.component.html',
  styleUrls: ['./fixed-assets.component.scss']
})
export class FixedAssetsComponent implements OnInit, OnDestroy{

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['position', 'admission_date','detail', 'amount','product_type', 'options'];
  public isMobile: boolean;
  subscription: Subscription;
  dataSource: MatTableDataSource<any>;
  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    public fixedAssetService: FixedAssetService,
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

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getFixedAssets();
  }

  openDialog(id,index): void {
    const dialogRef = this.dialog.open(FixedAssetsFormComponent, {
      maxWidth: '100vw',
      minWidth: '60vw',
      panelClass: 'config-modal',
      data: {}
    });
    if(id) dialogRef.componentInstance.fixedAssetID = id;
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getFixedAssets() {
    this.fixedAssetService.getFixedAssets().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.fixed_asset);
    }, err => {
      console.log(err);
    });
  }

  deleteFixedAsset(id,index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado',{
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
        this.fixedAssetService.deleteFixedAsset(id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
          this.dataSource.data.splice(index,1);
          this.dataSource.data = [].concat(this.dataSource.data);
        }, err => {
          console.log(err);
        });
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
        this.fixedAssetService.updateStateFixedAsset({state: !this.dataSource.data[index]["state"]},id).subscribe(res => {
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
  //   this.fixedAssetService.updateStateFixedAsset({state: !this.dataSource.data[index]["state"]},id).subscribe(res => {
  //     this.toastr.success("Operación realizada satisfactoriamente");
  //      this.dataSource.data[index]["state"] =  !this.dataSource.data[index]["state"];
  //     this.dataSource.data = [].concat(this.dataSource.data);
  //   }, err => {
  //     console.log(err);
  //   });
  // }


}

@Component({
  selector: 'dialog-fixed-asset',
  templateUrl: 'dialog-fixed-asset.html',
  styles : []
})
export class DialogFixedAssetForm {

  constructor(
    public dialogRef: MatDialogRef<DialogFixedAssetForm>
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
