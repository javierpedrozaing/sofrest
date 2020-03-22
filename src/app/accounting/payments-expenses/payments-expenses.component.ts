import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { ToastrService } from 'ngx-toastr';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { ReasonSpendingService } from 'src/app/services/reason-spending.service';
import { ExpenditureService } from 'src/app/services/expenditure.service';

@Component({
  selector: 'app-payments-expenses',
  templateUrl: './payments-expenses.component.html',
  styleUrls: ['./payments-expenses.component.scss']
})
export class PaymentsExpensesComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public isMobile : boolean ;
  subscription: Subscription;

  displayedColumns: string[] = ["position","date","motive","amount","payment","options",];
  dataSource : MatTableDataSource<any>;
  allSelected : boolean;
  showRemove : boolean;
  shop : number | null | string = "all";

  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    private coolDialogs: NgxCoolDialogsService,
    private reasonSpendingService: ReasonSpendingService,
    private expenditureService : ExpenditureService
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
    const dialogRef = this.dialog.open(DialogPaymentExpensesForm, {
    maxWidth : '100vw',
    minWidth: '60vw',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  ngOnInit() {
    this.allSelected = false;
    this.showRemove = false;
    this.dataSource = new MatTableDataSource([

    ]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getExpenditures();
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

  getExpenditures() {
    this.expenditureService.getExpenditures().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.expenditure);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });
  }

  sendPay(id,index){

  }

  deleteExpenditure(id, index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado', {
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
      .subscribe(res => {
        if (res) {
          this.expenditureService.deleteExpenditure(id).subscribe(res => {
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
  selector: 'dialog-payment-expenses.html',
  templateUrl: 'dialog-payment-expenses.html',
})
export class DialogPaymentExpensesForm {

  constructor(
    public dialogRef: MatDialogRef<DialogPaymentExpensesForm>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}