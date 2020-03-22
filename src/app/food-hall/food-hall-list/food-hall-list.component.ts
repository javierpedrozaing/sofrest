import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';

export interface FoodHall {
  description: string;
  status: boolean;
}

const ELEMENT_DATA: FoodHall[] = [
  { description: 'Salon 1', status : true, },
  { description: 'Salon 2', status : true, },
  { description: 'Salon 3', status : true, },
];


@Component({
  selector: 'app-food-hall-list',
  templateUrl: './food-hall-list.component.html',
  styleUrls: ['./food-hall-list.component.scss']
})
export class FoodHallListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['position', 'description', 'status', 'options', ];
  dataSource = ELEMENT_DATA;
public isMobile : boolean ;
  subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
  ) { 
        this.isMobile= this.screenMobileChangeService.isMobile;
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => { 
      this.isMobile = isMobile;
    });
  }

    ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogFormFoodHall, {
      width: '50vw'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'dialog-form-food-hall',
  templateUrl: 'dialog-form-food-hall.html',
})
export class DialogFormFoodHall {

  constructor(
    public dialogRef: MatDialogRef<DialogFormFoodHall>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

