import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-articles-categories-form',
  templateUrl: './articles-categories-form.component.html',
  styleUrls: ['./articles-categories-form.component.scss']
})
export class ArticlesCategoriesFormComponent implements OnInit,OnChanges {

  @Input() articleID: any;
  public form: FormGroup;
  public checked : boolean = true;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ArticlesCategoriesFormComponent>,
    private toastr: ToastrService,
    public categoryService: CategoryService
  ) { 
    this.form = fb.group({
      description: [null, [ Validators.required]],
      colour: [null],
      state : [true, [ Validators.required]]
    });
  }

  ngOnInit() {
    if(this.articleID){
      this.getCategory(this.articleID); 
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  ngOnChanges(changes: SimpleChanges) {
   if(changes['articleID']){
     this.getCategory(this.articleID);
   }
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if(this.articleID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.categoryService.saveCategory(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.createCategory);
      }
    }, err => {
      console.log(err);
    });
  }

  getCategory(id){
    this.categoryService.getCategory(id).subscribe(res => {
      if(res.data){

        if(res.data.categories.length ===  0){
          this.toastr.error("No se encuentra el registro indicado")
        }else{
          this.form.patchValue({
            description: res.data.categories[0].description,
            state: res.data.categories[0].state,
            colour: res.data.categories[0].colour,
          });
        }
      }
    }, err => {
      console.log(err);
    });
  }
  
    edit(data: any) {
      this.categoryService.updateCategory(this.articleID,data).subscribe(res => {
        this.toastr.clear();
        this.toastr.success('Operación Exitosa');
        if(this.dialogRef){
          this.dialogRef.close(res.data.updateCategory);
        }
      }, err => {
        console.log(err);
      });
  }
}
