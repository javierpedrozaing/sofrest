import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { BranchTypeFormComponent } from '../branch-type-form/branch-type-form.component';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HeadquarterService } from 'src/app/services/headquarter.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';

export interface BranchType {
  description: string;
  status: boolean;
  name: any;
}

const ELEMENT_DATA: BranchType[] = [
  { description: 'Descripción', status: true, name: 'Tipo 1' },
  { description: 'Descripción', status: true, name: 'Tipo 2' },
  { description: 'Descripción 3', status: true, name: 'Tipo 3' },
];

@Component({
  selector: 'app-branch-type-list',
  templateUrl: './branch-type-list.component.html',
  styleUrls: ['./branch-type-list.component.scss']
})
export class BranchTypeListComponent implements OnInit, OnDestroy {

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
    public headquarterService: HeadquarterService,
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
    const dialogRef = this.dialog.open(BranchTypeFormComponent, {
      maxWidth: '100vw',
      minWidth: '60vw',
      panelClass: 'config-modal',
      data: {}
    });
    if (id) dialogRef.componentInstance.branchTypeID = id;
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
    this.getHeadquarterTypes();
  }

  getHeadquarterTypes() {
    // this.headquarterService.getWHeadquartersTypes().subscribe(res => {
    //   if(res.data) this.dataSource = new MatTableDataSource(res.data.headquarter_type);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // }, err => {
    //   console.log(err);
    // });
  }

  deleteHeadquarterType(id, index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado', {
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
      .subscribe(res => {
        if (res) {
          // this.headquarterService.deleteHeadquarterType(id).subscribe(res => {
          //   this.toastr.success("Operación realizada satisfactoriamente");
          //   this.dataSource.data.splice(index, 1);
          //   this.dataSource.data = [].concat(this.dataSource.data);
          // }, err => {
          //   console.log(err);
          // });
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
        // this.headquarterService.updateStateHeadquarterType({ state: !this.dataSource.data[index]["state"] }, id).subscribe(res => {
        //   this.toastr.success("Operación realizada satisfactoriamente");
        //   this.dataSource.data[index]["state"] = !this.dataSource.data[index]["state"];
        //   this.dataSource.data = [].concat(this.dataSource.data);
        // }, err => {
        //   console.log(err);
        // });
      }
    });
  }

  // changeVisibility(id, index) {
  //   this.headquarterService.updateStateHeadquarterType({ state: !this.dataSource.data[index]["state"] }, id).subscribe(res => {
  //     this.toastr.success("Operación realizada satisfactoriamente");
  //     this.dataSource.data[index]["state"] = !this.dataSource.data[index]["state"];
  //     this.dataSource.data = [].concat(this.dataSource.data);
  //   }, err => {
  //     console.log(err);
  //   });
  // }

}

@Component({
  selector: 'dialog-form-branch-type',
  templateUrl: 'dialog-form-branch-type.html',
})
export class DialogFormBranchType {
  @Input() hideBack: boolean;
  constructor(
    public dialogRef: MatDialogRef<DialogFormBranchType>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
