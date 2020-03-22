import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormCategoryComponent } from '../form-category/form-category.component';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';

export interface Category {
  description: string;
  status: boolean;
}

const ELEMENT_DATA: Category[] = [
  { description: 'Descripción 1', status: true, },
  { description: 'Descripción 2', status: true, },
  { description: 'Descripción 3', status: true, },
];

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['position', 'description', 'status', 'options'];
  dataSource = [];
public isMobile : boolean ;
  subscription: Subscription;
  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    public categoryService: CategoryService
  ) {
        this.isMobile= this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => { 
      this.isMobile = isMobile;
    });
   }

   ngOnInit() {
    this.getCategories();
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(res => {
      if(res.data) this.dataSource = res.data;
    }, err => {
      
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogFormCategory, {
      width: '50vw'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}

@Component({
  selector: 'dialog-form-category',
  templateUrl: 'dialog-form-category.html',
})
export class DialogFormCategory {

  constructor(
    public dialogRef: MatDialogRef<DialogFormCategory>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
