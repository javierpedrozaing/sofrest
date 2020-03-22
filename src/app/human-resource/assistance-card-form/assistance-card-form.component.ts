import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AmazingTimePickerService } from 'amazing-time-picker';
import * as moment from 'moment';

@Component({
  selector: 'app-assistance-card-form',
  templateUrl: './assistance-card-form.component.html',
  styleUrls: ['./assistance-card-form.component.scss']
})
export class AssistanceCardFormComponent implements OnInit {

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;
  totalHours : number = null;
  stores : any = [
    {
      "id" : 1,
      "name" : "Local 1",
    },
    {
      "id" : 1,
      "name" : "Local 2",
    },
  ];

  employees : any = [
    {
      "id" : 1,
      "name" : "Pedro Pérez",
    },
    {
      "id" : 2,
      "name" : "Petra Pérez",
    },
    {
      "id" : 3,
      "name" : "Josefa Pérez",
    },
  ];

  @Input() assistanceCardID: any;
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    calendar: NgbCalendar,
    private atp: AmazingTimePickerService,
  ) { 
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.form = fb.group({
      employee: [null, [ Validators.required]],
      store: [null, [ Validators.required]],
      entry: [null, [ Validators.required]],
      out: [null, [ Validators.required]],
      entry_time: [null, [ Validators.required]],
      out_time: [null, []],
    });
  }

  pickStartTime() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
        this.form.controls['entry_time'].setValue(time);
        this.calculateHours();
    });
  }

  pickStartOutTime() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
        this.form.controls['out_time'].setValue(time);
        this.calculateHours();
    });
  }

  calculateHours(){
    if(this.form.controls['out_time'].value && this.form.controls['entry_time'].value){
      var startTime = moment(this.form.controls['entry_time'].value, 'hh:mm');
      var endTime = moment(this.form.controls['out_time'].value, 'hh:mm');
      this.totalHours = endTime.diff(startTime, 'hours');
    }    
  }

  ngOnInit() {
  }

}
