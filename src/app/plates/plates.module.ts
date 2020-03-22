import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatesRoutingModule } from './plates-routing.module';
import { PlatesComponent, DialogNewPlate, DialogViewPlate } from './plates.component';
import { CommonMaterialModule } from '../common/material-module';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DishCategoryFormComponent } from './dish-category-form/dish-category-form.component';
import { DishCategoryListComponent } from './dish-category-list/dish-category-list.component';
import { TasteFormComponent } from './taste-form/taste-form.component';
import { TasteListComponent } from './taste-list/taste-list.component';
import { PlateFormComponent } from './plate-form/plate-form.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ApplicationPipesModuleModule } from '../common/application-pipes-module/application-pipes-module.module';
import { ImageUploaderModule } from 'ngx-image-uploader';

@NgModule({
  declarations: [
    PlatesComponent,
    DialogNewPlate,
    DishCategoryFormComponent,
    DishCategoryListComponent,
    TasteFormComponent,
    TasteListComponent,
    PlateFormComponent,
    DialogViewPlate
  ],
  entryComponents: [
    DialogNewPlate,
    DishCategoryFormComponent,
    TasteFormComponent,
    DialogViewPlate,
  ],
  imports: [
    CommonModule,
    PlatesRoutingModule,
    CommonMaterialModule,
    SelectDropDownModule,
    FlexLayoutModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    ApplicationPipesModuleModule,
    ImageUploaderModule,
  ]
})
export class PlatesModule { }
