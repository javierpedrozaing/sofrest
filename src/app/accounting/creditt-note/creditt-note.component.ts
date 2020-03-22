import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogDocumentInclude } from '../debit-note/debit-note.component';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-creditt-note',
  templateUrl: './creditt-note.component.html',
  styleUrls: ['./creditt-note.component.scss']
})
export class CredittNoteComponent implements OnInit {
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
