import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { HeadquarterService } from 'src/app/services/headquarter.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

export interface Branch {
  branch_type: string;
  ubigeo: string;
  phone: string;
  direction: string;
  status: boolean;
  name: any;
}

const ELEMENT_DATA: Branch[] = [
  { phone: '0000000', direction: 'Dirección', status: true, ubigeo: 'Ubicacion', branch_type: 'Sucursal Tipo 1', name: 'Sucursal 1' },
  { phone: '0000000', direction: 'Dirección', status: true, ubigeo: 'Ubicacion', branch_type: 'Sucursal Tipo 1', name: 'Sucursal 2' },
  { phone: '0000000', direction: 'Dirección', status: true, ubigeo: 'Ubicacion', branch_type: 'Sucursal Tipo 1', name: 'Sucursal 3' },
];


@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss']
})
export class BranchListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['position', 'description', 'address', 'ubigeo', 'code', 'options'];
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

  getHeadquarters() {
    this.headquarterService.getHeadquarters().subscribe(res => {
      if(res.data)  this.dataSource = new MatTableDataSource(res.data.headquarters);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });
  }

  deleteHeadquarter(id, index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado', {
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
      .subscribe(res => {
        if (res) {
          this.headquarterService.deleteHeadquarter(id).subscribe(res => {
            this.toastr.success("Operación realizada satisfactoriamente");
            this.dataSource.data.splice(index, 1);
            this.dataSource.data = [].concat(this.dataSource.data);
          }, err => {
            console.log(err);
          });
        }
      });
  }

  changeVisibility(id, index,status) {
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
        this.headquarterService.updateStateHeadquarter({state: !this.dataSource.data[index]["state"]},id).subscribe(res => {
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
  //   this.headquarterService.updateStateHeadquarter({state: !this.dataSource.data[index]["state"]},id).subscribe(res => {
  //     this.toastr.success("Operación realizada satisfactoriamente");
  //      this.dataSource.data[index]["state"] =  !this.dataSource.data[index]["state"];
  //     this.dataSource.data = [].concat(this.dataSource.data);
  //   }, err => {
  //     console.log(err);
  //   });
  // }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogFormBranch, {
      width: '50vw'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {
    this.getHeadquarters();
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

@Component({
  selector: 'dialog-form-branch',
  templateUrl: 'dialog-form-branch.html',
})
export class DialogFormBranch {

  constructor(
    public dialogRef: MatDialogRef<DialogFormBranch>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
