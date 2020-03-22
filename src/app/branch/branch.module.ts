import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchTypeFormComponent } from './branch-type-form/branch-type-form.component';
import { BranchTypeListComponent, DialogFormBranchType } from './branch-type-list/branch-type-list.component';
import { CommonMaterialModule } from '../common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BranchRoutingModule } from './branch.routing.module';
import { BranchListComponent, DialogFormBranch } from './branch-list/branch-list.component';
import { BranchFormComponent } from './branch-form/branch-form.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [BranchTypeFormComponent, BranchTypeListComponent, DialogFormBranchType, BranchListComponent, BranchFormComponent, DialogFormBranch, ],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BranchRoutingModule,
    FlexLayoutModule,
    NgxMatSelectSearchModule,
  ],
  entryComponents: [
    DialogFormBranchType,
    DialogFormBranch,
  ],
})
export class BranchModule { }
