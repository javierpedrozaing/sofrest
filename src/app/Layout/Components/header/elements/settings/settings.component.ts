import {Component, OnInit} from '@angular/core';
import {ThemeOptions} from '../../../../../theme-options';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: [`
    .header-card{
      background :#104cbd;
      background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      color : #ffffff;
      padding : 15px 20px;
    }

    .icon-margin{
      margin-right : 3px;
    }

    .title-header{
        font-size : 20px;
        font-weight : bold;
        text-align: center;
        margin-bottom : 0.2rem;
    }

    .title-subtitule{
        text-align: center;
        margin-bottom : 0.2rem;
    }

    .dropdown-menu{
        padding : 0px !important;
    }
  `]
})
export class SettingsComponent implements OnInit {

  public statusTheme = false;
  constructor(
    public globals: ThemeOptions,
    private status: LoginService
    ) {
      this.status.statusTheme.subscribe(res => {
        this.statusTheme = res.dark;
      });
  }

  ngOnInit() {
  }

}
