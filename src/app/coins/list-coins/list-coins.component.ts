import { Component, OnInit, ViewChild, Inject, OnDestroy, SimpleChanges, OnChanges, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { CoinService } from 'src/app/services/coin.service';

@Component({
  selector: 'app-list-coins',
  templateUrl: './list-coins.component.html',
  styleUrls: ['./list-coins.component.scss']
})
export class ListCoinsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'code', 'symbol', 'options'];
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
    public coinService: CoinService,
    private coolDialogs: NgxCoolDialogsService
  ) {
    this.isMobile = this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  getCoins() {
    this.coinService.getCoins().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.coins);
      this.dataSource.paginator = this.paginator;
    }, err => {
      console.log(err);
    });
  }

  deleteCoin(id,index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado',{
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
        this.coinService.deleteCoin(id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
          this.dataSource.data.splice(index,1);
         this.dataSource.data = [].concat(this.dataSource.data);
        }, err => {
          console.log(err);
        });
      }
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
        this.coinService.updateStateCoin({state: !this.dataSource.data[index]["state"]},id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
           this.dataSource.data[index]["state"] =  !this.dataSource.data[index]["state"];
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

  openDialog(id,index): void {
    const dialogRef = this.dialog.open(CoinsFormComponent, {
      maxWidth: '100vw',
      minWidth: '60vw',
      panelClass: 'config-modal',
      data: {}
    });
    if(id) dialogRef.componentInstance.coinID = id;
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(id){
          this.dataSource.data[index] = result;
        }else{
          this.dataSource.data.push(result);
        }
        this.dataSource.data =  [].concat(this.dataSource.data);
      }
    });
  }

  ngOnInit() {
    this.getCoins();
    this.dataSource.paginator = this.paginator;
  }

}

@Component({
  selector: 'app-coins-form-dialog',
  templateUrl: 'coins-form-dialog.html',
})
export class CoinsFormComponent {

  @Input() coinID: any;
  public form: FormGroup;
  public checked : boolean = true;

  constructor(
    public dialogRef: MatDialogRef<CoinsFormComponent>,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public coinService: CoinService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.form = fb.group({
        description: [null, [Validators.required]],
        code: [null, [Validators.required]],
        symbol: [null, [Validators.required]],
        state : [true, [Validators.required]]
      });
    }

    ngOnInit() {
      if(this.coinID){
        this.getCoin(this.coinID);
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['coinID']){
      this.getCoin(this.coinID);
    }
   }

   submit(data: any, formDirective: FormGroupDirective) {
    if(this.coinID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.coinService.createCoin(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.createCoin);
      }
    }, err => {
      console.log(err);
    });
  }

  getCoin(id){
    this.coinService.getCoin(id).subscribe(res => {
      if(res.data){
        if(res.data.coins.length ===  0){
          this.toastr.error("No se encuentra el registro indicado")
        }else{
          this.form.patchValue({
            description: res.data.coins[0].description,
            code: res.data.coins[0].code,
            symbol: res.data.coins[0].symbol,
            state: res.data.coins[0].state,
          });
        }
      }
    }, err => {
      console.log(err);
    });

  }

  edit(data: any) {
    this.coinService.updateCoin(this.coinID,data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.updateCoin);
      }
    }, err => {
      console.log(err);
    });
}

}
