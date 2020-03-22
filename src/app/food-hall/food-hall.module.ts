import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodHallListComponent, DialogFormFoodHall } from './food-hall-list/food-hall-list.component';
import { FoodHallFormComponent } from './food-hall-form/food-hall-form.component';
import { CommonMaterialModule } from '../common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FoodHallRoutingModule } from './food-hall.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [FoodHallListComponent, FoodHallFormComponent, DialogFormFoodHall, ],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FoodHallRoutingModule,
    FlexLayoutModule,
  ],
  entryComponents: [
    DialogFormFoodHall,
  ]
})
export class FoodHallModule { }
