import { Component, OnInit } from '@angular/core';
import { StockFormComponent } from '../stock-form/stock-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

export interface Stock {
  product: string;
  cant: number;
}

const ELEMENT_DATA: Stock[] = [
  { product: 'Producto 1', cant: 10,  },
  { product: 'Producto 2', cant: 10,  },
  { product: 'Producto 3', cant: 10,  },
];

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'product', 'cant', 'options', ];
  dataSource = ELEMENT_DATA;

  constructor(
    public dialog: MatDialog
  ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogFormStock, {
      width: '50vw'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {
  }
}

@Component({
  selector: 'dialog-form-stock',
  templateUrl: 'dialog-form-stock.html',
})
export class DialogFormStock {

  constructor(
    public dialogRef: MatDialogRef<DialogFormStock>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
