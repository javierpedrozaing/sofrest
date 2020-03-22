import { Component, OnInit, ViewChild } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType, ChartOptions, ChartLegendOptions, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Color, BaseChartDirective } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
@Component({
  selector: 'app-report-dashboard',
  templateUrl: './report-dashboard.component.html',
  styleUrls: ['./report-dashboard.component.scss']
})
export class ReportDashboardComponent implements OnInit {

  constructor() { }

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Mozo 1' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Mozo 2' },
    { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Mozo 3' }
  ];
  public lineChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true, 
    maintainAspectRatio: false,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  public statsCards : any = [
    {
      "name": "Total de Boletas del mes",
      "amount" : 50000,
    },
    {
      "name": "Total de Facturas del mes",
      "amount" : 50000,
    },
    {
      "name": "Total de Recibos del mes",
      "amount" : 50000,
    },
  ];

  public statsBar : any = [
    {
      "name" : "Total de ventas con respecto al día anterior",
      "up" : false,
      "percentage" : 13.06,
      "value" : 2
    },
    {
      "name" : "Total de ventas con respecto a la semana pasada",
      "up" : true,
      "percentage" : 15.06,
      "value" : 3
    },
    {
      "name" : "Total de ventas con respecto al mes pasado",
      "up" : false,
      "percentage" : 23.06,
      "value" : 5
    },
  ];

  public statsDoughnut : any = [
    {
      "name" : "Platos más vendidos del día",
    },
    {
      "name" : "Platos más vendidos de la semana",
    },
    {
      "name" : "Platos más vendidos del mes",
    },
  ];

  public doughnutChartLabels: Label[] = ['Arroz Verde', 'Arroz Amarillo', 'Aji de gallina'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
  ];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOption: any = {
    elements: {
      arc: {
        borderWidth: 0
      }
    },
    "legend": {
      "position": "right",
      "align": "end",
    }
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{
        display:false,
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        display:false,
        gridLines: {
          display: false
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        display: false
      }
    }
  };
  public barChartLabels: Label[] = ['Plato 1', 'Plato 2', 'Plato 3', 'Plato 4', 'Plato 5', 'Plato 6', 'Plato 7'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Plato A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Plato B' }
  ];


  ngOnInit() {
  }

}
