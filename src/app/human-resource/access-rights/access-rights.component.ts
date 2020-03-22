import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { ToastrService } from 'ngx-toastr';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';

export interface AccessPermits {
  role: string;
  access : string;
  employees : number;
  checked: boolean;
  canChecked: boolean;
  status: boolean;
}
@Component({
  selector: 'app-access-rights',
  templateUrl: './access-rights.component.html',
  styleUrls: ['./access-rights.component.scss']
})
export class AccessRightsComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['position', 'role', "access", "employees", "status"];
  dataSource : MatTableDataSource<AccessPermits>;

  public isMobile : boolean ;
  subscription: Subscription;
  allSelected : boolean;
  showRemove : boolean;


  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    private coolDialogs: NgxCoolDialogsService
  ) {
        this.isMobile= this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
   }

     ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogGroupForm, {
      width: '80vw'
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
        this.dataSource.data[idx].status = !this.dataSource.data[idx].status;
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

  ngOnInit() {
    this.allSelected = false;
    this.showRemove = false;
    this.dataSource = new MatTableDataSource([
      {
        "role" : "Propietario", status: true, canChecked : false,  checked : false, access: "Back office y Dispositivos Moviles", employees : 1,
      },
      {
        "role" : "Administrador", status: true, canChecked : true,  checked : false, access: "Back office y Dispositivos Moviles", employees : 1,
      },
      {
        "role" : "Propietario", status: true, canChecked : true,  checked : false, access: "Back office y Dispositivos Moviles", employees : 1,
      },

    ]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changeShop(){

  }

  checkedElement(value: boolean, index : number){
    this.dataSource.data[index]["checked"] = value;
    if(!value) this.allSelected = false;
    else{
      this.showRemove = value;
      this.allSelected = this.dataSource.data.filter(data => data.canChecked).length === this.dataSource.data.filter(data => data.checked).length  ? true : false;
    }
    this.showRemove = this.dataSource.data.filter(data => data.checked === true).length > 0  ? true : false;
  }

  selectAll(value: boolean){
    this.allSelected = value;
    this.showRemove = value;
    this.dataSource.data.map(data => {
        if(data.canChecked) data.checked = value;
        return data;
    });
    this.showRemove = this.dataSource.data.filter(data => data.checked === true).length > 0  ? true : false;
  }

  removeSelected(){
    this.dataSource.data = this.dataSource.data.filter(data => !data.canChecked || !data.checked);
    this.toastr.clear();
    this.toastr.success('Operación Exitosa');
    this.allSelected = this.showRemove = false;
  }

}


@Component({
  selector: 'dialog-group-form.html',
  templateUrl: 'dialog-group-form.html',
})
export class DialogGroupForm {

  constructor(
    public dialogRef: MatDialogRef<DialogGroupForm>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
