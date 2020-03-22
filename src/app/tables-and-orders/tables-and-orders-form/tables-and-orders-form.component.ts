import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormFoodHall } from 'src/app/food-hall/food-hall-list/food-hall-list.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tables-and-orders-form',
  templateUrl: './tables-and-orders-form.component.html',
  styleUrls: ['./tables-and-orders-form.component.scss']
})
export class TablesAndOrdersFormComponent implements OnInit {

  @Input() tableAndOrderID: any;
  public form: FormGroup;
  subscription: Subscription;  
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.form = fb.group({
      number: [null, [ Validators.required]],
      code: [null, [ Validators.required]],
      shape: [null, [ Validators.required]],
      food_hall: [null, [ Validators.required]],
    });
    // this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => {
    //   if(isMobile) this.router.navigate(['/orders-mobile']);
    // });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    //this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

  save(data: any) {

  }

  edit(data: any) {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogFormFoodHall, {
      width: '50vw'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
