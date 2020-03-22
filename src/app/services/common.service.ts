import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  isSidebarOpen: boolean = true;

  constructor(private router: Router) {
  }

  manageSidebar() {
    if(this.router.url === '/pos-sales/shopping-cart') {
      this.isSidebarOpen = false;
    }
  }

  openSidebar() {
    this.isSidebarOpen = true;
  }

}
