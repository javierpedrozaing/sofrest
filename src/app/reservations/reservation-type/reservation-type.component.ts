import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HeadquarterService } from 'src/app/services/headquarter.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { ReservationTypeFormComponent } from '../reservation-type-form/reservation-type-form.component';
import { ReservationTypeService } from 'src/app/services/reservation-type.service';

@Component({
  selector: 'app-reservation-type',
  templateUrl: './reservation-type.component.html',
  styleUrls: ['./reservation-type.component.scss']
})
export class ReservationTypeComponent implements OnInit {

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
    public reservationTypeService: ReservationTypeService,
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
    const dialogRef = this.dialog.open(ReservationTypeFormComponent, {
      maxWidth: '100vw',
      minWidth: '60vw',
      panelClass: 'config-modal',
      data: {}
    });
    if (id) dialogRef.componentInstance.reservationTypeID = id;
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
    this.getReservationTypes();
  }

  getReservationTypes() {
    this.reservationTypeService.getReservationTypes().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.reservation_types);
    }, err => {
      console.log(err);
    });
  }

  deleteReservationType(id, index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado', {
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
      .subscribe(res => {
        if (res) {
          this.reservationTypeService.deleteReservationType(id).subscribe(res => {
            this.toastr.success("Operación realizada satisfactoriamente");
            this.dataSource.data.splice(index, 1);
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
        this.reservationTypeService.updateStateReservationType({ state: !this.dataSource.data[index]["state"] }, id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
          this.dataSource.data[index]["state"] = !this.dataSource.data[index]["state"];
          this.dataSource.data = [].concat(this.dataSource.data);
        }, err => {
          console.log(err);
        });
      }
    });
  }

}
