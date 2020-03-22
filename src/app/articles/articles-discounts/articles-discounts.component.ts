import { Component, OnInit, ViewChild, Inject, OnDestroy, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { HeadquarterService } from 'src/app/services/headquarter.service';
import { DiscountService } from 'src/app/services/discount.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';

export interface Discounts {
  name: string;
  value: number;
  secure: boolean;
}

export interface DiscountsShops {
  available: boolean;
  shop: string;
}

const ELEMENT_DATA2: DiscountsShops[] = [
  { available: true, shop: 'Local 1' }
];

const ELEMENT_DATA: Discounts[] = [
  { name: 'Local 1', value: 12, secure: true }
];

@Component({
  selector: 'app-articles-discounts',
  templateUrl: './articles-discounts.component.html',
  styleUrls: ['./articles-discounts.component.scss']
})
export class ArticlesDiscountsComponent implements OnInit,OnDestroy {

  shop1Select: any;
  displayedColumns: string[] = ['name', 'value', 'secure', 'options'];
  shops = ['Local 1', 'Local 2', 'Local 3'];
  dataSource = new MatTableDataSource<any>([]);
  public isMobile : boolean ;
  subscription: Subscription;
  headquarters: any;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private headquarterService: HeadquarterService,
    private screenMobileChangeService: ScreenMobileChangeService,
    private toastr: ToastrService,
    private discountService: DiscountService,
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

    getHeadquarters() {
      this.headquarterService.getHeadquarters().subscribe(res => {
        if(res.data) {
          this.headquarters = [].concat(res.data.headquarters);
        }
      }, err => {
        console.log(err);
      });
    }

  openDialog(id, index): void {
    const dialogRef = this.dialog.open(NewDiscountDialog, {
      maxWidth : '100vw',
      minWidth: '60vw',
      data: {}
    });
    if(id) dialogRef.componentInstance.discountID = id;
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(id){
          this.dataSource.data[index] = result;
        }else{
          this.dataSource.data.push(result);
        }
        this.dataSource.data = [].concat(this.dataSource.data);
      }
    });
  }

  ngOnInit() {
    this.getHeadquarters();
    this.dataSource.paginator = this.paginator;
    this.getDiscounts();
  }

  getDiscounts() {
    this.discountService.getDiscounts().subscribe(res => {
      if(res.data) this.dataSource = new MatTableDataSource(res.data.discount);
      this.dataSource.paginator = this.paginator;
    }, err => {
      console.log(err);
    });
  }

  deleteDiscount(id,index) {
    this.coolDialogs.confirm('Se eliminará el registro indicado',{
      theme: 'default',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: 'darkblue',
      title: '¿Desea realizar esta acción?'
    })
    .subscribe(res => {
      if (res) {
        this.discountService.deleteDiscount(id).subscribe(res => {
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
  selector: 'app-new-discount-dialog',
  templateUrl: 'new-discount.html',
})
export class NewDiscountDialog implements OnInit {
  @Input() discountID: any;
  form: FormGroup;
  isSaved = false;
  headquarters: any;
  checkedAll = false;
  displayedColumnsShops: string[] = ['available', 'shop'];
  modaldataSourceShops = new MatTableDataSource<any>([]);
  headquartersSelected : any[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _formBuilder: FormBuilder,
    private headquarterService: HeadquarterService,
    private discountService: DiscountService,
    private toastr : ToastrService,
    public dialogRef: MatDialogRef<NewDiscountDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.form = this._formBuilder.group({
        description: [null, Validators.required],
        discount_mode: [null, Validators.required],
        amount: [ null],
        maximum_amount: [ null],
        access: [null, Validators.required],
        secure: [''],
        shops: ['']
      });
    }

    ngOnInit() {
      this.getHeadquarters();
      if(this.discountID){
        this.getDiscount(this.discountID); 
      }
    }

    getHeadquarters() {
      this.headquarterService.getHeadquarters().subscribe(res => {
        if(res.data) {
          this.headquarters = [].concat(res.data.headquarters);
          this.setHeadquartersState();
        }
      }, err => {
        console.log(err);
      });
    }

  /*addStockRecount() {
    this.isSaved = true;
  } */
  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if(this.headquarters.filter(x =>x.checked).length===0) return this.toastr.warning("Debe asignar al menos una sucursal");
    data.headquarter = this.headquarters.filter(x =>x.checked).map(x => x.id);
    if(this.discountID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.discountService.createDiscount(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.createDiscount);
      }
    }, err => {
      console.log(err);
    });
  }

  changeCheckedAll(checked){
    this.headquarters = this.headquarters.map((x =>{
      x.checked = checked;
      return x
    }))
  }
  
  verifyAll(checked,index){
    this.headquarters[index]["checked"] = checked;
    this.disableHeadquarter(checked,index);
    if(this.headquarters.filter(x => x.checked).length === this.headquarters.length) this.checkedAll = true;
  }

  getDiscount(id){
    this.discountService.getDiscount(id).subscribe(res => {
      if(res.data){
        if(res.data.discount.length ===  0){
          this.toastr.error("No se encuentra el registro indicado")
        }else{
          this.form.patchValue({
            description : res.data.discount[0].description,
            discount_mode : res.data.discount[0].discount_mode,
            amount : res.data.discount[0].amount,
            maximum_amount : res.data.discount[0].maximum_amount,
            access : res.data.discount[0].access,
          });
          this.headquartersSelected = res.data.discount[0].discount_headquarter;
          this.setHeadquartersState();
        }
      }
    }, err => {
      console.log(err);
    });
  }
  
    edit(data: any) {
      console.log(data);
      this.discountService.updateDiscount(this.discountID,data).subscribe(res => {
        this.toastr.clear();
        this.toastr.success('Operación Exitosa');
        if(this.dialogRef){
          this.dialogRef.close(res.data.updateDiscount);
        }
      }, err => {
        console.log(err);
      });
  }

  setHeadquartersState(){
    if(this.headquarters.length>0 && this.headquartersSelected.length>0){
     this.headquartersSelected.forEach((x,index:number) => {
       let pos = this.headquarters.findIndex(m => m.id === x.headquarter.id);
       if(pos!==-1){
         this.headquarters[pos]["checked"] = true;
         this.headquarters[pos]["db_id"] = x.id;
       }
     })
     if(this.headquarters.filter(x => x.checked).length === this.headquarters.length) this.checkedAll = true;
    }
  }

  disableHeadquarter(checked,index){
    if(!checked){
      if(this.headquarters[index]["db_id"]>0){
        this.discountService.deleteDiscountHeadquarter(this.headquarters[index]["db_id"]).subscribe((res)=>{
          this.headquarters[index]["db_id"] = 0;
        },
        err=>{
          console.log(err);
        });
      }  
    }
  }

}
