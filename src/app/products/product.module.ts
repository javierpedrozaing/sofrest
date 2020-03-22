import { FormBrandProductComponent } from './form-brand-product/form-brand-product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonMaterialModule } from '../common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductRoutingModule } from './product.routing.module';
import { FormProductComponent, DialogFormTypeProduct } from './form-product/form-product.component';
import { FormTypeProductComponent } from './form-type-product/form-type-product.component';
import { ListProductComponent, DialogFormProduct } from './list-product/list-product.component';

@NgModule({
  declarations: [ListProductComponent, FormProductComponent, FormTypeProductComponent, DialogFormTypeProduct, DialogFormProduct, FormBrandProductComponent],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    FlexLayoutModule,
  ],
  exports:[
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    FlexLayoutModule,
  ],
  entryComponents: [
    DialogFormTypeProduct,
    DialogFormProduct,
  ],
})
export class ProductModule { }
