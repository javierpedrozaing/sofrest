import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

export interface SeparateAccountElement {
  position: number;
  product: string;
  price: number;
}

const ELEMENT_DATA: SeparateAccountElement[] = [
  {position: 1, product: 'Producto', price: 1.0079},
  {position: 2, product: 'Producto', price: 1.0079},
  {position: 3, product: 'Producto', price: 1.0079},
  {position: 4, product: 'Producto', price: 1.0079},
  {position: 5, product: 'Producto', price: 1.0079},
  {position: 6, product: 'Producto', price: 1.0079}
];

@Component({
  selector: 'app-separate-account-mobile',
  templateUrl: './separate-account-mobile.component.html',
  styleUrls: ['./separate-account-mobile.component.scss']
})
export class SeparateAccountMobileComponent implements OnInit {

  displayedColumns: string[] = ['select', 'position', 'product', 'price'];
  dataSource = new MatTableDataSource<SeparateAccountElement>(ELEMENT_DATA);
  selection = new SelectionModel<SeparateAccountElement>(true, []);

  constructor() { }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: SeparateAccountElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  ngOnInit() {
  }

}
