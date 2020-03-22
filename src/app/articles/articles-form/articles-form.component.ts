import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { FormGroupDirective, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Article, NewArticleDialog, ArticlesStock, ArticlesShops } from '../articles.component';
import { CategoryService } from 'src/app/services/category.service';

const ELEMENT_DATA: Article[] = [
  { article: 'Coca Cola', category: 'Bebidas', price: 12.26, cost: 12.00, margin: '12%', in_stock: 2100 , status:true}
];

const ELEMENT_DATA1: ArticlesStock[] = [];

const ELEMENT_DATA2: ArticlesShops[] = [
  { available: true, shop: 'Local 1', price: 12.26 }
];


@Component({
  selector: 'app-articles-form',
  templateUrl: './articles-form.component.html',
  styleUrls: ['./articles-form.component.scss']
})
export class ArticlesFormComponent implements OnInit {

  @Input() articleID: any;
  public form: FormGroup;


  addArticleFormGroup: FormGroup;
  articles = ['Articulo 1', 'Articulo 2', 'Articulo 3'];
  categories: any;
  modifiers = [{name: 'Barra Libre', description: 'test'},{name: 'Parrilla', description: 'test'}];
  displayedColumns: string[] = ['component', 'qty', 'cost', 'options'];
  displayedColumnsShops: string[] = ['available', 'shop', 'price'];
  modaldataSource = new MatTableDataSource<ArticlesStock>(ELEMENT_DATA1);
  modaldataSourceShops = new MatTableDataSource<ArticlesShops>(ELEMENT_DATA2);
  isSaved = false;
  shops = ['Local 1', 'Local 2', 'Local 3'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewArticleDialog>,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.modaldataSource.paginator = this.paginator;
      this.form = this._formBuilder.group({
        name: ['', Validators.required],
        type_sale: ['', Validators.required],
        category: ['', Validators.required],
        price: [''],
        cost: ['', Validators.required],
        reference: ['', Validators.required],
        barcode: ['', Validators.required],
        article: [''],
        articleFilter: [''],
        compound_article: [false],
        use_stock: [false],
        mainDealer: [''],
        default_sales_cost: [''],
        igv: [''],
        iva: [''],
        color: ['']
      });
    }

    ngOnInit(){
      this.getCategories();
    }

  getCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data.categories;
    })
  }

  addArticle(value: string) {
    const data = this.modaldataSource.data;
    data.push({ component: value, qty: 2000, cost: 12.34 });
    this.modaldataSource.data = data;
  }

  deleteArticle(idx) {
    const data = this.modaldataSource.data;
    data.splice(idx, 1);
    this.modaldataSource.data = data;
  }


  submit(data: any, formDirective: FormGroupDirective) {
    if(this.articleID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.toastr.clear();
    this.toastr.success('Operación Exitosa');
  }

  edit(data: any) {
    this.toastr.clear();
    this.toastr.success('Operación Exitosa');
  }

}
