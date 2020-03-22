import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { RolesService } from 'src/app/services/roles.service';

export interface Role {
  description: string;
  status: boolean;
}

const ELEMENT_DATA: Role[] = [

];


@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['position','name', 'description', 'options', ];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource : MatTableDataSource<any>;
public isMobile : boolean ;
  subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    private coolDialogs: NgxCoolDialogsService,
    private role : RolesService
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
    const dialogRef = this.dialog.open(DialogFormRole, {
      width: '50vw',
      panelClass: 'config-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  changeVisibility(idx,status) {
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
        this.dataSource[idx].status = !this.dataSource[idx].status;
        // this.categoryService.updateStateCategory({state: !this.dataSource.data[index]["state"]},id).subscribe(res => {
        //   this.toastr.success("Operación realizada satisfactoriamente");
        //    this.dataSource.data[index]["state"] =  !this.dataSource.data[index]["state"];
        //   this.dataSource.data = [].concat(this.dataSource.data);
        // }, err => {
        //   console.log(err);
        // });
      }
    });
  }

  getRoles() {
    this.role.getRoles().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.role);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });
  }

  getRole(id) {
    this.role.getRole(id).subscribe(res => {
      if(res.data){
        if(res.data.role.length===0) this.toastr.error("No se encuentra el registro indicado")
        else{
          
        }
        
      }
    }, err => {
      console.log(err);
    });
  }


  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getRoles();
  }

}

@Component({
  selector: 'dialog-form-role',
  templateUrl: 'dialog-form-role.html',
})
export class DialogFormRole {

  constructor(
    public dialogRef: MatDialogRef<DialogFormRole>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

