import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

export interface StockRecount {
  recount_num: string;
  date: string;
  end_date: string;
  shop: string;
  status: string;
  observations: string;
}

export interface ArticlesStockRecount {
  article: string;
  expected_stock: number;
}

const ELEMENT_DATA: StockRecount[] = [
  { recount_num: 'IC1001', date: '20/05/2019', end_date: "21/05/2019", shop: 'Local 1', status: 'Finalizado', observations: 'Sin Problemas' }
];

const ELEMENT_DATA1: ArticlesStockRecount[] = [];

@Component({
  selector: 'app-stock-recount',
  templateUrl: './stock-recount.component.html',
  styleUrls: ['./stock-recount.component.scss']
})
export class StockRecountComponent implements OnInit {

  shops = ['Local 1', 'Local 2', 'Local 3'];
  Status = ['Pendiente', 'En Progreso', 'Finalizado'];
  statusSelect: any;
  shop1Select: any;
  displayedColumns: string[] = ['recount_num', 'date', 'end_date', 'shop', 'status', 'observations'];
  dataSource = new MatTableDataSource<StockRecount>(ELEMENT_DATA);
  subscription: Subscription;
  public isMobile : boolean ;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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

  openDialog(): void {
    const dialogRef = this.dialog.open(NewStockRecountDialog, {
      height: '90vh',
      maxWidth : '100vw',
      minWidth: '60vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}
@Component({
  selector: 'app-new-stock-recount-dialog',
  templateUrl: 'new-stock-recount-dialog.html',
})
export class NewStockRecountDialog {

  addStockRecountFormGroup: FormGroup;
  articles = ['Articulo 1', 'Articulo 2', 'Articulo 3'];
  displayedColumns: string[] = ['article', 'expected_stock', 'options'];
  modaldataSource = new MatTableDataSource<ArticlesStockRecount>(ELEMENT_DATA1);
  isSaved = false;
  shops = ['Local 1', 'Local 2', 'Local 3'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewStockRecountDialog>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.modaldataSource.paginator = this.paginator;
      this.addStockRecountFormGroup = this._formBuilder.group({
        shop: ['', Validators.required],
        type: ['', Validators.required],
        observations: [''],
        article: [''],
        articleFilter: ['']
      });
    }

  addArticle(value: string) {
    if (this.modaldataSource.data.find(x => x.article === value)) {
      this.toastr.warning("Ya agregó el artículo seleccionado");
    }else{
      const data = this.modaldataSource.data;
      data.push({ article: value, expected_stock: 2000 });
      this.modaldataSource.data = data;
    }
  }

  deleteArticle(idx) {
    const data = this.modaldataSource.data;
    data.splice(idx, 1);
    this.modaldataSource.data = data;
  }

  addStockRecount() {
    this.isSaved = true;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
