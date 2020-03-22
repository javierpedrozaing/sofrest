import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { ComboFormComponent } from '../combo-form/combo-form.component';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { ComboService } from 'src/app/services/combo.service';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.scss']
})
export class ComboComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['combo', 'price', 'cost','margin', 'options'];
  public isMobile: boolean;
  subscription: Subscription;
  dataSource: MatTableDataSource<any>;
  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    public comboService: ComboService,
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


  openDialog(): void {
    const dialogRef = this.dialog.open(ComboFormComponent, {
      maxWidth : '100vw',
      minWidth: '60vw',
      panelClass: 'config-modal',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getCombos() {
    this.comboService.getCombos().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.combo);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });
  }

  deleteCombo(id,index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado',{
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
        this.comboService.deleteCombo(id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
          this.dataSource.data.splice(index,1);
          this.dataSource.data = [].concat(this.dataSource.data);
        }, err => {
          console.log(err);
        });
      }
    });
  }

  changeVisibility(id,index,state) {
    let action = '';

    state == true ? (action = 'ocultará') : (action = 'mostrará');

    this.coolDialogs.confirm(`Se ${action} el registro indicado`,{
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
        this.comboService.updateStateCombo({state: !this.dataSource.data[index]["state"]},id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
           this.dataSource.data[index]["state"] =  !this.dataSource.data[index]["state"];
          this.dataSource.data = [].concat(this.dataSource.data);
        }, err => {
          console.log(err);
        });
      }
    });
  }


  ngOnInit() {
    this.dataSource = new MatTableDataSource([
    ]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getCombos();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

