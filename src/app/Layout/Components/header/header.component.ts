import {Component, HostBinding} from '@angular/core';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {ThemeOptions} from '../../../theme-options';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(
    public globals: ThemeOptions,
    private status: LoginService
    ) {
      this.status.statusTheme.subscribe(res => {
        this.statusTheme = res.dark;
      });
      this.status.statusMenu.subscribe(res => {
        this.statusMeu = res.right;
      });
  }

  @HostBinding('class.isActive')
  get isActiveAsGetter() {
    return this.isActive;
  }
  showoptions = false;
  public statusTheme = false;
  public statusMeu = false;

  isActive: boolean;

  @select('config') public config$: Observable<any>;

  showOptions(value) {
    this.showoptions = value;
  }

  toggleSidebarMobile() {
    this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
  }

  toggleHeaderMobile() {
    this.globals.toggleHeaderMobile = !this.globals.toggleHeaderMobile;
  }

}
