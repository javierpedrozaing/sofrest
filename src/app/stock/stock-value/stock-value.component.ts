import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';

export interface HistoryStock {
  article : string;
  stock : number;
  coste : number;
  stock_value : number;
  sale_value : number;
  margen : number;
  potential_benefit : number;
}

@Component({
  selector: 'app-stock-value',
  templateUrl: './stock-value.component.html',
  styleUrls: ['./stock-value.component.scss']
})
export class StockValueComponent implements OnInit,OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ["article","stock","coste","stock_value","sale_value","margen","potential_benefit",];
  dataSource : MatTableDataSource<HistoryStock>;
  allSelected : boolean;
  allSelectedStore : boolean = true;
  allSelectedCategories : boolean = true;
  showRemove : boolean;
  shop = [];
  categories = [];
subscription: Subscription;
 public isMobile : boolean ;

  stores : any = [
    {
      "id" : 1,
      "name" : "Local 1",
    },
    {
      "id" : 2,
      "name" : "Local 2",
    },
    {
      "id" : 3,
      "name" : "Local 3",
    },
  ];

  categoriesData : any = [
    {
      "id" : 1,
      "name" : "Bebidas",
    },
    {
      "id" : 2,
      "name" : "Calientes",
    },
    {
      "id" : 3,
      "name" : "Frios",
    },
  ];
  
  constructor(
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
  ) {
        this.isMobile= this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => { 
      this.isMobile = isMobile;
    });

    this.dataSource = new MatTableDataSource([
      {
        article : "Ensalada Fresca",
        "stock" : 1000,
        "coste" : 1000,
        "stock_value" : 1000,
        "sale_value" : 1000,
        "margen" : 1000,
        "potential_benefit" : 1000,
      },
      {
        article : "Coca Cola",
        "stock" : 200,
        "coste" : 200,
        "stock_value" : 200,
        "sale_value" : 200,
        "margen" : 200,
        "potential_benefit" : 200,
      },
      {
        article : "Combo Papa",
        "stock" : 30,
        "coste" : 30,
        "stock_value" : 30,
        "sale_value" : 30,
        "margen" : 30,
        "potential_benefit" : 30,
      },
    ]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.selectAllCategories(true);
    this.selectAllStore(true);
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectAllStore(value){
    if(value) this.shop = this.stores;
    else this.shop = [];
  }

  selectAllCategories(value){
    if(value) this.categories = this.categoriesData;
    else this.categories = [];
  }

}
