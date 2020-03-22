import { Component, OnInit } from '@angular/core';

const ELEMENT_DATA: any[] = [
  {description: 'Papas a la Huancaina', qty: 1, price: 30.00, total: 30.00},
  {description: 'Lomito Saltado', qty: 1, price: 34.00, total: 34.00},
  {description: 'Coca Cola 1 Lt', qty: 1, price: 10.00, total: 10.00}
];

@Component({
  selector: 'app-pre-account',
  templateUrl: './pre-account.component.html',
  styleUrls: ['./pre-account.component.scss']
})
export class PreAccountComponent implements OnInit {

  displayedColumns: string[] = ['description', 'qty', 'price', 'total'];
  displayedDscColumns = ['emptyFooter', 'discount', 'emptyFooter1', 'dscamount'];
  displayedTotalColumns = ['emptyFooter2', 'totl', 'emptyFooter3', 'totalammount'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  getTotalCost() {
    return ELEMENT_DATA.map(t => t.total).reduce((acc, value) => acc + value, 0);
  }

  ngOnInit() {
  }

}
