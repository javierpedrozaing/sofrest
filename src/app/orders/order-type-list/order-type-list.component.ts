import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { DocumentService } from 'src/app/services/document.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

export interface OrderType {
  description: string;
  code: string;
  type: string;
  status: boolean;
}

const ELEMENT_DATA: OrderType[] = [
  { description: 'Tipo 1', status : true, code : '0123456', type : 'Ingreso' },
  { description: 'Tipo 2', status : true, code : '0123456', type : 'Ingreso' },
  { description: 'Tipo 3', status : true, code : '0123456', type : 'Ingreso' },
];

@Component({
  selector: 'app-order-type-list',
  templateUrl: './order-type-list.component.html',
  styleUrls: ['./order-type-list.component.scss']
})
export class OrderTypeListComponent implements OnInit,OnDestroy
 {


  displayedColumns: string[] = ['position', 'description', 'code', 'type', 'options' ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: MatTableDataSource<any>
  public isMobile : boolean;
  subscription: Subscription;
  
  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    public documentService: DocumentService,
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
    const dialogRef = this.dialog.open(DialogFormOrderType, {
      width: '50vw'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getDocumentTypes() {
    this.documentService.getDocumentTypes().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.document_types);
    }, err => {
      console.log(err);
    });
  }

  changeVisibility(id,index,status) {
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
        this.documentService.updateStateDocumentType({state: !this.dataSource.data[index]["state"]},id).subscribe(res => {
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
  //   this.documentService.updateStateDocumentType({state: !this.dataSource.data[index]["state"]},id).subscribe(res => {
  //     this.toastr.success("Operación realizada satisfactoriamente");
  //      this.dataSource.data[index]["state"] =  !this.dataSource.data[index]["state"];
  //     this.dataSource.data = [].concat(this.dataSource.data);
  //   }, err => {
  //     console.log(err);
  //   });
  // }

  deleteCategory(id,index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado',{
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
        this.documentService.deleteDocumentType(id).subscribe(res => {
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
    this.dataSource = new MatTableDataSource<any>([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getDocumentTypes();
  }

}



@Component({
  selector: 'dialog-form-order-type',
  templateUrl: 'dialog-form-order-type.html',
})
export class DialogFormOrderType {

  constructor(
    public dialogRef: MatDialogRef<DialogFormOrderType>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
