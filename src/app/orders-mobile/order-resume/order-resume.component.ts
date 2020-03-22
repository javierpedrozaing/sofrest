import { Component, OnInit } from '@angular/core';

export interface ResumeOrdersElement {
  product: string;
  price: string;
}

const ELEMENT_DATA: ResumeOrdersElement[] = [
  {product: 'Producto 1', price: '$49,99'},
  {product: 'Producto 2', price: '$49,99'},
  {product: 'Producto 3', price: '$49,99'},
  {product: 'Producto 4', price: '$49,99'},
  {product: 'Producto 5', price: '$49,99'},
];

@Component({
  selector: 'app-order-resume',
  templateUrl: './order-resume.component.html',
  styleUrls: ['./order-resume.component.scss']
})
export class OrderResumeComponent implements OnInit {

  displayedColumns: string[] = ['product', 'price'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
