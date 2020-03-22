import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { Color, BaseChartDirective } from 'ng2-charts';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-plates-report',
  templateUrl: './plates-report.component.html',
  styleUrls: ['./plates-report.component.scss']
})
export class PlatesReportComponent implements OnInit {

  allSelectedPlate : boolean = true;
  lessSold: boolean = false;
  plate = [];

  selected: any = [moment(), moment()];
  alwaysShowCalendars: boolean;
  ranges: any = {
  'Hoy': [moment(), moment()],
  'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
  'Últimos 7 Días': [moment().subtract(6, 'days'), moment()],
  'Últimos 30 Días': [moment().subtract(29, 'days'), moment()],
  'Este Mes': [moment().startOf('month'), moment().endOf('month')],
  'Mes Pasado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  invalidDates: moment.Moment[] = [];
  public lineChartDataGrossSales: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Ventas Brutas' },
  ];
  public lineChartDataRefunds: ChartDataSets[] = [
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Reembolsos' },
    /*{ data: [180, 480, 770, 90, 1000, 270, 400], label: 'Mozo 3' } */
  ];
  public lineChartDataDiscounts: ChartDataSets[] = [
    { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Descuentos' },
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
  chartsArray = [
    {type: 'gross_sales', data: 'lineChartDataGrossSales'},
    {type: 'refunds', data: 'lineChartDataRefunds'},
    {type: 'discounts', data: 'lineChartDataDiscounts'}
  ]
  isInvalidDate = (m: moment.Moment) =>  {
  return this.invalidDates.some(d => d.isSame(m, 'day') )
  }

  public doughnutChartLabels: Label[] = ['Plato 1', 'Plato 2', 'Plato 3'];
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
  plates : any = [
    {
      "id" : 1,
      "name" : "Plato 1",
    },
    {
      "id" : 2,
      "name" : "Plato 2",
    },
    {
      "id" : 3,
      "name" : "Plato 3",
    },
  ];

  form: FormGroup;
  constructor(
    fb: FormBuilder,
  ) {
    this.alwaysShowCalendars = true;
    this.form = fb.group({
      date: [{ begin: new Date(), end: new Date() }]
    });
   }

  ngOnInit() {
    this.selectAllPlate(true);
  }

  selectAllPlate(value){
    if(value){
      this.lessSold = false;
      this.plate = this.plates;
    }
    else this.plate = [];
  }

  changePlate(){
    if(this.plate.length === this.plates.length){
      this.allSelectedPlate = true;
      this.lessSold = false;
    }
    else {
      if(this.plate.length > 0) this.lessSold = false;
      this.allSelectedPlate = false;
    }
  }

  selectedLessSold(value){
    if(value) {
      this.allSelectedPlate = false;
      this.selectAllPlate(false);
    }else{
      this.allSelectedPlate = true;
      this.selectAllPlate(true);
    }
  }
}
