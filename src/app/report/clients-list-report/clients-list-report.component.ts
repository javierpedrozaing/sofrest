import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/clients/clients/clients.component';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

const ELEMENT_DATA: Client[] = [
  { name: 'Pedro Alcantara', dni: 'mnbv' },
  { name: 'Pedro Alcantara', dni: 'mnbv' },
  { name: 'Pedro Alcantara', dni: 'mnbv' },

];
@Component({
  selector: 'app-clients-list-report',
  templateUrl: './clients-list-report.component.html',
  styleUrls: ['./clients-list-report.component.scss']
})
export class ClientsListReportComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['position', 'name', 'dni', 'options',];
  dataSource : MatTableDataSource<Client>;
  public isMobile: boolean;
  subscription: Subscription;
  constructor(
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
  ) {
    this.isMobile = this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
