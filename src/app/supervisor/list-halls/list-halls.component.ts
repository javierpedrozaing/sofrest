import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from "@angular/router";
import { HeadquarterService } from 'src/app/services/headquarter.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { HallService } from 'src/app/services/hall.service';
import { HallTypeService } from 'src/app/services/hall-type.service';

export interface Salon {
  img: any;
  name: string;
  id: number
  description: String;
}

const ELEMENT_DATA: Salon[] = [
  { img: 'solon.png', id:1, name : 'Salon 1' , description: 'Salon Prinipal' },
  { img: 'solon.png', id:2, name : 'Salon 2' , description: 'Salon de Fiestas' },
  { img: 'solon.png', id:3, name : 'Salon 3' , description: 'Bar' },
  { img: 'solon.png', id:4, name : 'Salon 4' , description: 'Salon restaurante' },

];


@Component({
  selector: 'app-list-halls',
  templateUrl: './list-halls.component.html',
  styleUrls: ['./list-halls.component.scss']
})
export class ListHallsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'description', 'type', 'options', ];
  dataSource : MatTableDataSource<Salon>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
public isMobile : boolean ;
  subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    public hallsService: HallService,
    private router: Router,
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

  openDialog(id,index): void {
    const dialogRef = this.dialog.open(SalonData, {
      maxWidth: '100vw',
      minWidth: '60vw',
      panelClass: 'config-modal',
      data: (id) ? { id } : {}
    });

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

  openSalon(id,idx){
    this.router.navigateByUrl('/halls/halls/0');
    console.log(id,idx);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getLounges();
  }


  getLounges() {
    this.hallsService.getHalls().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.halls);
    }, err => {
      console.log(err);
    });
  }

  changeVisibility(id,index) {
    this.hallsService.updateStateHall({state: !this.dataSource.data[index]["state"]},id).subscribe(res => {
      this.toastr.success("Operación realizada satisfactoriamente");
       this.dataSource.data[index]["state"] =  !this.dataSource.data[index]["state"];
      this.dataSource.data = [].concat(this.dataSource.data);
    }, err => {
      console.log(err);
    });
  }

  deleteLounge(id,index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado',{
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
        this.hallsService.deleteHall(id).subscribe(res => {
          this.toastr.success("Operación realizada satisfactoriamente");
          this.dataSource.data.splice(index,1);
          this.dataSource.data = [].concat(this.dataSource.data);
        }, err => {
          console.log(err);
        });
      }
    });
  }


}

@Component({
  selector: 'data-new-salon',
  templateUrl: 'new-salon.html',
  styles : [`
    .content-header-modal{
      padding : 10px;
    }
  `]
})
export class SalonData implements OnInit{

  dataSalon: FormGroup;
  public headquarters: any[] = [];
  hallTypes: any;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SalonData>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public headquarterService: HeadquarterService,
    private toastr: ToastrService,
    public hallsService: HallService,
    public hallTypeService: HallTypeService,
    private router: Router
  ) {
      this.dataSalon = this._formBuilder.group({
        description: [null, Validators.required],
        hall_type_id: [null, [Validators.required]],
        state: [true, Validators.required]
      });
    }

    ngOnInit(){
      this.getHallTypes();
      if(this.data.id) this.getHall(this.data.id);
    }

    getHallTypes() {
      this.hallTypeService.getHallTypes().subscribe(response => {
        if(response.data) this.hallTypes = response.data.hall_types;
      });
    }

    submit(data: any, formDirective: FormGroupDirective) {
      if (this.data.id) this.edit(data);
      else this.save(data, formDirective);
    }

    save(data: any, formDirective: FormGroupDirective) {
      this.hallsService.createHall(data).subscribe(res => {
        this.toastr.clear();
        this.toastr.success('Operación Exitosa');
        this.router.navigateByUrl('/halls/new/'+this.dataSalon.value['table']);
        this.close();
      }, err => {
        console.log(err);
      });
    }

    getHall(id) {
      this.hallsService.getHall(id).subscribe(res => {
        if(res.data){
        if (res.data.lounge.length === 0) {
          this.toastr.error("No se encuentra el registro indicado")
        } else {
          this.dataSalon.patchValue({
            description: res.data.hall[0].description,
            state: res.data.hall[0].state,
            hall_type_id: res.data.hall[0].hall_type
          });
        }
      }
      }, err => {
        console.log(err);
      });
    }

    compareObjects(o1: any, o2: any) {
      if (o1 === o2) return true;
      else return false
    }

    edit(data: any) {
      this.hallsService.updateHall(this.data.id, data).subscribe(res => {
        this.toastr.clear();
        this.toastr.success('Operación Exitosa');
        this.dialogRef.close(res.data.updateHall);
      }, err => {
        console.log(err);
      });
    }

  close(): void {
    this.dialogRef.close();
  }

}
