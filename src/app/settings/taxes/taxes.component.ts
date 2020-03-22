import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddTaxesComponent } from './modals/add-taxes/add-taxes.component';
import { MatSort, MatPaginator } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { TaxService } from 'src/app/services/tax.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { HeadquarterService } from 'src/app/services/headquarter.service';

export interface PeriodicElement {
  name: string;
  apply: boolean;
  percentage: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'IVG', apply: true, percentage: 15 },
  { name: 'IVA', apply: true, percentage: 13 },
  { name: 'SGA', apply: true, percentage: 18 },
  { name: 'HCG', apply: true, percentage: 10 },
];

@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.scss']
})
export class TaxesComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource : MatTableDataSource<any>;
  public isMobile: boolean;
  subscription: Subscription;
  headquarters: any;
  headquarterId: any;

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    public taxService: TaxService,
    private headquarterService: HeadquarterService,
    private coolDialogs: NgxCoolDialogsService,
    private screenMobileChangeService: ScreenMobileChangeService,
  ) {
    this.isMobile = this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  ngOnInit() {
    this.getHeadquarters();
    this.dataSource = new MatTableDataSource<any>([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getTaxes();
  }

  getHeadquarters() {
    this.headquarterService.getHeadquarters().subscribe(res => {
      if(res.data) {
        this.headquarters = [].concat(res.data.headquarters);
      }
    }, err => {
      console.log(err);
    });
  }

  getTaxes() {
    this.taxService.getTaxes().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.taxes);
    }, err => {
      console.log(err);
    });
  }

  deleteTax(id,index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado',{
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
        this.taxService.deleteTax(id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
          this.dataSource.data.splice(index,1);
          this.dataSource.data = [].concat(this.dataSource.data);
        }, err => {
          console.log(err);
        });
      }
    });
  }

  changeVisibility(id,index,status) {
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
        this.taxService.updateStateTax({state: !this.dataSource.data[index]["state"]},id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
          this.dataSource.data[index]["state"] =  !this.dataSource.data[index]["state"];
          this.dataSource.data = [].concat(this.dataSource.data);
        }, err => {
          console.log(err);
        });
      }
    });
  }


  openDialog(id,index): void {
    const dialogRef = this.dialog.open(AddTaxesComponent, {
      maxWidth : '100vw',
      minWidth: '60vw',
      panelClass: 'config-modal',
      data: id ? {id} : {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(id){
          this.dataSource.data[index] = result;
        }else{
          this.dataSource.data.push(result);
        }
        this.dataSource.data = [].concat(this.dataSource.data);
      }
    });
  }


  displayedColumns: string[] = ['select', 'name', 'apply', 'percentage', 'local', 'options'];

  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${+ 1}`;
  }

}
