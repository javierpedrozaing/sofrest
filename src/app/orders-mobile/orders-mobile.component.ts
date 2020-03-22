import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-mobile',
  templateUrl: './orders-mobile.component.html',
  styleUrls: ['./orders-mobile.component.scss']
})
export class OrdersMobileComponent implements OnInit {

  ordersArray = [
    {name: 'Mr. Guau Store', description: 'Lorem ipsum dolor sit amet, consectetur'},
    {name: 'Expo Market Store', description: 'Lorem ipsum dolor sit amet, consectetur'},
    {name: 'Davilor Store', description: 'Lorem ipsum dolor sit amet, consectetur'},
    {name: 'Ethnas Market', description: 'Lorem ipsum dolor sit amet, consectetur'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
