import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType, ChartOptions, ChartLegendOptions, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Color, BaseChartDirective } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

export interface Pedidos {
  plato: string;
  en_espera: string;
  status: String;
  encargado: String;
}

export interface Plates {
  plato: string;
  price: number;
  categoria: String;
  production_a: String;
}

const ELEMENT_DATA: Pedidos[] = [
  { plato: 'ALITAS DE POLLO', en_espera: '15 min', status : 'Preparando', encargado : 'MOZO 1' },
  { plato: 'SOPA DE FIDEOS', en_espera: '10 min', status : 'Preparando', encargado : 'MOZO 2' },
  { plato: 'CALDO DE POLLO', en_espera: '5 min', status : 'En espera', encargado : 'MOZO 3' },
  { plato: 'RICOTO RELLENO', en_espera: '1 min', status : 'Preparando', encargado : 'MOZO 3' },
  { plato: 'ALITAS DE POLLO', en_espera: '15 min', status : 'En espera', encargado : 'MOZO 1' },
];

const ELEMENT_DATA_2: Plates[] = [
  { plato: 'ALITAS DE POLLO', price: 150.000, categoria : 'Frio', production_a : 'PARRILLA' },
  { plato: 'SOPA DE FIDEOS', price: 20.000, categoria : 'Caliente', production_a : 'PARRILLA' },
  { plato: 'CALDO DE POLLO', price: 30.000, categoria : 'Caliente', production_a : 'Local' },
  { plato: 'PESCADO FRITO', price: 100.000, categoria : 'Frio', production_a : 'PARRILLA' },
]

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.scss']
})
export class KitchenComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {xAxes: [{}], yAxes: [{}]},
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartLabels: Label[] = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    {data: [5, 10, 15, 20, 30, 40, 50], label: 'Prod. Disponibles'},
    //{data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  displayedColumns: string[] = ['plato', 'en_espera', 'status', 'encargado', 'options', ];
  displayedColumns_2: string[] = ['plato', 'price', 'categoria', 'production_a', 'options', ];
  dataSource = ELEMENT_DATA;
  dataSource_2 = ELEMENT_DATA_2;

  


  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [['Pedidos', 'Atendidos'],'En espera'];
  public pieChartData: number[] = [3000,1000];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = false;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: [ 'rgba(0,255,0,0.3)','rgba(0,0,255,0.3)'],
    },
  ];


  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {

  }

  // events
  public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


}
