import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  public statusTheme = false;
  public statusMenu = false;
  constructor(private status: LoginService) {
    this.status.statusTheme.subscribe(res => {
      this.statusTheme = res.dark;
    });
    this.status.statusMenu.subscribe(res => {
      this.statusMenu = res.right;
    });
  }

  ngOnInit() {
  }

}
