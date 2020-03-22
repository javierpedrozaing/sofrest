import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { StorageService } from 'src/app/services/storage.service';
import { ActivatedRoute } from '@angular/router';

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
  selector: 'app-stock-store',
  templateUrl: './stock-store.component.html',
  styleUrls: ['./stock-store.component.scss']
})
export class StockStoreComponent implements OnInit {
  @Input() storeID: any;

  displayedColumns: string[] = ['product','measurement_unit','quantity','minimum_stock','maximum_stock'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    public storageService : StorageService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getStock(this.route.snapshot.params.id);
  }

  getStock(id) {
    this.storageService.getWarehouseStorage(id).subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.storages);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });
  }

}
