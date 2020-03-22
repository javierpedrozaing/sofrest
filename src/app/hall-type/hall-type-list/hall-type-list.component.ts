import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HeadquarterService } from 'src/app/services/headquarter.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { HallTypeFormComponent } from '../hall-type-form/hall-type-form.component';
import { HallTypeService } from 'src/app/services/hall-type.service';

@Component({
  selector: 'app-hall-type-list',
  templateUrl: './hall-type-list.component.html',
  styleUrls: ['./hall-type-list.component.scss']
})
export class HallTypeListComponent implements OnInit {


  displayedColumns: string[] = ['position', 'description', 'options',];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  public isMobile: boolean;
  subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    public hallTypeService: HallTypeService,
    private coolDialogs: NgxCoolDialogsService,
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
    const dialogRef = this.dialog.open(HallTypeFormComponent, {
      maxWidth: '100vw',
      minWidth: '60vw',
      panelClass: 'config-modal',
      data: {}
    });
    if (id) dialogRef.componentInstance.hallTypeID = id;
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

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getHallTypes();
  }

  getHallTypes() {
    this.hallTypeService.getHallTypes().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.hall_types);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });
  }

  deleteHallType(id, index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado', {
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
      .subscribe(res => {
        if (res) {
          this.hallTypeService.deleteHallType(id).subscribe(res => {
            this.toastr.success("Operación realizada satisfactoriamente");
            this.dataSource.data.splice(index, 1);
            this.dataSource.data = [].concat(this.dataSource.data);
          }, err => {
            console.log(err);
          });
        }
      });
  }

  changeVisibility(id, index) {
    this.hallTypeService.updateStateHallType({ state: !this.dataSource.data[index]["state"] }, id).subscribe(res => {
      this.toastr.success("Operación realizada satisfactoriamente");
      this.dataSource.data[index]["state"] = !this.dataSource.data[index]["state"];
      this.dataSource.data = [].concat(this.dataSource.data);
    }, err => {
      console.log(err);
    });
  }

}
