import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { AuthFormDialogComponent } from './auth-form-dialog/auth-form-dialog.component';
import { CommonMaterialModule } from '../common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [AuthFormComponent, AuthFormDialogComponent],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  entryComponents:[
    AuthFormDialogComponent,
  ],
  exports:[
    AuthFormComponent, 
    AuthFormDialogComponent,
  ]
})
export class AuthModule { }
