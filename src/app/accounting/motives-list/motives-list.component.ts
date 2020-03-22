import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { ReasonSpendingService } from 'src/app/services/reason-spending.service';

@Component({
  selector: 'app-motives-list',
  templateUrl: './motives-list.component.html',
  styleUrls: ['./motives-list.component.scss']
})
export class MotivesListComponent implements OnInit {


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public isMobile: boolean;
  subscription: Subscription;

  displayedColumns: string[] = ["position", "name", "description", "amount", "options",];
  dataSource: MatTableDataSource<any>;
  allSelected: boolean;
  showRemove: boolean;
  shop: number | null | string = "all";


  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    private coolDialogs: NgxCoolDialogsService,
    private reasonSpendingService: ReasonSpendingService
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
    const dialogRef = this.dialog.open(DialogMotivesForm, {
      maxWidth: '100vw',
      minWidth: '60vw',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  ngOnInit() {
    this.allSelected = false;
    this.showRemove = false;
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getReasonsSpending();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changeShop() {

  }

  checkedElement(value: boolean, index: number) {
    this.dataSource.data[index]["checked"] = value;
    if (!value) this.allSelected = false;
    else {
      this.showRemove = value;
      this.allSelected = this.dataSource.data.length === this.dataSource.data.filter(data => data.checked).length ? true : false;
    }
    this.showRemove = this.dataSource.data.filter(data => data.checked === true).length > 0 ? true : false;
  }

  selectAll(value: boolean) {
    this.allSelected = value;
    this.showRemove = value;
    this.dataSource.data.map(data => {
      data.checked = value;
      return data;
    });
    this.showRemove = this.dataSource.data.filter(data => data.checked === true).length > 0 ? true : false;
  }

  removeSelected() {
    this.dataSource.data = this.dataSource.data.filter(data => !data.checked);
    this.toastr.clear();
    this.toastr.success('Operación Exitosa');
    this.allSelected = this.showRemove = false;
  }


  changeVisibility(id, index, status) {
    // let action = '';

    // status == true ? (action = 'ocultará') : (action = 'mostrará');

    // this.coolDialogs.confirm(`Se ${action} el registro indicado`,{
    //   theme: 'material',
    //   okButtonText: 'Ok',
    //   cancelButtonText: 'Cancelar',
    //   title: '¿Desea realizar esta acción?'
    // })
    // .subscribe(res => {
    //   if (res) {
    //     this.reasonSpendingService.updateStateClient({state: !this.dataSource.data[index]["state"]},id).subscribe(res => {
    //       this.toastr.success("Operación realizada satisfactoriamente");
    //        this.dataSource.data[index]["state"] =  !this.dataSource.data[index]["state"];
    //       this.dataSource.data = [].concat(this.dataSource.data);
    //     }, err => {
    //       console.log(err);
    //     });
    //   }
    // });
  }


  getReasonsSpending() {
    this.reasonSpendingService.getReasonsSpending().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.reason_spending);
    }, err => {
      console.log(err);
    });
  }

  deleteReasonSpending(id, index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado', {
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
      .subscribe(res => {
        if (res) {
          this.reasonSpendingService.deleteReasonSpending(id).subscribe(res => {
            this.toastr.success("Operación realizada satisfactoriamente");
            this.dataSource.data.splice(index, 1);
            this.dataSource.data = [].concat(this.dataSource.data);
          }, err => {
            console.log(err);
          })
        }
      })
  }

}

@Component({
  selector: 'dialog-motives-form.html',
  templateUrl: 'dialog-motives-form.html',
})
export class DialogMotivesForm {

  constructor(
    public dialogRef: MatDialogRef<DialogMotivesForm>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}