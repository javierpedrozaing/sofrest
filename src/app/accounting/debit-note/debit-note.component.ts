import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSelect, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-debit-note',
  templateUrl: './debit-note.component.html',
  styleUrls: ['./debit-note.component.scss']
})
export class DebitNoteComponent implements OnInit {

  minDate = new Date();
  subjects = ['Corrección de Productos', 'Modificación de precio'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ["name","price","qty","subtotal","total","options",];
  clients = [
    { name: 'Pedro Perez', dni: 'mnbv' },
    { name: 'Pedro Alcantara', dni: 'mnbv' },
    { name: 'Pedro Suarez', dni: 'mnbv' },
  ]
  public form: FormGroup;
  articles: any = [
    {
      "id": 1,
      "name": "Artículo 1",
    },
    {
      "id": 2,
      "name": "Artículo 2",
    },
    {
      "id": 3,
      "name": "Artículo 3",
    },
    {
      "id": 4,
      "name": "Artículo 4",
    },
    {
      "id": 5,
      "name": "Artículo 5",
    },
  ];

  public operations: any =
    [
      {
        id: 1,
        name: "Venta Interna"
      },
      {
        id: 1,
        name: "Venta de Importación"
      },
    ]
  public currencies: any =
    [
      {
        id: 1,
        name: "Soles"
      },
      {
        id: 2,
        name: "USD"
      }
    ]
  showArticles: boolean = false;

  allSelected: boolean;
  dataSource: MatTableDataSource<any>;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.form = fb.group({
      observation: [null, [Validators.required]],
      subject: [null, [Validators.required]],
      client: [null, [Validators.required]],
      serie: [null, [Validators.required]],
      ref: [null, [Validators.required]],
      gravada: [0, [Validators.required]],
      igv: [0, [Validators.required]],
      total: [0, [Validators.required]],
      "document":[null, [Validators.required]],
      "serieDoc":[null, [Validators.required]],
      "number":[null, [Validators.required]],
      "note_type":[null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
  }

  checkArticle(value: boolean, index: number) {
    this.articles[index]["checked"] = value;
    if (!value) this.allSelected = false;
    else {
      this.allSelected = this.articles.filter(data => data.checked).length === this.articles.length ? true : false;
    }
  }

  selectAll(value: boolean) {
    this.allSelected = value;
    this.articles.map(data => {
      data.checked = value;
      return data;
    });
  }


  changeQty(index : number, value: number){
    if(this.dataSource.data[index]["qty"] >=0){
       this.dataSource.data[index]["qty"] = this.dataSource.data[index]["qty"] + (value ===-1 && this.dataSource.data[index]["qty"]===0 ? 0 : value );
    }
    else this.dataSource.data[index]["qty"] = 0;
    this.dataSource.data = [].concat(this.dataSource.data);
    this.calculateValues();
  }

  removeElement(index:number){
    this.dataSource.data.splice(index,1);
    this.dataSource.data = [].concat(this.dataSource.data);
    this.calculateValues();
  }

  openDialog(data,index): void {
    const dialogRef = this.dialog.open(DialogDocumentInclude, {
    maxWidth : '100vw',
    minWidth: '60vw',
    data: data === null ? {} : data
  });

  dialogRef.afterClosed().subscribe((result:any) => {
    if (result && !data) {
      this.dataSource.data.push(result);
    }
    if(data && result){
      this.dataSource.data[index]=Object.assign({},result);
    }
    this.dataSource.data = [].concat(this.dataSource.data);
    this.calculateValues();
  });
  }

  calculateValues(){
    let gravada : number = 0;
    this.dataSource.data.map((value)=>{
      gravada+= (value.qty*value.price);
    })
    this.form.patchValue({
      gravada: gravada,
      igv: gravada*0.18,
      total: gravada + gravada*0.18,
    });
  }
  

}

@Component({
  selector: 'dialog-document',
  templateUrl: 'dialog-document.html',
})
export class DialogDocumentInclude implements OnInit {
  public form: FormGroup;
  public products: any[] = [
    {
      "name": "Papas Fritas", "code": "0012522", "price": 20, status: true,
    },
    {
      "name": "Gaseosa", "code": "0012518", "price": 15, status: true,
    },
    {
      "name": "Lasagna", "code": "0012518", "price": 25, status: true,
    },
  ];

  public categories: any[] = [
    {
      "name": "Categoria 1",
    },
    {
      "name": "Categoria 2",
    },
    {
      "name": "Categoria 3",
    },
  ];

  public subCategories: any[] = [
    {
      "name": "Sub-Categoria 1",
    },
    {
      "name": "Sub-Categoria 2",
    },
    {
      "name": "Sub-Categoria 3",
    },
  ];

  public productCtrl: FormControl = new FormControl();
  public productFilterCtrl: FormControl = new FormControl();
  public filteredProducts: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  public _onDestroy = new Subject<void>();

  public categoryCtrl: FormControl = new FormControl();
  public categoryFilterCtrl: FormControl = new FormControl();
  public filteredCategories: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect1', { static: true }) singleSelect1: MatSelect;

  public subCategoryCtrl: FormControl = new FormControl();
  public subCategoryFilterCtrl: FormControl = new FormControl();
  public filteredSubCategories: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect2', { static: true }) singleSelect2: MatSelect;

  constructor(
    public dialogRef: MatDialogRef<DialogDocumentInclude>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.form = fb.group({
      "code": [data.code || null, [Validators.required]],
      "article": [data.article || null, [Validators.required]],
      "qty": [data.qty || 0, [Validators.required]],
      "price": [data.price || 0, [Validators.required]],
    });
  }


  ngOnInit() {
    this.filteredProducts.next(this.products.slice());
    this.productFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterProducts();
      });
    this.filteredCategories.next(this.categories.slice());
    this.categoryFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCategories();
      });
    this.filteredSubCategories.next(this.subCategories.slice());
    this.subCategoryFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterSubCategories();
      });
  }

  changeValueCategory(event) { }

  changeValueSubCategory(event) { }

  changeValue(event) {
    if(event.value){
      this.form.patchValue({
        code: event.value.code,
        article: event.value.name,
        price: event.value.price,
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public filterProducts() {
    if (!this.products) {
      return;
    }
    let search = this.productFilterCtrl.value;
    if (!search) {
      this.filteredProducts.next(this.products.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredProducts.next(
      this.products.filter(product => product.name.toLowerCase().indexOf(search) > -1)
    );
  }

  public filterCategories() {
    if (!this.categories) {
      return;
    }
    let search = this.categoryFilterCtrl.value;
    if (!search) {
      this.filteredCategories.next(this.categories.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredCategories.next(
      this.categories.filter(product => product.name.toLowerCase().indexOf(search) > -1)
    );
  }

  public filterSubCategories() {
    if (!this.subCategories) {
      return;
    }
    let search = this.subCategoryFilterCtrl.value;
    if (!search) {
      this.filteredSubCategories.next(this.subCategories.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredSubCategories.next(
      this.subCategories.filter(product => product.name.toLowerCase().indexOf(search) > -1)
    );
  }

  save(data){
    this.dialogRef.close(data);
  }
}