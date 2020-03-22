import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { ArticlesCategoriesFormComponent } from '../articles-categories-form/articles-categories-form.component';
import { CategoryService } from 'src/app/services/category.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { MatSort } from '@angular/material';

export interface Categories {
  name: string;
  color: string;
  status: boolean;
  qty: number;
}

const ELEMENT_DATA: Categories[] = [
  { name: 'Bebidas', color: '#2196F3', status: true, qty: 2 }
];

@Component({
  selector: 'app-articles-categories',
  templateUrl: './articles-categories.component.html',
  styleUrls: ['./articles-categories.component.scss']
})
export class ArticlesCategoriesComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['name', 'qty', 'options'];
  dataSource = new MatTableDataSource<any>([]);
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public isMobile: boolean;
  subscription: Subscription;

  constructor(public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    public categoryService: CategoryService,
    private coolDialogs: NgxCoolDialogsService
  ) {
    this.isMobile = this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });

  }

  getCategories() {
    this.categoryService.getCategories().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.categories);
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
        this.categoryService.deleteCategory(id).subscribe(res => {
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
        this.categoryService.updateStateCategory({state: !this.dataSource.data[index]["state"]},id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
           this.dataSource.data[index]["state"] =  !this.dataSource.data[index]["state"];
          this.dataSource.data = [].concat(this.dataSource.data);
        }, err => {
          console.log(err);
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog(id,index): void {
    const dialogRef = this.dialog.open(ArticlesCategoriesFormComponent, {
      maxWidth: '100vw',
      minWidth: '60vw',
      panelClass: 'config-modal',
      data: {}
    });
    if(id) dialogRef.componentInstance.articleID = id;
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

  ngOnInit() {
    this.getCategories();
    this.dataSource.paginator = this.paginator;
  }
}

