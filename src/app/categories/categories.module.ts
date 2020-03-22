import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCategoriesComponent, DialogFormCategory } from './list-categories/list-categories.component';
import {  FormCategoryComponent } from './form-category/form-category.component';
import { CategoriesRoutingModule } from './categories.routing.module';
import { CommonMaterialModule } from '../common/material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ListCategoriesComponent, FormCategoryComponent, DialogFormCategory, ],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CategoriesRoutingModule,
    FlexLayoutModule,
  ],
  entryComponents: [
    DialogFormCategory,
  ],
})
export class CategoriesModule { }
