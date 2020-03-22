import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-orders-grid-mobile',
  templateUrl: './orders-grid-mobile.component.html',
  styleUrls: ['./orders-grid-mobile.component.scss']
})
export class OrdersGridMobileComponent implements OnInit {

  orders = [
    {customers: 2, time: "17:40", status: 1, route: 'status'},
    {customers: 3, time: "18:40", status: 2, route: 'add'},
    {customers: 1, time: "18:40", status: 0, route: 'list'},
    {customers: 2, time: "18:30", status: 0, route: 'list'},
    {customers: 2, time: "18:30", status: 0, route: 'list'}
  ];
  subscription: Subscription;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private screenMobileChangeService: ScreenMobileChangeService,
  ) { 
    if(!this.screenMobileChangeService.isMobile) this.router.navigate(['/supervisor/0']);
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => { 
      if(!isMobile) this.router.navigate(['/supervisor/0']);
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
  

  add() {
    this.orders.push({customers: 2, time: "18:30", status: 0, route: 'status'});
  }

  ngOnInit() {
  }

}
