import {Component, OnInit} from '@angular/core';
import {ThemeOptions} from '../../../../../theme-options';
import * as moment from 'moment';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
})
export class DateTimeComponent implements OnInit {

  currentTime: any = null;
  currentDate: any = null;

  constructor(public globals: ThemeOptions) {
  }

  updateCurrentTime() {
    this.currentTime = moment().format('LTS');
  }

  ngOnInit() {
    this.currentDate = moment().format('DD-MM-YYYY');
    this.currentTime = moment().format('LTS');
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
  }


}
