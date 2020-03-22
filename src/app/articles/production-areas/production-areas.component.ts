import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { ProductionAreaService } from 'src/app/services/production-area.service';
import { HeadquarterService } from 'src/app/services/headquarter.service';

export interface ProductionAreas {
  name: string;
  status: boolean;
  code: string;
  description: string;
}

const ELEMENT_DATA: ProductionAreas[] = [
  { name: 'Terraza', code: 'AB567', status: true, description: 'Test' }
];

@Component({
  selector: 'app-production-areas',
  templateUrl: './production-areas.component.html',
  styleUrls: ['./production-areas.component.scss']
})
export class ProductionAreasComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public isMobile: boolean;
  subscription: Subscription;

  displayedColumns: string[] = ['name', 'code', 'options'];
  dataSource = new MatTableDataSource<any>([]);
  public headquarters: any[] = [];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    public productionAreasService: ProductionAreaService,
    private screenMobileChangeService: ScreenMobileChangeService,
    private coolDialogs: NgxCoolDialogsService,
    public headquarterService: HeadquarterService,
  ) {
    this.isMobile = this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  changeVisibility(id, index, status) {
    let action = '';

    status == true ? (action = 'ocultará') : (action = 'mostrará');

    this.coolDialogs.confirm(`Se ${action} el registro indicado`,{
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
        this.productionAreasService.updateStateProductionArea({ state: !this.dataSource.data[index]["state"] }, id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
          this.dataSource.data[index]["state"] = !this.dataSource.data[index]["state"];
          this.dataSource.data = [].concat(this.dataSource.data);
        }, err => {
          console.log(err);
        });
      }
    });
  }

  // changeVisibility(id, index) {
  //   this.productionAreasService.updateStateProductionArea({ state: !this.dataSource.data[index]["state"] }, id).subscribe(res => {
  //     this.toastr.success("Operación realizada satisfactoriamente");
  //     this.dataSource.data[index]["state"] = !this.dataSource.data[index]["state"];
  //     this.dataSource.data = [].concat(this.dataSource.data);
  //   }, err => {
  //     console.log(err);
  //   });
  // }

  openDialog(id, index): void {
    const dialogRef = this.dialog.open(NewProductionAreaDialog, {
      maxWidth: '100vw',
      minWidth: '60vw',
      data: (id) ? { id } : {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (id) {
          this.dataSource.data[index] = result;
        } else {
          this.dataSource.data.push(result);
        }
        this.dataSource.data = [].concat(this.dataSource.data);
      }
    });
  }

  getProductionAreas() {
    this.productionAreasService.getProductionAreas().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.production_areas);
      this.dataSource.paginator = this.paginator;
    }, err => {
      console.log(err);
    });
  }

  deleteProductionArea(id, index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado', {
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
      .subscribe(res => {
        if (res) {
          this.productionAreasService.deleteProductionArea(id).subscribe(res => {
            this.toastr.success("Operación realizada satisfactoriamente");
            this.dataSource.data.splice(index, 1);
            this.dataSource.data = [].concat(this.dataSource.data);
          }, err => {
            console.log(err);
          });
        }
      });
  }

  ngOnInit() {
    this.getProductionAreas();
    this.dataSource.paginator = this.paginator;
  }

}
@Component({
  selector: 'app-new-production-area-dialog',
  templateUrl: 'new-production-area.html',
})
export class NewProductionAreaDialog {

  addProductionAreaFormGroup: FormGroup;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public headquarters: any[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewProductionAreaDialog>,
    private toastr: ToastrService,
    public productionAreasService: ProductionAreaService,
    public headquarterService: HeadquarterService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.addProductionAreaFormGroup = this._formBuilder.group({
      headquarter_id: [null, [Validators.required]],
      code: [null, [Validators.minLength(2),Validators.maxLength(2)]],
      description: [null, Validators.required],
      state: [true, Validators.required]
    });
    if (this.data.id) this.getProductionArea(this.data.id);
    this.getHeadquarters();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if (this.data.id) this.edit(data);
    else this.save(data, formDirective);
  }

  getHeadquarters() {
    this.headquarterService.getHeadquarters().subscribe(res => {
      if(res.data) this.headquarters = [].concat(res.data.headquarters);
    }, err => {
      console.log(err);
    });
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.productionAreasService.createProductionArea(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.dialogRef.close(res.data.createProductionArea);
    }, err => {
      console.log(err);
    });
  }

  getProductionArea(id) {
    this.productionAreasService.getProductionArea(id).subscribe(res => {
      if(res.data){
        if (res.data.production_areas.length === 0) {
          this.toastr.error("No se encuentra el registro indicado")
        } else {
          this.addProductionAreaFormGroup.patchValue({
            description: res.data.production_areas[0].description,
            code: res.data.production_areas[0].code,
            state: res.data.production_areas[0].state,
            headquarter_id: (res.data.production_areas[0].headquarter) ? res.data.production_areas[0].headquarter.id : null,
          });
        }

      }
    }, err => {
      console.log(err);
    });
  }

  compareObjects(o1: any, o2: any) {
    if (o1 === o2) return true;
    else return false
  }

  edit(data: any) {
    this.productionAreasService.updateProductionArea(this.data.id, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.dialogRef.close(res.data.updateProductionArea);
    }, err => {
      console.log(err);
    });
  }

}
