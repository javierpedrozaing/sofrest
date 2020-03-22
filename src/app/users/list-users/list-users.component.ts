import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogFormRole } from 'src/app/role/role-list/role-list.component';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  email: string;
  status: boolean;
  init_date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Pedro Perez', email: 'pedro@gmail.com', status: true, init_date: '15/05/2019'},
  {position: 1, name: 'Juana Diaz', email: 'juana@gmail.com', status: true, init_date: '15/05/2019'},
  {position: 1, name: 'Maria Lara', email: 'maria@gmail.com', status: true, init_date: '15/05/2019'},
];

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['position', 'name', 'email', 'init_date', 'status'];
  dataSource = ELEMENT_DATA;
  subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private screenMobileChangeService: ScreenMobileChangeService,
  ) {
    if(this.screenMobileChangeService.isMobile) this.router.navigate(['/users/list-mobile']);
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
      if(isMobile) this.router.navigate(['/users/list-mobile']);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogFormUser, {
      width: '50vw'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
@Component({
  selector: 'dialog-form-user',
  templateUrl: 'dialog-form-user.html',
})
export class DialogFormUser {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogFormUser>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
