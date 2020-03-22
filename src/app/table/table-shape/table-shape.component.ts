import { Component, OnInit, ViewChild, Inject, OnDestroy, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { TableShapeService } from 'src/app/services/table-shape.service';


@Component({
  selector: 'app-table-shape',
  templateUrl: './table-shape.component.html',
  styleUrls: ['./table-shape.component.scss']
})
export class TableShapeComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['description', 'options'];
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
    public tableShapeService: TableShapeService,
    private coolDialogs: NgxCoolDialogsService
  ) {
    this.isMobile = this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  getTableShapes() {
    this.tableShapeService.getTableShapes().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.table_shapes);
    }, err => {
      console.log(err);
    });
  }

  deleteTableShape(id, index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado', {
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
      .subscribe(res => {
        if (res) {
          this.tableShapeService.deleteTableShape(id).subscribe(res => {
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

    this.coolDialogs.confirm(`Se ${action} el registro indicado`, {
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
      .subscribe(res => {
        if (res) {
          this.tableShapeService.updateStateTableShape({ state: !this.dataSource.data[index]["state"] }, id).subscribe(res => {
            this.toastr.success("Operación realizada satisfactoriamente");
            this.dataSource.data[index]["state"] = !this.dataSource.data[index]["state"];
            this.dataSource.data = [].concat(this.dataSource.data);
          }, err => {
            console.log(err);
          });
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog(id, index): void {
    const dialogRef = this.dialog.open(TableShapesFormComponent, {
      maxWidth: '50vw',
      minWidth: '60vw',
      panelClass: 'config-modal',
      data: {}
    });
    if(id) dialogRef.componentInstance.shapeID = id;
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
    this.getTableShapes();
    this.dataSource.paginator = this.paginator;
  }

}

@Component({
  selector: 'table-shapes-form-component',
  templateUrl: 'table-shapes-form-component.html',
})
export class TableShapesFormComponent {

  @Input() shapeID: any;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public tableShapeService: TableShapeService,
    public dialogRef: MatDialogRef<TableShapesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = fb.group({
      description: [null, [Validators.required]],
      state: [true, [Validators.required]]
    });
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if(this.shapeID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.tableShapeService.createTableShape(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if (this.dialogRef) {
        this.dialogRef.close(res.data.createTableShape);
      }
    }, err => {
      console.log(err);
    });
  }

  edit(data: any) {
    this.tableShapeService.updateTableShape(this.shapeID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.updateTableShape);
      }
    }, err => {
      console.log(err);
    });
}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
