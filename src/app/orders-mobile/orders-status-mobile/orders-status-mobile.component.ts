import { Component, OnInit } from '@angular/core';

export interface StatusOrdersElement {
  product: string;
  status: string;
}

const ELEMENT_DATA: StatusOrdersElement[] = [
  {product: 'Producto 1', status: 'Preparando'},
  {product: 'Producto 2', status: 'Preparando'},
  {product: 'Producto 3', status: 'Preparando'},
  {product: 'Producto 4', status: 'Preparando'},
  {product: 'Producto 5', status: 'Preparando'},
];

@Component({
  selector: 'app-orders-status-mobile',
  templateUrl: './orders-status-mobile.component.html',
  styleUrls: ['./orders-status-mobile.component.scss']
})
export class OrdersStatusMobileComponent implements OnInit {

  displayedColumns: string[] = ['product', 'status'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
