import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { HallTypeService } from 'src/app/services/hall-type.service';
import { ReservationTypeService } from 'src/app/services/reservation-type.service';

@Component({
  selector: 'app-reservation-type-form',
  templateUrl: './reservation-type-form.component.html',
  styleUrls: ['./reservation-type-form.component.scss']
})
export class ReservationTypeFormComponent implements OnInit {

  @Input() reservationTypeID: any;
  @Input() hideBack: boolean;
  @Input() showClose: boolean;
  public form: FormGroup;
  public headquarterTypes : any[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public reservationTypeService: ReservationTypeService,
    private coolDialogs: NgxCoolDialogsService,
    private router: Router,
    public route: ActivatedRoute,
    public dialogRef: MatDialogRef<ReservationTypeFormComponent>,
  ) {
    this.form = fb.group({
      description: [null, [ Validators.required]],
      state: [true, [ Validators.required]],
    });
  }

  ngOnInit() {
    if (this.reservationTypeID) {
      this.getReservationType(this.reservationTypeID);
    }else if(this.route.snapshot.params.id){
      this.getReservationType(this.route.snapshot.params.id);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  getReservationType(id) {
    this.reservationTypeID = id;
    this.reservationTypeService.getReservationType(id).subscribe(res => {
      if(res.data){
        if (res.data.reservation_types.length === 0) {
          this.toastr.error("No se encuentra el registro indicado")
        } else {
          this.form.patchValue({
            state: res.data.reservation_types[0].state,
            description: res.data.reservation_types[0].description,
          });
        }
      }
    }, err => {
      console.log(err);
    });
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if (this.reservationTypeID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.reservationTypeService.createReservationType(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.createReservationType);
      }
    }, err => {
      console.log(err);
    });
  }

  edit(data: any) {
    this.reservationTypeService.updateReservationType(this.reservationTypeID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.updateReservationType);
      }
    }, err => {
      console.log(err);
    });
  }

}
