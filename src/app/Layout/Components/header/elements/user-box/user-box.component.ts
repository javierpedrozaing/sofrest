import {Component, OnInit} from '@angular/core';
import {ThemeOptions} from '../../../../../theme-options';
import { LoginService } from 'src/app/services/login/login.service';
import { CryptoService } from 'src/app/common/security-service';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
  styles: [`
  .dropdown-toggle::after{
      display:none !important;
  }

  .row{
    margin : 0px;
  }

  .icon-item{
    font-size : 25px;

  }


  .item-grid > content-item >  .title-icon-tickets:hover{
    background : red;
  }

  .title-icon-messaje{
    color: #f7b924;
    font-weight : bold;
  }

  .title-icon-tickets{
    color: #d92550;
    font-weight : bold;
  }



  .item-grid{
    height: 100px;
    padding : 20px 10px;
    border-bottom : 1px solid #c1c1c1;
    border-top : 1px solid #c1c1c1;
    border-right : 1px solid #c1c1c1;
    text-align : center;
  }

  .header-card{
      background-color: white !important;
      background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      color : #ffffff;
      padding : 15px 20px;
    }

    .header-card-dark{
      background-color: #ffbd45 !important;
    }

    .icon-margin{
      margin-right : 3px;
    }

    .title-name{
      font-weight : bold;
      margin-left : 10px
    }

    .title-subtitule{
      text-align: center;
      margin-bottom : 0.2rem;
    }

    .dropdown-menu{
        padding : 0px !important;
        width : 350px;
    }

    .dropdown-item{
      color :blue;
    }

    .footer-header{
      text-align: center;
      margin-top : 7px;
    }

    .theme{
      padding : 0.4rem 1.5rem;
      color : blue;
    }
`]
})
export class UserBoxComponent implements OnInit {

  public statusT = false;
  public statusM = false;
  public data : any = {};

  constructor(
    public globals: ThemeOptions,
    private status: LoginService,
    public cryptoService: CryptoService,
    ) {
      if (localStorage.getItem('emmaData')) {
        const desencrypt: any = this.cryptoService.decryptUsingAES256(localStorage.getItem('emmaData'));
        try {
          let data = JSON.parse(desencrypt);
          this.data = data;
        } catch (error) {
  
        }
      }
  }

  ngOnInit() {
  }

  changeTheme(data) {
    this.statusT = data;
    this.status.statusTheme.next({dark : data});
  }

  changeMenu(data) {
    this.statusM = data;
    this.status.statusMenu.next({right: data});
  }

}
