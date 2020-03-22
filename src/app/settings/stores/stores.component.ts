import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppStoreComponent } from './modals/app-store/app-store.component';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {

  displayedColumns: string[] = ['name', 'addres','tpv'];
  public ELEMENT_DATA: any = [
    {name:'Local 1', addres:'Av principal', tpv: 1},
    {name:'Local 2', addres:'Calle las mercedes', tpv: 1},
    {name:'Local 3', addres:'Plaza Panteon', tpv: 1},
  ];

  dataSource = this.ELEMENT_DATA;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }


  add(): void {
    const dialogRef = this.dialog.open(AppStoreComponent, {
      width: '400px',
      panelClass: 'config-modal',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
  
      
    });
  }


}
