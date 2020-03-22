import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-entry-type',
  templateUrl: './entry-type.component.html',
  styleUrls: ['./entry-type.component.scss']
})
export class EntryTypeComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['position', 'description', 'options',];
  public isMobile: boolean;
  subscription: Subscription;
  dataSource = new MatTableDataSource<any>(
    [
      { description: 'Tipo de Ingreso 1', status: true, },
      { description: 'Tipo de Ingreso 2', status: true, },
      { description: 'Tipo de Ingreso 3', status: true, },
    ]
  )
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogFormEntryType, {
      width: '50vw'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

@Component({
  selector: 'dialog-form-entry-type',
  templateUrl: 'dialog-form-entry-type.html',
  styles: [`
    .content-header-modal{
      padding : 10px;
    }
  `]
})
export class DialogFormEntryType {

  constructor(
    public dialogRef: MatDialogRef<DialogFormEntryType>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

