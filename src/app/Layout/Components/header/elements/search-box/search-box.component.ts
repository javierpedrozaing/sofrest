import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit {

  public isActive = false;
  public statusTheme = false;
  @Output() active = new EventEmitter<boolean>();

  constructor(
    private status: LoginService
  ) {
    this.status.statusTheme.subscribe(res => {
      this.statusTheme = res.dark;
    });
  }

  isActiveSearch(data) {
    this.isActive = data;
    this.active.emit(data);
  }

  ngOnInit() {
  }

}
