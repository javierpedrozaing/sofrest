import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogFormTypeProduct } from 'src/app/products/form-product/form-product.component';
import { TrademarkService } from 'src/app/services/trademark/trademark.service';
import { FixedAssetService } from 'src/app/services/fixed-asset.service';
import { TrademarkFORMComponent } from 'src/app/trademark/trademark-form/trademark-form.component';
import { ModelFormComponent } from 'src/app/model/model-form/model-form.component';
import { ProductTypesFormComponent } from '../product-types/product-types-form/product-types-form.component';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-fixed-assets-form',
  templateUrl: './fixed-assets-form.component.html',
  styleUrls: ['./fixed-assets-form.component.scss']
})
export class FixedAssetsFormComponent implements OnInit {
  @Input() fixedAssetID: any;
  minDate = new Date();
  public brands : any;
  public models : any[] = [];
  public products_type : any[] = [];
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private trademark : TrademarkService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FixedAssetsFormComponent>,
    public fixedAssetService: FixedAssetService,
    public modelService: ModelService,
    private productTypesService: ProductTypeService,
  ) {
    this.form = fb.group({
      detail: [null, [Validators.required]],
      amount: [null, []],
      observation: [null, []],
      type_product_id: [null,[Validators.required]],
      admission_date: [new Date(),[Validators.required]],
      state: [true,[Validators.required]],
      brand_id: [null,[Validators.required]],
      model: [null,[Validators.required]],
      serial: [null,[]],
    });
    this.brands = [];
  }

  ngOnInit() {
    this.getTrademark();
    this.getProductTypes();
    //this.getModels();
    if (this.fixedAssetID) {
      this.getFixedAsset(this.fixedAssetID);
    }
  }

  getProductTypes() {
    this.productTypesService.getProductTypes().subscribe(res => {
      if(res.data) this.products_type = [].concat(res.data.type_products);
    }, err => {
      console.log(err);
    });
  }

  getModels() {
    this.modelService.getModels().subscribe(res => {
      if(res.data) this.models = [].concat(res.data.model);
    }, err => {
      console.log(err);
    });
  }

  getModelsByBrand(id) {
    this.modelService.getModelsByBrand(id).subscribe(res => {
      if(res.data) this.models = [].concat(res.data.model_with_brand);
    }, err => {
      console.log(err);
    });
  }

  compareObjects(o1: any, o2: any) {
    if (o1 === o2) return true;
    else return false
  }

  getTrademark() {
    this.trademark.getAllTrademark().subscribe(res => {
      if(res.data) this.brands = [].concat(res.data.brand);
    }, err => {
      console.log(err);
    });
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(data: any, formDirective: FormGroupDirective) {
    data.admission_date = this.formatDate(data.admission_date)
    if (this.fixedAssetID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.fixedAssetService.createFixedAsset(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if (this.dialogRef) {
        this.dialogRef.close(res.data.createFixedAsset);
      }
    }, err => {
      console.log(err);
    });
  }

  edit(data: any) {
    this.fixedAssetService.updateFixedAsset(this.fixedAssetID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if (this.dialogRef) {
        this.dialogRef.close(res.data.updateFixedAsset);
      }
    }, err => {
      console.log(err);
    });
  }

  getFixedAsset(id) {
    this.fixedAssetService.getFixedAsset(id).subscribe(res => {
      if(res.data){
      if (res.data.fixed_asset.length === 0) {
        this.toastr.error("No se encuentra el registro indicado")
      } else {
        this.form.patchValue({
          observation: res.data.fixed_asset[0].observation,
          state: res.data.fixed_asset[0].state,
          amount: res.data.fixed_asset[0].amount,
          admission_date: res.data.fixed_asset[0].admission_date,
          type_product_id: (res.data.fixed_asset[0].type_product) ? res.data.fixed_asset[0].type_product.id : null,
          brand_id: (res.data.fixed_asset[0].brand) ? res.data.fixed_asset[0].brand.id : null,
          model: (res.data.fixed_asset[0].model) ? res.data.fixed_asset[0].model.id : null,
          detail: res.data.fixed_asset[0].detail,
          serial: res.data.fixed_asset[0].serial,
        });
        if(res.data.fixed_asset[0].brand){
          this.getModelsByBrand(res.data.fixed_asset[0].brand.id);
        }
      }
    }
    }, err => {
      console.log(err);
    });
  }

  openDialogTrademark(): void {
    const dialogRef = this.dialog.open(TrademarkFORMComponent, {
      maxWidth : '100vw',
      minWidth: '60vw',
      panelClass: 'config-modal',
      data: {}
    });

    dialogRef.componentInstance.showClose = true;
    dialogRef.componentInstance.hideBack = true;

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.brands.push(result);
      }
    });
  }

  openDialogSet(): void {
    const dialogRef = this.dialog.open(DialogSetForm, {
      maxWidth : '100vw',
      minWidth: '60vw',
      panelClass: 'config-modal',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogProductType(){
    const dialogRef = this.dialog.open(ProductTypesFormComponent, {
      maxWidth : '100vw',
      minWidth: '60vw',
      panelClass: 'config-modal',
      data: {}
    });

    dialogRef.componentInstance.hideBack = true;
    dialogRef.componentInstance.showClose = true;
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.products_type.push(result);
      }
    });
  }

  openDialogModel(): void {
    const dialogRef = this.dialog.open(ModelFormComponent, {
      maxWidth : '100vw',
      minWidth: '60vw',
      panelClass: 'config-modal',
      data: {}
    });
    dialogRef.componentInstance.showClose = true;
    dialogRef.componentInstance.hideBack = true;

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.models.push(result);
      }
    });
  }
}


@Component({
  selector: 'dialog-trademark-form',
  templateUrl: 'dialog-trademark-form.html',
})
export class DialogTrademarkForm {

  constructor(
    public dialogRef: MatDialogRef<DialogTrademarkForm>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-set-form',
  templateUrl: 'dialog-set-form.html',
})
export class DialogSetForm {

  constructor(
    public dialogRef: MatDialogRef<DialogSetForm>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-model-form',
  templateUrl: 'dialog-model-form.html',
})
export class DialogModelForm {

  constructor(
    public dialogRef: MatDialogRef<DialogModelForm>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}