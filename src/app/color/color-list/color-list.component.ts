import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { HeadquarterService } from 'src/app/services/headquarter.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { HallTypeService } from 'src/app/services/hall-type.service';
import { DishCategoryService } from 'src/app/services/dish-category.service';
import { TasteService } from 'src/app/services/taste.service';
import { ColorService } from 'src/app/services/color.service';
import { ColorFormComponent } from '../color-form/color-form.component';


@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.scss']
})
export class ColorListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'description', 'options',];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  public isMobile: boolean;
  subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    public colorService: ColorService,
    public TasteService: TasteService,
    private coolDialogs: NgxCoolDialogsService,
  ) {
    this.isMobile = this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog(id, index): void {
    const dialogRef = this.dialog.open(ColorFormComponent, {
      maxWidth: '100vw',
      minWidth: '60vw',
      panelClass: 'config-modal',
      data: {}
    });
    if (id) dialogRef.componentInstance.colorID = id;
    dialogRef.componentInstance.hideBack = true;
    dialogRef.componentInstance.showClose = true;
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

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe(res => {
      if(res.data)  this.dataSource = new MatTableDataSource(res.data.colors);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });
  }

  deleteColor(id, index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado', {
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
      .subscribe(res => {
        if (res) {
          this.colorService.deleteColor(id).subscribe(res => {
            this.toastr.success("Operación realizada satisfactoriamente");
            this.dataSource.data.splice(index, 1);
            this.dataSource.data = [].concat(this.dataSource.data);
          }, err => {
            console.log(err);
          });
        }
      });
  }

}
