import { Component } from '@angular/core';
import * as moment from 'moment';
import { Router, NavigationStart } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ScreenMobileChangeService } from './services/screen/screen-mobile-change.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent {

  constructor(
    private router: Router,
    public breakpointObserver: BreakpointObserver,
    private screenMobileChangeService: ScreenMobileChangeService,
    ) {
    if(!localStorage.getItem('token-emma')) this.router.navigate(['/login']);
    this.breakpointObserver
    .observe(['(min-width: 500px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        //Desktop
        this.screenMobileChangeService.viewDesktop();
      } else {
        //Mobile
        this.screenMobileChangeService.viewMobile();
      }
    });
  }

  title = 'EMMA';
}
