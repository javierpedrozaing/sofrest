import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface TableOrder {
  table: string;
  waiter: string;
  order_time: string;
  total : number;
}

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit,OnDestroy {

  public isMobile : boolean ;
  subscription: Subscription;
  dataSource : MatTableDataSource<TableOrder>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['table', 'waiter', 'order_time', 'total', 'options'];

  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService
  ) {
        this.isMobile= this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => { 
      this.isMobile = isMobile;
    });
   }

   ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([
      { table : "01", waiter : "Pedro Pérez", order_time : "13:00", total : 20 },
      { table : "02", waiter : "Pedro Yépez", order_time : "13:05", total : 15 },
      { table : "03", waiter : "José Pérez", order_time : "10:00", total : 30 },
      { table : "04", waiter : "Angel Mendoza", order_time : "09:00", total : 20 },
    ]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
