import {Component, OnInit} from '@angular/core';
import {ThemeOptions} from '../../../../../theme-options';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styles: [`
    .header-card{
      background-image: url('https://st2.depositphotos.com/1030015/10072/i/950/depositphotos_100721722-stock-photo-background-green-texture.jpg') !important;
      background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      color : #ffffff;
      padding : 5px 20px;
    }

    .icon-margin{
      margin-right : 3px;
    }

    .title-header{
        font-size : 20px;
        font-weight : bold;
        margin-bottom : 0.2rem;
    }

    .title-subtitule{
        margin-bottom : 0.2rem;
    }

    .dropdown-menu{
        padding : 0px !important;
    }
  `]
})
export class ProjectsComponent implements OnInit {
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
