import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BoxService } from 'src/app/services/box.service';
import { HeadquarterService } from 'src/app/services/headquarter.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { Subscription } from 'rxjs';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { CoinService } from 'src/app/services/coin.service';

export interface registers {
  name: string;
  status: boolean;
  ip: string;
  serial: string;
  description: string;
}

const ELEMENT_DATA: registers[] = [
  { name: 'Caja 1', ip: '192.168.1.2', serial: 'ABC123', status: true, description: 'Test' }
];

@Component({
  selector: 'app-cash-register',
  templateUrl: './cash-register.component.html',
  styleUrls: ['./cash-register.component.scss']
})
export class CashRegisterComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'ip', 'serial', 'status', 'options'];
  dataSource = new MatTableDataSource<any>([]);
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public isMobile: boolean;
  subscription: Subscription;

  constructor(public dialog: MatDialog, private toastr: ToastrService,
    private coolDialogs: NgxCoolDialogsService,
    public boxService: BoxService,
    private screenMobileChangeService: ScreenMobileChangeService,
    ) {
      this.isMobile = this.screenMobileChangeService.isMobile;
      this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
        this.isMobile = isMobile;
      });
    }

    getBoxes() {
    this.boxService.getBoxes().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.box);
    }, err => {
      console.log(err);
    });
  }

  deleteBox(id, index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado', {
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
      .subscribe(res => {
        if (res) {
          this.boxService.deleteBox(id).subscribe(res => {
            this.toastr.success("Operación realizada satisfactoriamente");
            this.dataSource.data.splice(index, 1);
            this.dataSource.data = [].concat(this.dataSource.data);
          }, err => {
            console.log(err);
          });
        }
      });
  }

  openDialog(id,index): void {
    const dialogRef = this.dialog.open(NewCashRegisterDialog, {
      maxWidth: '100vw',
      minWidth: '60vw',
      data: (id) ? { id } : {}
    });

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
        this.boxService.updateStateBox({ state: !this.dataSource.data[index]["state"] }, id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
          this.dataSource.data[index]["state"] = !this.dataSource.data[index]["state"];
          this.dataSource.data = [].concat(this.dataSource.data);
        }, err => {
          console.log(err);
        });
      }
    });
  }

  openCashRegisterDialog(el: any): void {
    const dialogRef = this.dialog.open(OpenCashRegisterDialog, {
      maxWidth: '100vw',
      minWidth: '60vw',
      data: {data: el}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  closeCashRegisterDialog(el: any): void {
    const dialogRef = this.dialog.open(CloseCashRegisterDialog, {
      maxWidth: '100vw',
      minWidth: '60vw',
      data: {data: el}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  historicCashRegisterDialog(el: any): void {
    const dialogRef = this.dialog.open(HistoricCashRegisterDialog, {
      maxWidth: '100vw',
      minWidth: '60vw',
      data: el
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getBoxes();
  }

}
@Component({
  selector: 'app-new-cash-register-dialog',
  templateUrl: 'new-cash-register.html',
})
export class NewCashRegisterDialog implements OnInit {

  form: FormGroup;
  coins: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public headquarters: any[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewCashRegisterDialog>,
    public boxService: BoxService,
    private coinService: CoinService,
    private toastr: ToastrService,
    public headquarterService: HeadquarterService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this._formBuilder.group({
      description: [null],
      serial_number: [null],
      observation: [null, Validators.required],
      ip: [null],
      // headquarter_id: [null, Validators.required],
      state: [true, Validators.required],
      coin_id: [null],
      exchange_rate: [null]
    });
  }

  ngOnInit() {
    if (this.data.id) {
      this.getBox(this.data.id);
    }
    //this.getHeadquarters();
    this.getCoins();
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if (this.data.id) this.edit(data);
    else this.save(data, formDirective);
  }

  getCoins() {
    this.coinService.getCoins().subscribe(res => {
      if(res.data) {
        this.coins = res.data.coins;
      }
    });
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.boxService.createBox(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if (this.dialogRef) {
        this.dialogRef.close(res.data.createBox);
      }
    }, err => {
      console.log(err);
    });
  }

  getBox(id) {
    this.boxService.getBox(id).subscribe(res => {
      if(res.data){
        if (res.data.box.length === 0) {
          this.toastr.error("No se encuentra el registro indicado")
        } else {
          this.form.patchValue({
            description: res.data.box[0].description,
            serial_number: res.data.box[0].serial_number,
            observation: res.data.box[0].observation,
            ip: res.data.box[0].ip,
            coin_id: res.data.box[0].coin.id,
            headquarter_id: (res.data.box[0].headquarter) ? res.data.box[0].headquarter.id : null,
            state: res.data.box[0].state,
            exchange_rate: res.data.box[0].exchange_rate
          });
        }
      }
    }, err => {
      console.log(err);
    });
  }

  edit(data: any) {
    this.boxService.updateBox(this.data.id, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if (this.dialogRef) {
        this.dialogRef.close(res.data.updateBox);
      }
    }, err => {
      console.log(err);
    });
  }

  compareObjects(o1: any, o2: any) {
    if (o1 === o2) return true;
    else return false
  }

  getHeadquarters() {
    this.headquarterService.getHeadquarters().subscribe(res => {
      if(res.data) this.headquarters = [].concat(res.data.headquarters);
    }, err => {
      console.log(err);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
@Component({
  selector: 'app-open-cash-register-dialog',
  templateUrl: 'open-cash-register.html',
})
export class OpenCashRegisterDialog {

  openCashRegisterFormGroup: FormGroup;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<OpenCashRegisterDialog>,
    public boxService: BoxService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.openCashRegisterFormGroup = this._formBuilder.group({
      amount_open: ['', Validators.required],
      exchange_rate: [''],
      description: [''],
    });
  }

  openBox() {
    this.openCashRegisterFormGroup.value.box_id = this.data.data.id;
    this.boxService.openBox(this.openCashRegisterFormGroup.value).subscribe(res => {
      this.onNoClick();
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
@Component({
  selector: 'app-close-cash-register-dialog',
  templateUrl: 'close-cash-register.html',
})
export class CloseCashRegisterDialog {

  closeCashRegisterFormGroup: FormGroup;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public boxService: BoxService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<registers>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.closeCashRegisterFormGroup = this._formBuilder.group({
      amount_close: ['', Validators.required],
      exchange_rate: [''],
      description: [''],
    });
  }

  closeBox() {
    this.closeCashRegisterFormGroup.value.box_id = this.data.data.id;
    this.boxService.closeBox(this.closeCashRegisterFormGroup.value).subscribe(res => {
      this.onNoClick();
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
@Component({
  selector: 'app-historic-cash-register-dialog',
  templateUrl: 'historic-cash-register.html',
})
export class HistoricCashRegisterDialog implements OnInit {
  displayedColumns: string[] = ['position', 'datetime', 'operation', 'amount'];
  historicData: any[] = [
    { datetime: '26/11/2019 08:04AM', operation: 'Apertura', amount: 5000 }
  ];
  dataSource = new MatTableDataSource<any>(this.historicData);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public boxService: BoxService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<registers>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
