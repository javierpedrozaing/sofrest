import { Component, OnInit, ViewChild, OnDestroy, Inject, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { AreaService } from 'src/app/services/area.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { ToastrService } from 'ngx-toastr';
import { AreasFormComponent } from '../areas-form/areas-form.component';

@Component({
  selector: 'app-list-areas',
  templateUrl: './list-areas.component.html',
  styleUrls: ['./list-areas.component.scss']
})
export class ListAreasComponent implements OnInit, OnDestroy {

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public isMobile: boolean;
  displayedColumns: string[] = ['description', 'headquarter', 'options'];
  dataSource = new MatTableDataSource<any>([]);
  subscription: Subscription;

  constructor(
    private screenMobileChangeService: ScreenMobileChangeService,
    private areaService: AreaService,
    public dialog: MatDialog,
    public coolDialogs: NgxCoolDialogsService,
    private toastr: ToastrService,
  ) {
    this.isMobile = this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changeVisibility(id,index) {
    this.areaService.updateStateArea({state: !this.dataSource.data[index]["state"]},id).subscribe(res => {
      this.toastr.success("Operación realizada satisfactoriamente");
       this.dataSource.data[index]["state"] =  !this.dataSource.data[index]["state"];
      this.dataSource.data = [].concat(this.dataSource.data);
    }, err => {
      console.log(err);
    });
  }

  getAreas() {
    this.areaService.getAreas().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.areas);
      this.dataSource.paginator = this.paginator;
    }, err => {
      console.log(err);
    });
  }

  deleteArea(id,index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado',{
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
        this.areaService.deleteArea(id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
          this.dataSource.data.splice(index,1);
          this.dataSource.data = [].concat(this.dataSource.data);
        }, err => {
          console.log(err);
        });
      }
    });
  }

  openDialog(id,index): void {
    const dialogRef = this.dialog.open(AreasFormComponent, {
      maxWidth: '100vw',
      minWidth: '60vw',
      panelClass: 'config-modal',
      data: {}
    });
    dialogRef.componentInstance.showClose = true;
    dialogRef.componentInstance.hideBack = true;
    if (id) { dialogRef.componentInstance.areasID = id };
    dialogRef.afterClosed().subscribe(result => {
      this.getAreas();
    });
  }

  ngOnInit() {
    this.getAreas();
  }

}

@Component({
  selector: 'app-areas-container-form-dialog',
  templateUrl: 'areas-form-dialog.html',
})
export class AreasContainerFormComponent {

  @Input() areaID: any;

  constructor(
    private areaService: AreaService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<AreasContainerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
