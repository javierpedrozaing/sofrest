import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormMeasurementUnitComponent } from '../form-measurement-unit/form-measurement-unit.component';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MeasurementUnitService } from 'src/app/services/measurement-unit.service';

export interface MeasurementUnit {
  description: string;
  code: string;
  sunat_code: string;
  status: boolean;
}

const ELEMENT_DATA: MeasurementUnit[] = [
  { description: 'Unidad de Medida 1', status: true, code: '0123456', sunat_code: '789654v4' },
  { description: 'Unidad de Medida 2', status: true, code: '0123456', sunat_code: '789654v4' },
  { description: 'Unidad de Medida 3', status: true, code: '0123456', sunat_code: '789654v4' },
];

@Component({
  selector: 'app-list-measurement-unit',
  templateUrl: './list-measurement-unit.component.html',
  styleUrls: ['./list-measurement-unit.component.scss']
})
export class ListMeasurementUnitComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['position', 'description', 'sunat_code', 'options',];
  //displayedColumns: string[] = ['position', 'description', 'code', 'sunat_code', 'status', 'options', ];
  public isMobile: boolean;
  subscription: Subscription;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource : MatTableDataSource<any>;

  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    public measurementUnitService: MeasurementUnitService,
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
    const dialogRef = this.dialog.open(DialogFormMeasurementUnit, {
      width: '50vw',
      panelClass: 'config-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getMeasurementUnit();
  }

  getMeasurementUnit() {
    this.measurementUnitService.getMeasurementUnits().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.measurement_units);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });
  }

}

@Component({
  selector: 'dialog-form-measurement-unit',
  templateUrl: 'dialog-form-measurement-unit.html',
})
export class DialogFormMeasurementUnit {

  constructor(
    public dialogRef: MatDialogRef<DialogFormMeasurementUnit>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
