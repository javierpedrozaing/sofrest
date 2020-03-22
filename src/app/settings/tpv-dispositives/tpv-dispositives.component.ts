import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { AddTpvComponent } from './modals/add-tpv/add-tpv.component';
import { MatDialog } from '@angular/material/dialog';

export interface PeriodicElement {
  name: string;
  store: String;
  status: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Barra', store: 'Local 1', status: true },
  { name: 'Cocina', store: 'Local 2', status: false },
  { name: 'POS 1', store: 'Local 3', status: true },
];

@Component({
  selector: 'app-tpv-dispositives',
  templateUrl: './tpv-dispositives.component.html',
  styleUrls: ['./tpv-dispositives.component.scss']
})
export class TpvDispositivesComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) {

  }

  ngOnInit() {
  }


  add(): void {
    const dialogRef = this.dialog.open(AddTpvComponent, {
      width: '600px',
      panelClass: 'config-modal',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {


    });
  }


  displayedColumns: string[] = ['select', 'name', 'store', 'status'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${ + 1}`;
  }

}
