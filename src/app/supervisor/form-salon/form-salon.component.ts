import { Component, OnInit, ChangeDetectorRef, Inject, OnDestroy } from '@angular/core';
import { GridsterConfig, GridsterItem, GridType, CompactType, DisplayGrid } from 'angular-gridster2';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeInItems } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-salon',
  templateUrl: './form-salon.component.html',
  styleUrls: ['./form-salon.component.scss']
})
export class FormSalonComponent implements OnInit {

  options: GridsterConfig;
  dimensios: any;
  public quantity: any;
  public selectedItem: any;
  public isMobile : boolean ;
  dashboard: Array<GridsterItem> = [];
  subscription: Subscription;  

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    public dialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private screenMobileChangeService: ScreenMobileChangeService,
  ) { 
    this.isMobile= this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => { 
      this.isMobile = isMobile;
    });

    this.quantity = this.activeRoute.snapshot.params.quantity;
    console.log(this.quantity);
    this.InitTables(this.quantity);
  }

  InitTables(data){
    Array.from({length: this.quantity}, (v, i) =>{
      this.dashboard.push(
        {x: 0, y: 0, cols: 4, rows: 4, name: 'M-'+this.dashboard.length, status: 'available'}
      )
    });
  }


  addTable(){
    this.dashboard.push(
      {x: 0, y: 0, cols: 4, rows: 4, name: 'M-'+this.dashboard.length, status: 'available'}
    )
  }




  joinTables(): void {
    const dialogRef = this.dialog.open(JoinTables, {
      width: '50vw',
      data : this.dashboard,
      panelClass: 'config-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  deleteTable(idx){
    this.dashboard.splice(idx,1);
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
        enabled: true,
      },
      resizable: {
        enabled: false,
      },
    };
  }

  changedOptions() {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  onResize(event) {
    this.dimensios = { width: document.getElementById('tableMozoNew').offsetWidth, height: document.getElementById('tableMozoNew').offsetHeight };
    this.configGeneralGrid(this.dimensios);
   // event.target.innerWidth;
  }


  configGeneralGrid(dimensios){
    this.options.fixedColWidth = (dimensios.width - 215) / 40;
    this.options.fixedRowHeight = (dimensios.height - 215) / 40;
    this.changedOptions();
  }

  ngAfterViewInit() {
    this.dimensios = { width: document.getElementById('tableMozoNew').offsetWidth, height: document.getElementById('tableMozoNew').offsetHeight };
    console.log(this.dimensios);
    this.configGeneralGrid(this.dimensios);
  }

}

@Component({
  selector: 'join-tables',
  templateUrl: 'joinTable.html',
  styles : [`
    .content-header-modal{
      padding : 10px;
    }
  `]
})
export class JoinTables {

  dataSalon: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<JoinTables>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {
      console.log(this.data);
      this.dataSalon = this._formBuilder.group({
        name: ['', Validators.required],
        observation: ['']
      });
    }

    save(data){
      this.router.navigateByUrl('/halls/new');
      this.close();
    }

  close(): void {
    this.dialogRef.close();
  }

}
