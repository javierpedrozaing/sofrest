import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerModule } from 'ngx-color-picker';
import { S3UploaderModule } from 'ngx-s3-uploader';
import { ImageUploaderModule } from 'ngx-image-uploader';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent, NewArticleDialog } from './articles.component';
import { CommonMaterialModule } from '../common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ArticlesCategoriesComponent } from './articles-categories/articles-categories.component';
import { ArticlesDiscountsComponent, NewDiscountDialog } from './articles-discounts/articles-discounts.component';
import { ModifierComponent, DialogModifierForm } from './modifier/modifier.component';
import { AvatarModule } from 'ngx-avatar';
import { ModifierFormComponent } from './modifier-form/modifier-form.component';
import { ArticlesCategoriesFormComponent } from './articles-categories-form/articles-categories-form.component';
import { ArticlesDiscountsFormComponent } from './articles-discounts-form/articles-discounts-form.component';
import { ArticlesFormComponent } from './articles-form/articles-form.component';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { SubCategoryFormComponent } from './sub-category-form/sub-category-form.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { DisabledItemsComponent } from './disabled-items/disabled-items.component';
import { ProductionAreasComponent, NewProductionAreaDialog } from './production-areas/production-areas.component';


@NgModule({
  declarations: [
    ArticlesComponent,
    NewArticleDialog,
    ArticlesCategoriesComponent,
    ArticlesDiscountsComponent,
    NewDiscountDialog,
    ModifierComponent,
    ModifierFormComponent,
    DialogModifierForm,
    ArticlesCategoriesFormComponent,
    ArticlesDiscountsFormComponent,
    ArticlesFormComponent, SubCategoryFormComponent, SubCategoryComponent,
    DisabledItemsComponent,
    ProductionAreasComponent,
    NewProductionAreaDialog
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    CommonMaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,
    NgxMatSelectSearchModule,
    AvatarModule,
    FileUploadModule,
    ColorPickerModule,
    ImageUploaderModule,
    S3UploaderModule.forRoot({
      region: 'REGION',
      bucket: 'BUCKET_NAME',
      credentials: { accessKeyId: 'ACCESS_KEY_ID', secretAccessKey: 'SECRET_ACCESS_KEY' },
    })
  ],
  entryComponents: [
    NewArticleDialog,
    NewDiscountDialog,
    DialogModifierForm,
    NewProductionAreaDialog
  ]
})
export class ArticlesModule { }
