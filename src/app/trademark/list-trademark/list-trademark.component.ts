import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { TrademarkService } from 'src/app/services/trademark/trademark.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { TrademarkFORMComponent } from '../trademark-form/trademark-form.component';

export interface Marca {
  state: boolean;
  description: string;
}

const ELEMENT_DATA: Marca[] = [];

@Component({
  selector: 'app-list-trademark',
  templateUrl: './list-trademark.component.html',
  styleUrls: ['./list-trademark.component.scss']
})
export class ListTrademarkComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['description', 'options' ];
  dataSource = new MatTableDataSource<any>([]);
  public isMobile : boolean ;
  subscription: Subscription;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    private trademark : TrademarkService,
    public coolDialogs: NgxCoolDialogsService,
  ) { 
    this.isMobile= this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => { 
      this.isMobile = isMobile;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.getTrademark();
  }

  getTrademark() {
    this.trademark.getAllTrademark().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.brand);
      this.dataSource.paginator = this.paginator;
    }, err => {
    });
  }

  deleteBrand(id,index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado',{
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
        this.trademark.deleteBrand(id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
          this.dataSource.data.splice(index,1);
          this.dataSource.data = [].concat(this.dataSource.data);
        }, err => {
          console.log(err);
        });
      }
    });
  }

  openDialog(id, index): void {
    const dialogRef = this.dialog.open(TrademarkFORMComponent, {
      maxWidth: '100vw',
      minWidth: '60vw',
      panelClass: 'config-modal',
      data: {}
    });
    if (id) dialogRef.componentInstance.trademarkID = id;
    dialogRef.componentInstance.hideBack = true;
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
        this.trademark.updateStateBrand({state: !this.dataSource.data[index]["state"]},id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
           this.dataSource.data[index]["state"] =  !this.dataSource.data[index]["state"];
          this.dataSource.data = [].concat(this.dataSource.data);
        }, err => {
          console.log(err);
        });
      }
    });
  }

}
