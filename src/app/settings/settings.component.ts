import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-general',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsGeneralComponent implements OnInit {

  public showItem : String = 'general';

  constructor() { }

  ngOnInit() {
  }

  ChangeItem(item) {
    this.showItem = item;
  }

}
