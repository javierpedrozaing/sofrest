import { Component, OnInit, ChangeDetectorRef, Inject, OnDestroy, ViewChild } from '@angular/core';
import { GridsterConfig, GridsterItem, GridType, CompactType, DisplayGrid } from 'angular-gridster2';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeInItems, MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoungeService } from 'src/app/services/lounge.service';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.scss']
})
export class SupervisorComponent implements OnInit, OnDestroy {

  @ViewChild('clickHoverMenuTrigger', {static: false}) clickHoverMenuTrigger: MatMenuTrigger;

  options: GridsterConfig;
  dimensios: any;
  public joinTables: any[];
  public Salon: any[];
  public _id: any;
  public lengthColunm : number;
  public selectedItem: any;
  public nameSala: String = 'Salon N°1';
  dashboard: Array<GridsterItem>;
  subscription: Subscription;
  public auxItem : number = 4;
  public selectedTables = [];
  public enableUnion : boolean = false;
  public Salones : any;
  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    public dialog: MatDialog,
    public loungeService: LoungeService,
    private activeRoute: ActivatedRoute,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
  ) {
 //   if(this.screenMobileChangeService.isMobile) this.router.navigate(['/orders-mobile']);
    // this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
    //   if(isMobile) this.router.navigate(['/orders-mobile']);
    // });
    this._id = this.activeRoute.snapshot.params.id;
    this.joinTables = [];
    this.Salon = [
      {
        name: 'Salon N°1', id: 1, data: [
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 0, x: 0, name: '01', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 0, x: 6, name: '02', status: 'enabled', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 0, x: 12, name: '03', status: 'busy', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 0, x: 18, name: '04', status: 'busy', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 0, x: 24, name: '17', status: 'busy', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 0, x: 30, name: '18', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 0, x: 36, name: '25', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 5, x: 2, name: '26', status: 'busy', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 5, x: 8, name: '29', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 5, x: 14, name: '30', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 5, x: 20, name: '05', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 5, x: 26, name: '06', status: 'busy', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 5, x: 32, name: '07', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 10, x: 0, name: '08', status: 'busy', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 10, x: 6, name: '19', status: 'busy', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 10, x: 12, name: '20', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 10, x: 18, name: '27', status: 'busy', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 10, x: 24, name: '28', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 10, x: 30, name: '09', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 10, x: 36, name: '10', status: 'busy', menu: true, join: { arrayPosition: '', status: false } },
          
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 15, x: 2, name: '11', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 15, x: 8, name: '12', status: 'busy', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 15, x: 14, name: '21', status: 'busy', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 15, x: 20, name: '22', status: 'enabled', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 15, x: 26, name: '13', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 15, x: 32, name: '14', status: 'busy', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 15, x: 38, name: '15', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
          
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 20, x: 6, name: '16', status: 'enabled', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 20, x: 16, name: '23', status: 'enabled', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 20, x: 26, name: '24', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
        ]
      },
      {
        name: 'Salon N°1', id: 1, data: [
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 0, x: 0, name: '01', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 0, x: 6, name: '02', status: 'enabled', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 0, x: 12, name: '03', status: 'busy', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 0, x: 18, name: '04', status: 'busy', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 0, x: 24, name: '17', status: 'busy', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 0, x: 30, name: '18', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 0, x: 36, name: '25', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 5, x: 2, name: '26', status: 'busy', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 5, x: 8, name: '29', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 5, x: 14, name: '30', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 5, x: 20, name: '05', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 5, x: 26, name: '06', status: 'busy', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 5, x: 32, name: '07', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 10, x: 0, name: '08', status: 'busy', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 10, x: 6, name: '19', status: 'busy', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 10, x: 12, name: '20', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 10, x: 18, name: '27', status: 'busy', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 10, x: 24, name: '28', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 10, x: 30, name: '09', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 10, x: 36, name: '10', status: 'busy', menu: true, join: { arrayPosition: '', status: false } },
          
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 17, x: 2, name: '11', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 17, x: 8, name: '12', status: 'busy', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 17, x: 14, name: '21', status: 'busy', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 17, x: 20, name: '22', status: 'enabled', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 17, x: 26, name: '13', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 17, x: 32, name: '14', status: 'busy', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 17, x: 38, name: '15', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
          
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 24, x: 6, name: '16', status: 'enabled', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 24, x: 16, name: '23', status: 'enabled', menu: true, join: { arrayPosition: '', status: false } },
          { cols: this.auxItem,selected:false, rows: this.auxItem, y: 24, x: 26, name: '24', status: 'available', menu: true, join: { arrayPosition: '', status: false } },
        ]
      }
    ];
    this.selectedItem = this.Salon[0];
  }

  cancelUnion(){
    this.enableUnion = false;
    this.dashboard = this.dashboard.map((data)=>{
      data.selected= false;
      return data;
    })
  }
  
  selectTable(index){
    if(this.enableUnion){
      this.dashboard[index]["selected"]=!this.dashboard[index]["selected"];
    }
  }

  applyUnion(){
    if(this.dashboard.filter(x =>x.selected === true ).length<2) return this.toastr.warning("Debe seleccionar dos o más mesas");
    let selectedTables = this.dashboard.filter(x =>x.selected === true );
    let tables = this.dashboard.filter(x =>x.selected === false);
    let itemAdd : any= { cols: this.auxItem,selected:false, rows: this.auxItem, y: selectedTables[0]["y"], x: selectedTables[0]["x"], name: null, status: 'available', menu: true, join: { arrayPosition: '', status: false } };
    itemAdd.tables = [];
    for (let index = 0; index < selectedTables.length; index++) {
     if(selectedTables[index].tables){
        if(Array.isArray(selectedTables[index]["tables"])){
          itemAdd.tables = itemAdd.tables.concat(selectedTables[index]["tables"]);
        }
     }else{
       itemAdd.tables.push(selectedTables[index]["name"])
     }
    }
    this.dashboard = [].concat(tables);
    this.dashboard.push(itemAdd);
    this.enableUnion = false;
  }

  separateTables(index){
    if(!this.dashboard[index]["tables"]) return this.toastr.warning("No puede separar esta mesa");
    let tables = [].concat(this.dashboard[index]["tables"]);
    let itemAdd : any= { cols: this.auxItem,selected:false, rows: this.auxItem, y: 0, x: 0, name: null, status: 'available', menu: true, join: { arrayPosition: '', status: false } };
    this.dashboard.splice(index,1);
    tables.forEach((table)=>{
      this.dashboard.push(Object.assign({},itemAdd,{name:table}));
    })
  }

  prevent(e) {
    e.preventDefault();
    e.stopPropagation();
    this.clickHoverMenuTrigger.openMenu();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(roomDialog, {
      width: '50vw',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
   // this.subscription.unsubscribe();
  }

  SalonChange(value) {
    this.nameSala = value.name;
    this.dashboard = value.data;
  }


  openStatus(data: any, position): void {
    data.positioin = position;
    const dialogRef = this.dialog.open(StatusTable, {
      width: '380px',
      panelClass: 'config-modal',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.status !== undefined) { this.ChangeStatusTable(result); }
    });
  }

  ChangeStatusTable(data) {
    this.dashboard[data.position].status = data.status;
    this.changedOptions();
  }

  lockTable(item, idx, status) {
    this.dashboard[idx].status = status;
    this.changedOptions();
  }

  addItem() {
    this.dashboard.push({ cols: 2, rows: 1, y: 0, x: 0 });
  }

  JoinTablesP() {
    const aux = this.dashboard.indexOf(this.joinTables[0].t_2);
    const aux_2 = this.dashboard.indexOf(this.joinTables[0].t_1);
    if (aux !== -1) {
      this.dashboard[aux].menu = false;
      this.dashboard[aux].join.arrayPosition = aux_2;
      this.dashboard[aux_2].join.arrayPosition = aux;
      this.dashboard[aux].join.status = true;
      this.dashboard[aux_2].join.status = true;
      this.changedOptions();
      this.joinTables = [];
    }
  }

  back(){
    this.router.navigateByUrl('/halls');
  }

  ChangeSalon(idx){
    this.dashboard = this.Salon[idx].data; 
  }

  getLounges() {
    this.loungeService.getLounges().subscribe(res => {
      if(res.data) this.Salones = [].concat(res.data.lounge) 
    }, err => {
      console.log(err);
    });
  }



  ngOnInit() {
    this.options = {
      itemChangeCallback: (item, itemComponent) => {
        this.changedOptions();
      },
      gridType: GridType.Fixed,
      outerMargin: true,
      swap: false,
      pushItems: false,
      mobileBreakpoint: 100,
      outerMarginTop: 10,
      outerMarginRight: 10,
      outerMarginBottom: 10,
      outerMarginLeft: 10,
      minCols: 1,
      maxCols: 40, // maximo de columnas
      minRows: 1,
      maxRows: 40, // maximo de filas
      maxItemCols: 4,
      minItemCols: 4,
      maxItemRows: 4,
      minItemRows: 4,
      maxItemArea: 144,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      compactType: CompactType.None,
      margin: 5,
      fixedColWidth: 100,
      fixedRowHeight: 100,
      displayGrid: DisplayGrid.None,
      draggable: {
        enabled: this._id == '0' ? true : false,
      },
      resizable: {
        enabled: false,
      },
    };
    this.dashboard = this.Salon[0].data;
    this.getLounges();
  }

  onResize(event) {
    this.dimensios = { width: document.getElementById('tableMozo').offsetWidth, height: document.getElementById('tableMozo').offsetHeight };
    this.configGeneralGrid(this.dimensios);
  }


  configGeneralGrid(dimensios){
    this.options.fixedColWidth = (dimensios.width - 215) / 40;
    this.options.fixedRowHeight = (dimensios.height - 215) / 40;
    this.changedOptions();
  }


  ngAfterViewInit() {
    this.dimensios = { width: document.getElementById('tableMozo').offsetWidth, height: document.getElementById('tableMozo').offsetHeight };
    this.configGeneralGrid(this.dimensios);
  }

  changedOptions() {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

}

@Component({
  selector: 'table-status',
  templateUrl: 'status-table.html',
  styleUrls: ['./supervisor.component.scss']
})
export class StatusTable {
  Table: any;
  option: String;
  constructor(
    public dialogRef: MatDialogRef<StatusTable>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.option = data.status;
    this.Table = data;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'room-dialog',
  templateUrl: 'room-dialog.html',
})
export class roomDialog {

  addRoomFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<roomDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.addRoomFormGroup = this._formBuilder.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        observation: ['']
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}