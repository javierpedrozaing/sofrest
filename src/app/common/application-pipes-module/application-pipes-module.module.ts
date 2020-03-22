import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrayObjectToStringPipe } from './array-object-to-string/array-object-to-string.pipe';
import { NumberVerifierPipe } from './number-verifier.pipe';



@NgModule({
  declarations: [
    ArrayObjectToStringPipe,
    NumberVerifierPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ArrayObjectToStringPipe,
    NumberVerifierPipe
  ]
})
export class ApplicationPipesModuleModule { }
