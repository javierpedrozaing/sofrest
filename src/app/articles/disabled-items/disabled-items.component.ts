import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-disabled-items',
  templateUrl: './disabled-items.component.html',
  styleUrls: ['./disabled-items.component.scss']
})
export class DisabledItemsComponent implements OnInit, OnDestroy {

  shop1Select: any;
  displayedColumns: string[] = ['article', 'category', 'price', 'cost', 'enable'];
  shops = ['Local 1', 'Local 2', 'Local 3'];
  dataSource = new MatTableDataSource<any>([  { article: 'Coca Cola', category: 'Bebidas', price: 12.26, cost: 12.00, margin: '12%', in_stock: 2100 }]);
  public isMobile : boolean ;
  subscription: Subscription;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
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
    
  openDialog(): void {
    // const dialogRef = this.dialog.open(NewDiscountDialog, {
    //   maxWidth : '100vw',
    //   minWidth: '60vw',
    //   data: {}
    // });

    // dialogRef.afterClosed().subscribe(result => {
    // });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}
