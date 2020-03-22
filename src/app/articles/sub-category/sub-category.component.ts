import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogRef } from '@angular/material';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SubCategoryFormComponent } from '../sub-category-form/sub-category-form.component';
import { CategoryService } from 'src/app/services/category.service';
import { SubCategoryService } from 'src/app/services/sub-category.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public isMobile : boolean ;
  subscription: Subscription;

  displayedColumns: string[] = ["position","category","description","options",];
  dataSource : MatTableDataSource<any>;
  allSelected : boolean;
  showRemove : boolean;
  shop : number | null | string = "all";


  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    public categoryService: CategoryService,
    public subCategoryService: SubCategoryService,
    private coolDialogs: NgxCoolDialogsService
  ) {
      this.isMobile= this.screenMobileChangeService.isMobile;
      this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
        this.isMobile = isMobile;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog(id,index): void {
    const dialogRef = this.dialog.open(SubCategoryFormComponent, {
      maxWidth : '100vw',
      minWidth: '60vw',
      panelClass: 'config-modal',
    });

    if(id) dialogRef.componentInstance.subCategoryID = id;
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

  getSubCategories() {
    this.subCategoryService.getSubCategories().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.sub_category);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });
  }

  deleteCategory(id,index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado',{
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
        this.subCategoryService.deleteSubCategory(id).subscribe(res => {
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
        this.subCategoryService.updateStateSubCategory({state: !this.dataSource.data[index]["state"]},id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
          this.dataSource.data[index]["state"] =  !this.dataSource.data[index]["state"];
          this.dataSource.data = [].concat(this.dataSource.data);
        }, err => {
          console.log(err);
        });
      }
    });
  }

  // changeVisibility(id,index) {
  //   this.subCategoryService.updateStateSubCategory({state: !this.dataSource.data[index]["state"]},id).subscribe(res => {
  //     this.toastr.success("Operación realizada satisfactoriamente");
  //      this.dataSource.data[index]["state"] =  !this.dataSource.data[index]["state"];
  //     this.dataSource.data = [].concat(this.dataSource.data);
  //   }, err => {
  //     console.log(err);
  //   });
  // }

  ngOnInit() {
    this.allSelected = false;
    this.showRemove = false;
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getSubCategories();
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

}
