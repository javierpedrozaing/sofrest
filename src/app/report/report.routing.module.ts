import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportDashboardComponent } from './report-dashboard/report-dashboard.component';
import { SalesSummaryComponent } from './sales-summary/sales-summary.component';
import { ClientsListReportComponent } from './clients-list-report/clients-list-report.component';
import { HumanResourceReportComponent } from './human-resource-report/human-resource-report.component';
import { PlatesReportComponent } from './plates-report/plates-report.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ReportDashboardComponent,
      },
      {
        path: 'sales-summary',
        component: SalesSummaryComponent,
      },
      {
        path: 'clients',
        component: ClientsListReportComponent,
      },
      {
        path: 'human-resource',
        component: HumanResourceReportComponent,
      },
      {
        path: 'human-resources',
        component: ReportDashboardComponent,
      },
      {
        path: 'plates',
        component: PlatesReportComponent,
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ReportRoutingModule { }
