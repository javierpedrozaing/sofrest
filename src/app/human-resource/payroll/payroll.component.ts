import { Component, OnInit, ViewChild } from '@angular/core';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss']
})
export class PayrollComponent implements OnInit {


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public isMobile : boolean ;
  subscription: Subscription;

  displayedColumns: string[] = ['name', "email", "phone", "role", "netSalary", "grossSalary", 'status'];
  dataSource : MatTableDataSource<any>;
  allSelected : boolean;
  showRemove : boolean;
  shop : number | null | string = "all";
  netSalary : number = 0;
  grossSalary : number = 0;


  constructor(
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    private coolDialogs: NgxCoolDialogsService
  ) { 
      this.isMobile= this.screenMobileChangeService.isMobile;
      this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => { 
        this.isMobile = isMobile;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changeVisibility(idx,status) {
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
        this.dataSource.data[idx].status = !this.dataSource.data[idx].status;
        // this.categoryService.updateStateCategory({state: !this.dataSource.data[index]["state"]},id).subscribe(res => {
        //   this.toastr.success("Operación realizada satisfactoriamente");
        //    this.dataSource.data[index]["state"] =  !this.dataSource.data[index]["state"];
        //   this.dataSource.data = [].concat(this.dataSource.data);
        // }, err => {
        //   console.log(err);
        // });
      }
    });
  }
  
  ngOnInit() {
    this.dataSource = new MatTableDataSource([
      {role: "Propietario", name: 'Pedro Perez', email: 'pedro@gmail.com', netSalary:1650.634, grossSalary: 1850.4,  status: true, phone: "000 111 33 55"},
      {role: "Gerente", name: 'Juana Diaz', email: 'juana@gmail.com',  netSalary:950.634, grossSalary: 1100.5, status: true, phone: "000 111 33 55"},
      {role: "Cajero", name: 'Maria Lara', email: 'maria@gmail.com',  netSalary:850.634, grossSalary: 1050.445,status: true,  phone: "000 111 33 55"},
    ]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.calculateNetAndGrossTotal();
  }

  calculateNetAndGrossTotal(){
    this.dataSource.data.map((value)=>{
      if(value.netSalary) this.netSalary += value.netSalary;
      if(value.grossSalary) this.grossSalary += value.grossSalary;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
