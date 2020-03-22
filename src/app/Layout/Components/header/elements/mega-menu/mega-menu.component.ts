import { Component, OnInit } from '@angular/core';
import { ThemeOptions } from 'src/app/theme-options';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss']
})
export class MegaMenuComponent implements OnInit {

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
