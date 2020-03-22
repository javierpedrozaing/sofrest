import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { ProvidersService } from 'src/app/services/providers.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { ClientMemberFormComponent } from '../client-member-form/client-member-form.component';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-member-list',
  templateUrl: './client-member-list.component.html',
  styleUrls: ['./client-member-list.component.scss']
})
export class ClientMemberListComponent implements OnInit,OnDestroy {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource : MatTableDataSource<any>;
  displayedColumns: string[] = ['position', 'name', 'phone', 'ruc', 'email', 'options', ];
  allSelected : boolean;
  showRemove : boolean;
public isMobile : boolean ;
  subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    private coolDialogs: NgxCoolDialogsService,
    public clientService: ClientService,
  ) {
    this.isMobile= this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ClientMemberFormComponent, {
      width: '50vw'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  ngOnInit() {
    this.allSelected = false;
    this.showRemove = false;
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getClients();
  }

  changeVisibility(id, index,status) {
    let action = '';

    status == true ? (action = 'ocultará') : (action = 'mostrará');

    this.coolDialogs.confirm(`Se ${action} el registro indicado`,{
      theme: 'material',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
        this.clientService.updateStateClient({state: !this.dataSource.data[index]["state"]},id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
           this.dataSource.data[index]["state"] =  !this.dataSource.data[index]["state"];
          this.dataSource.data = [].concat(this.dataSource.data);
        }, err => {
          console.log(err);
        });
      }
    });
  }


  getClients() {
    this.clientService.getClients().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.clients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });
  }

  deleteClient(id, index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado',{
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
    this.clientService.deleteClient(id).subscribe(res => {
      this.toastr.success("Operación realizada satisfactoriamente");
      this.dataSource.data.splice(index,1);
      this.dataSource.data = [].concat(this.dataSource.data);
    }, err => {
      console.log(err);
    })
  }
})
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  checkedElement(value: boolean, index : number){
    this.dataSource.data[index]["checked"] = value;
    if(!value) this.allSelected = false;
    else{
      this.showRemove = value;
      this.allSelected = this.dataSource.data.length === this.dataSource.data.filter(data => data.checked).length  ? true : false;
    }
    this.showRemove = this.dataSource.data.filter(data => data.checked === true).length > 0  ? true : false;
  }

  selectAll(value: boolean){
    this.allSelected = value;
    this.showRemove = value;
    this.dataSource.data.map(data => {
        data.checked = value;
        return data;
    });
    this.showRemove = this.dataSource.data.filter(data => data.checked === true).length > 0  ? true : false;
  }

  removeSelected(){
    this.dataSource.data = this.dataSource.data.filter(data => !data.checked);
    this.toastr.clear();
    this.toastr.success('Operación Exitosa');
    this.allSelected = this.showRemove = false;
  }

}
