import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RecipesRoutingModule } from './recipes-routing.module';
import { ListRecipesComponent, DialogNewRecipe, DialogViewRecipe } from './list-recipes/list-recipes.component';
import { CommonMaterialModule } from '../common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { ImageUploaderModule } from 'ngx-image-uploader';

@NgModule({
  declarations: [
    ListRecipesComponent,
    DialogNewRecipe,
    DialogViewRecipe,
  ],
  entryComponents: [
    DialogNewRecipe,
    DialogViewRecipe
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    CommonMaterialModule,
    SelectDropDownModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    FileUploadModule,
    ImageUploaderModule,
  ]
})
export class RecipesModule { }
