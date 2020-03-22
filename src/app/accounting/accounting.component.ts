import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Order } from '../sales/list-sales/list-sales.component';
import { ScreenMobileChangeService } from '../services/screen/screen-mobile-change.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

const ELEMENT_DATA: Order[] = [
  { type_sale: 'En Mostrador', payment_method : 'Efectivo' , fec_create: '30/10/2019' },
  { type_sale: 'En Mostrador', payment_method : 'Efectivo' , fec_create: '30/10/2019' },
  { type_sale: 'En Mostrador', payment_method : 'Efectivo' , fec_create: '30/10/2019' },
  { type_sale: 'En Mostrador', payment_method : 'Efectivo' , fec_create: '30/10/2019' },
];

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.scss']
})
export class AccountingComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['position', 'correlative', 'type', 'fec_create', ];
  public isMobile : boolean ;
  subscription: Subscription;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource : MatTableDataSource<Order>;

  constructor(
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
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
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
