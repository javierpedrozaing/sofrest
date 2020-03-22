import {Component, OnInit} from '@angular/core';
import {ThemeOptions} from '../../../../../theme-options';
import * as moment from 'moment';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'notification-menu',
  templateUrl: './notification-menu.html',
  styles: [`

    .dropdown-toggle::after{
        display:none !important;
    }

    .row{
      margin : 0px;
    }

    .icon-item{
      font-size : 25px;
      padding : 22px 54px;
    }

    .title-icon{

    }

    .item-grid{
      height: 120px;
      padding : 0px;
      border-bottom : 1px solid #c1c1c1;
      border-right : 1px solid #c1c1c1;
      text-align : center;
    }

      .icon-margin{
        margin-right : 3px;
      }

      .title-header{
        text-align: center;
        font-size : 20px;
        font-weight : bold;
        margin-bottom : 0.2rem;
      }

      .title-subtitule{
        text-align: center;
        margin-bottom : 0.2rem;
      }

      .dropdown-menu{
          padding : 0px !important;
          width : 400px;
      }

      .dropdown-menu{
        text-align: center;
        margin-top : 7px;
      }
  `]
})
export class NotificationsComponent implements OnInit {

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

