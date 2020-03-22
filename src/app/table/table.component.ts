import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from "@angular/router";
import { TableService } from '../services/table.service';
import { HeadquarterService } from '../services/headquarter.service';
import { TableShapeService } from '../services/table-shape.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'headquarter', 'table_shape', 'options',];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public isMobile: boolean;
  subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private tableService: TableService,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
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

  getTables() {
    this.tableService.getTables().subscribe(response => {
      if(response.data) this.dataSource.data = [].concat(response.data.tables);
    })
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(newTable, {
      width: '50vw',
      panelClass: 'config-modal',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTables();
    });
  }

  deleteTable(id,index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado',{
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
        this.tableService.deleteTable(id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
          this.dataSource.data.splice(index,1);
          this.dataSource.data = [].concat(this.dataSource.data);
        }, err => {
          console.log(err);
        });
      }
    });
  }

  ngOnInit() {
    this.getTables();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

@Component({
  selector: 'data-new-salon',
  templateUrl: 'new-table.html',
  styles: [`
    .content-header-modal{
      padding : 10px;
    }
  `]
})
export class newTable implements OnInit {

  newTable: FormGroup;
  headquarters: any;
  tableShapes: any;

  constructor(
    private _formBuilder: FormBuilder,
    private headquarterService: HeadquarterService,
    private tableShapeService: TableShapeService,
    private tableService: TableService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<newTable>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {

    this.newTable = this._formBuilder.group({
      name: [null, Validators.required],
      state: [true, Validators.required],
      headquarter_id: [null, Validators.required],
      table_shape_id: [null, Validators.required],
    });
  }

  getHeadquarters() {
    this.headquarterService.getHeadquarters().subscribe(response => {
      if(response.data) this.headquarters = response.data.headquarters;
    })
  }

  getTableShapes() {
    this.tableShapeService.getTableShapes().subscribe(response => {
      if(response.data) this.tableShapes = response.data.table_shapes;
    })
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if (this.data.id) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.tableService.createTable(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if (this.dialogRef) {
        this.dialogRef.close(res.data.createTable);
      }
    }, err => {
      console.log(err);
    });
  }

  getTable(id) {
    this.tableService.getTable(id).subscribe(res => {
      if(res.data){
      if(res.data){
      if (res.data.tables.length === 0) {
        this.toastr.error("No se encuentra el registro indicado")
      } else {
        this.newTable.patchValue({
          name: res.data.tables[0].name,
          headquarter_id: res.data.tables[0].headquarter.id,
          table_shape_id: res.data.tables[0].table_shape.id,
        });
      }
    }
    }
    }, err => {
      console.log(err);
    });
  }

  edit(data: any) {
    this.newTable.value['state'] = 1;
    this.tableService.updateTable(this.data.id, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if (this.dialogRef) {
        this.dialogRef.close(res.data.updateTable);
      }
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.getHeadquarters();
    this.getTableShapes();
    if (this.data.id) {
      this.getTable(this.data.id);
    }
  }
}
