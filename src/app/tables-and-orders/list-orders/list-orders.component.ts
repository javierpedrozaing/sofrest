import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {

  orders = [
    {
      table : 1,
      status: 1,
      date: "16:00",
      client :{
        name :  "Sarah Tane",
        email : "sarah@gmail.com",
        phone : "0000005698",
      },
    },
    {
      table : 2,
      status: 1,
      date: "16:00",
      client :{
        name :  "Sareh Tane",
        email : "sareh@gmail.com",
        phone : "0000005698",
      },
    },
    {
      table : 3,
      status: 1,
      date: "16:00",
      client :{
        name :  "Urgot Sivir",
        email : "sarah@gmail.com",
        phone : "0000005698",
      },
    },
    {
      table : 4,
      status: 2,
      date: "16:00",
      client :{
        name :  "jose Tane",
        email : "jose@gmail.com",
        phone : "0000005698",
      },
    },
    {
      table : 5,
      status: 2,
      date: "16:00",
      client :{
        name :  "Hermes Perez",
        email : "jose@gmail.com",
        phone : "0000005698",
      },
    },
    {
      table : 6,
      status: 2,
      date: "16:00",
      client :{
        name :  "José Perez",
        email : "jose@gmail.com",
        phone : "0000005698",
      },
    },
    {
      table : 7,
      status: 3,
      date: "16:00",
      client :{
        name :  "Josefa Perez",
        email : "jose@gmail.com",
        phone : "0000005698",
      },
    },
  ]
  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogMoveOrder, {
      width: '50vw'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  cancelOrder(i){
    const dialogRef = this.dialog.open(DialogCancelOrder, {
      width: '50vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.orders.splice(i,1);
    });
  }

}

@Component({
  selector: 'dialog-move-order',
  templateUrl: 'dialog-move-order.html',
})
export class DialogMoveOrder {

  constructor(
    public dialogRef: MatDialogRef<DialogMoveOrder>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


@Component({
  selector: 'dialog-cancel-order',
  templateUrl: 'dialog-cancel-order.html',
})
export class DialogCancelOrder {

  constructor(
    public dialogRef: MatDialogRef<DialogCancelOrder>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
