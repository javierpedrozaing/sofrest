import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClientsForm } from '../clients/clients/clients.component';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from '../services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { ReservationService } from '../services/reservation.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { HeadquarterService } from '../services/headquarter.service';
import { ClientsFormComponent } from '../clients/clients-form/clients-form.component';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { CustomerService } from '../services/customer.service';
import { RestService } from '../services/rest.service';

export interface ReservationElement {
  date: string;
  time: any;
  diners: number;
  customer: any;
  observation: string;
  status: boolean;
}

const ELEMENT_DATA: ReservationElement[] = [
  { date: '30/10/2019', time: '08:00', diners: 5, customer: 'Carlos Gil', observation: 'Clientes Veganos', status: true }
];

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['position', 'date', 'time', 'observation', 'diners', 'customer', 'options'];
  dataSource: MatTableDataSource<any>;
  public isMobile: boolean;
  subscription: Subscription;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    private coolDialogs: NgxCoolDialogsService,
    public reservationService: ReservationService
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
    const dialogRef = this.dialog.open(DialogNewReservations, {
      maxWidth: '100vw',
      minWidth: '60vw',
    });
    if (id) dialogRef.componentInstance.reservationID = id;
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

  getReservations() {
    this.reservationService.getReservations().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.reservation);
    }, err => {
      console.log(err);
    });
  }

  deleteReservation(id, index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado', {
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
      .subscribe(res => {
        if (res) {
          this.reservationService.deleteReservation(id).subscribe(res => {
            this.toastr.success("Operación realizada satisfactoriamente");
            this.dataSource.data.splice(index, 1);
            this.dataSource.data = [].concat(this.dataSource.data);
          }, err => {
            console.log(err);
          });
        }
      });
  }

  changeVisibility(id, index, status) {
    let action = '';

    status == true ? (action = 'ocultará') : (action = 'mostrará');

    this.coolDialogs.confirm(`Se ${action} el registro indicado`, {
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
      .subscribe(res => {
        if (res) {
          this.reservationService.updateStateReservation({ state: !this.dataSource.data[index]["state"] }, id).subscribe(res => {
            this.toastr.success("Operación realizada satisfactoriamente");
            this.dataSource.data[index]["state"] = !this.dataSource.data[index]["state"];
            this.dataSource.data = [].concat(this.dataSource.data);
          }, err => {
            console.log(err);
          });
        }
      });
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getReservations();
  }

  

}
@Component({
  selector: 'dialog-new-reservations',
  templateUrl: 'dialog-new-reservations.html',
})
export class DialogNewReservations implements OnInit {

  @Input() reservationID: any;
  public form: FormGroup;
  public customers: any = [];
  public headquarters: any[] = [];
  selectCustomerConfig = {
    displayKey: 'name',
    search: true,
    height: 'auto',
    moreText: 'mas',
    placeholder: 'Cliente',
    noResultsFound: 'Sin Resultados!'
  };

  public dniClient : FormControl = new FormControl(null,Validators.required);
  public client : any = null;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    public reservationService: ReservationService,
    public headquarterService: HeadquarterService,
    public dialogRef: MatDialogRef<DialogNewReservations>,
    private atp: AmazingTimePickerService,
    private toastr: ToastrService,
    private RestService: RestService,
    public customerService: CustomerService,
  ) {
    this.form = fb.group({
      state: [true, [Validators.required]],
      since: [null, [Validators.required]],
      until: [null, [Validators.required]],
      amount_pax: [null, [Validators.required]],
      reference: [null, [Validators.required]],
      client_id: [null, [Validators.required]],
      observation: [null, [Validators.required]],
      registration_date: [new Date(), [Validators.required]],
      headquarter_id: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.getHeadquarters();
    this.getCustomers();
    if (this.reservationID) {
      this.getReservation(this.reservationID);
    }
  }

  newClient(): void {
    const dialogRef = this.dialog.open(ClientsFormComponent, {
      maxWidth: '100vw',
      minWidth: '50vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.customers.push(result);
        this.form.patchValue({
          client_id: result.id
        });
      }
    });
  }

  searchClient(dni){
    this.RestService.searchCustomerByDNI(dni).subscribe(res => {
      if(res.nombres === "") this.toastr.warning("El DNI indicado no es válido");
      else{
        this.client = res;
        this.form.patchValue({
          customer_id : 1
        });
      }
    }, err => {
      console.log(err);
    });
  }

  getHeadquarters() {
    this.headquarterService.getHeadquarters().subscribe(res => {
      if(res.data) this.headquarters = [].concat(res.data.headquarters);
    }, err => {
      console.log(err);
    });
  }

  pickStartTime() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      this.form.controls['since'].setValue(time);
    });
  }

  pickStartOutTime() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      this.form.controls['until'].setValue(time);
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  getReservation(id) {
    this.reservationID = id;
    this.reservationService.getReservation(id).subscribe(res => {
      if(res.data){
      if (res.data.reservation.length === 0) {
        this.toastr.error("No se encuentra el registro indicado")
      } else {
        this.form.patchValue({
          state: res.data.reservation[0].state,
          observation: res.data.reservation[0].observation,
          amount_pax: res.data.reservation[0].amount_pax,
          registration_date: new Date(res.data.reservation[0].registration_date),
          headquarter_id: (res.data.reservation[0].headquarter) ? res.data.reservation[0].headquarter.id : null,
          until : (res.data.reservation[0].until) ? this.formatTime(res.data.reservation[0].until) : null,
          since : (res.data.reservation[0].since) ? this.formatTime(res.data.reservation[0].since) : null,
        });
      }}
    }, err => {
      console.log(err);
    });
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(res => {
      if(res.data) this.customers = [].concat(res.data.customers);
    }, err => {
      console.log(err);
    });
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  formatTime(time){
    let date = new Date(time)
    let format= (date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()) + ":" + (date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes());
    return format;
  }

  submit(data: any, formDirective: FormGroupDirective) {
    data.reference = '-';
    data.registration_date = this.formatDate(data.registration_date);
    data.since = `${data.registration_date} ${data.since}:00`
    data.until = `${data.registration_date} ${data.until}:00`
    if (this.reservationID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.reservationService.createReservation(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if (this.dialogRef) {
        this.dialogRef.close(res.data.createReservation);
      }
    }, err => {
      console.log(err);
    });
  }

  edit(data: any) {
    this.reservationService.updateReservation(this.reservationID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if (this.dialogRef) {
        this.dialogRef.close(res.data.updateReservationType);
      }
    }, err => {
      console.log(err);
    });
  }

  compareObjects(o1: any, o2: any) {
    if (o1 === o2) return true;
    else return false
  }

}
