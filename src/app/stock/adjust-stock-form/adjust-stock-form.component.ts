import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ArticlesStockAdjust, NewStockAdjustDialog } from '../adjust-stock/adjust-stock.component';

const ELEMENT_DATA1: ArticlesStockAdjust[] = [];
@Component({
  selector: 'app-adjust-stock-form',
  templateUrl: './adjust-stock-form.component.html',
  styleUrls: ['./adjust-stock-form.component.scss']
})
export class AdjustStockFormComponent implements OnInit {

  // form: FormGroup;
  // articles = ['Articulo 1', 'Articulo 2', 'Articulo 3'];
  // displayedColumns: string[] = ['article', 'in_stock', 'add_stock', 'cost', 'final_stock', 'options'];
  // modaldataSource = new MatTableDataSource<ArticlesStockAdjust>(ELEMENT_DATA1);
  // isSaved = false;
  // subjects = ['Recibir Articulos', 'Recuento de Inventario', 'Perdida', 'Da&ntilde;ado'];
  // shops = ['Local 1', 'Local 2', 'Local 3'];

  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  // constructor(
  //   private _formBuilder: FormBuilder,
  //   public dialogRef: MatDialogRef<NewStockAdjustDialog>,
  //   public data: any) {
  //     this.modaldataSource.paginator = this.paginator;
  //     this.form = this._formBuilder.group({
  //       subject: ['', Validators.required],
  //       shop: ['', Validators.required],
  //       observations: [''],
  //       article: [''],
  //       articleFilter: ['']
  //     });
  //   }

  // addArticle(value: string) {
  //   const data = this.modaldataSource.data;
  //   data.push({ article: value, in_stock: 2000, add_stock: 50, cost: 120, final_stock: 100 });
  //   this.modaldataSource.data = data;
  // }

  // deleteArticle(idx) {
  //   const data = this.modaldataSource.data;
  //   data.splice(idx, 1);
  //   this.modaldataSource.data = data;
  // }

  // addStockAdjust() {
  //   this.isSaved = true;
  // }

  ngOnInit(){

  }
}
