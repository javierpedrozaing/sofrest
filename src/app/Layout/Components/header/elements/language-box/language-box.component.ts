import {Component, OnInit} from '@angular/core';
import {ThemeOptions} from '../../../../../theme-options';
import * as moment from 'moment';

@Component({
  selector: 'app-language-box',
  templateUrl: './language-box.component.html',
  styleUrls: ['./language-box.component.scss']
})
export class LanguageBoxComponent implements OnInit {

  currentTime: any = null;
  currentDate: any = null;

  constructor(public globals: ThemeOptions) {
  }

  selectedCountry: any = {
    name: 'Español',
    img: 'ES',
    selected: true,
  };

  listCountries = [
    {
      name: 'Ingles',
      img: 'EN',
    },
    {
      name: 'Español',
      img: 'ES',
      selected: true,
    }
  ];

  selectCountry(index: number) {
    if (this.listCountries[index]) {
      this.listCountries.forEach((country: any) => country.selected = false);
      this.selectedCountry = this.listCountries[index];
      this.listCountries[index].selected = true;
    }
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
