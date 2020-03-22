import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './articles.component';
import { ArticlesCategoriesComponent } from './articles-categories/articles-categories.component';
import { ArticlesDiscountsComponent } from './articles-discounts/articles-discounts.component';
import { ModifierComponent } from './modifier/modifier.component';
import { ModifierFormComponent } from './modifier-form/modifier-form.component';
import { ArticlesCategoriesFormComponent } from './articles-categories-form/articles-categories-form.component';
import { ArticlesDiscountsFormComponent } from './articles-discounts-form/articles-discounts-form.component';
import { ArticlesFormComponent } from './articles-form/articles-form.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { SubCategoryFormComponent } from './sub-category-form/sub-category-form.component';
import { DisabledItemsComponent } from './disabled-items/disabled-items.component';
import { ProductionAreasComponent } from './production-areas/production-areas.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ArticlesComponent,
      },
      {
        path: 'form',
        component: ArticlesComponent,
      },
      {
        path: 'categories',
        component: ArticlesCategoriesComponent,
      },
      {
        path: 'categories/form',
        component: ArticlesCategoriesFormComponent,
      },
      {
        path: 'sub-categories',
        component: SubCategoryComponent,
      },
      {
        path: 'sub-categories/form',
        component: SubCategoryFormComponent,
      },
      {
        path: 'discounts',
        component: ArticlesDiscountsComponent,
      },
      {
        path: 'production-areas',
        component: ProductionAreasComponent,
      },
      {
        path: 'discounts/form',
        component: ArticlesDiscountsFormComponent,
      },
      {
        path: 'modifiers',
        component: ModifierComponent,
      },
      {
        path: 'modifiers/form',
        component: ModifierFormComponent,
      },
      {
        path: 'modifiers/form/:id',
        component: ModifierFormComponent,
      },
      {
        path: 'disabled-items',
        component: DisabledItemsComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
