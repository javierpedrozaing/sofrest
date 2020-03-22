import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ModifierService } from 'src/app/services/modifier.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { HeadquarterService } from 'src/app/services/headquarter.service';

export interface Modifier {
  modifier: string;
  options: string;
  checked: boolean;
}

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.scss']
})
export class ModifierComponent implements OnInit, OnDestroy{


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public isMobile : boolean ;
  subscription: Subscription;

  displayedColumns: string[] = ['position', 'modifier', 'options'];
  dataSource : MatTableDataSource<Modifier>;
  allSelected : boolean;
  showRemove : boolean;
  shop : number | null | string = "all";
  stores: any;

  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    private headquarterService: HeadquarterService,
    public modifierService : ModifierService,
    private coolDialogs: NgxCoolDialogsService
  ) {
      this.isMobile= this.screenMobileChangeService.isMobile;
      this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
        this.isMobile = isMobile;
      });
  }

  getHeadquarters() {
    this.headquarterService.getHeadquarters().subscribe(res => {
      if(res.data) this.stores = [].concat(res.data.headquarters);
    }, err => {
      console.log(err);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogModifierForm, {
      width: '70vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getModifiers();
    });
  }

  ngOnInit() {
    this.allSelected = false;
    this.showRemove = false;
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getModifiers();
    this.getHeadquarters();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changeShop(){

  }

  checkedElement(value: boolean, index : number){
    this.dataSource.data[index]["checked"] = value;
    if(!value) this.allSelected = false;
    else{
      this.showRemove = value;
      this.allSelected = this.dataSource.data.length === this.dataSource.data.filter(data => data.checked).length  ? true : false;
    }
    this.showRemove = this.dataSource.data.filter(data => data.checked === true).length > 0  ? true : false;
  }

  selectAll(value: boolean){
    this.allSelected = value;
    this.showRemove = value;
    this.dataSource.data.map(data => {
        data.checked = value;
        return data;
    });
    this.showRemove = this.dataSource.data.filter(data => data.checked === true).length > 0  ? true : false;
  }

  removeSelected(){
    this.dataSource.data = this.dataSource.data.filter(data => !data.checked);
    this.toastr.clear();
    this.toastr.success('Operación Exitosa');
    this.allSelected = this.showRemove = false;
  }

  getModifiers() {
    this.modifierService.getModifiers().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.modifier);
      this.dataSource.paginator = this.paginator;
    }, err => {
      console.log(err);
    });
  }

  deleteModifier(id,index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado',{
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
        this.modifierService.deleteModifier(id).subscribe(res => {
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
        this.modifierService.updateStateModifier({state: !this.dataSource.data[index]["state"]},id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
           this.dataSource.data[index]["state"] =  !this.dataSource.data[index]["state"];
          this.dataSource.data = [].concat(this.dataSource.data);
        }, err => {
          console.log(err);
        });
      }
    });
  }

}

@Component({
  selector: 'dialog-modifier-form.html',
  templateUrl: 'dialog-modifier-form.html',
})
export class DialogModifierForm {

  constructor(
    public dialogRef: MatDialogRef<DialogModifierForm>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
