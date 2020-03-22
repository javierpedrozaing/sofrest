import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType, ChartOptions, ChartLegendOptions, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Color, BaseChartDirective } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { PayPosDialog } from './pay-pos/pay-pos.component';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

export interface posSales {
  table: string;
  order: string;
  owner: string;
  total: number;
}

const ELEMENT_DATA: posSales[] = [
  { table: "Mesa 1", order: 'Lomito Salteado', owner: 'Mozo 1', total: 45 },
  { table: "Mesa 2", order: 'Pastel de Papas', owner: 'Mozo 2', total: 45 },
  { table: "Mesa 3", order: 'Alitas', owner: 'Mozo 3', total: 45 },
  { table: "Mesa 4", order: 'Pasticho', owner: 'Mozo 3', total: 45 },
  { table: "Mesa 5", order: 'Ceviche', owner: 'Mozo 4', total: 45 }
];

@Component({
  selector: 'app-pos-sales',
  templateUrl: './pos-sales.component.html',
  styleUrls: ['./pos-sales.component.scss']
})
export class PosSalesComponent implements OnInit {

  ordersArray = [
    { name: 'Saltado de Pollo', description: '20 Ventas' },
    { name: 'Higado Frito', description: '15 Ventas' },
    { name: 'Helado Frio Rico', description: '5 Ventas' },
    { name: 'Coca Cola 1 Litro', description: '5 Vetas' }
  ];

  displayedColumns: string[] = ['table', 'order', 'owner', 'total', 'option'];
  dataSource = new MatTableDataSource<posSales>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public doughnutChartLabels: Label[] = ['Mesas Atendidas', 'Mesas Pendientes'];
  public doughnutChartData: MultiDataSet = [
    [48, 52]
  ];
  public doughnutChartType: ChartType = 'doughnut';

  openDialog(): void {
    const dialogRef = this.dialog.open(PayPosDialog, {
      width: '95vw'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  printPreAccount(): void {
    const dialogRef = this.dialog.open(PreAccountDialog, {
      width: '50vw'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogDiscount(): void {
    const dialogRef = this.dialog.open(DialogDiscount, {
      width: '95vw'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog) { }

}

@Component({
  selector: 'dialog-discount',
  templateUrl: 'dialog-discount.html',
  styles: []
})
export class DialogDiscount {
  discountFormGroup: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogDiscount>,
    private _formBuilder: FormBuilder,
  ) {
    this.discountFormGroup = this._formBuilder.group({
      discount_type: [null],
      motive: [null, Validators.required],
      discount_amount: [0, Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'print-pre-account',
  templateUrl: 'pre-account.html',
  styles: []
})
export class PreAccountDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogDiscount>,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
