import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SubCategoryService } from 'src/app/services/sub-category.service';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sub-category-form',
  templateUrl: './sub-category-form.component.html',
  styleUrls: ['./sub-category-form.component.scss']
})
export class SubCategoryFormComponent implements OnInit {

  @Input() subCategoryID: any;
  public form: FormGroup;
  categories : any[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SubCategoryFormComponent>,
    public dialog: MatDialog,
    private toastr: ToastrService,
    public categoryService: CategoryService,
    public subCategoryService: SubCategoryService,
  ) {
    this.form = fb.group({
      description: [null, [ Validators.required]],
      category: [null, [ Validators.required]],
      accounting_account: [null, []], //Validators.pattern(/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/g),
      state: [true, [ Validators.required]],
    });
  }

  ngOnInit() {
    if(this.subCategoryID){
      this.getSubCategory(this.subCategoryID);
    }
    this.getCategories();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnChanges(changes: SimpleChanges) {
   if(changes['subCategoryID']){
     this.getSubCategory(this.subCategoryID);
   }
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if(this.subCategoryID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.subCategoryService.createSubCategory(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.createSubCategory);
      }
    }, err => {
      console.log(err);
    });
  }

  compareObjects(o1: any, o2: any) {
    if(o1 === o2) return true;
    else return false
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(res => {
      if(res.data) this.categories = [].concat(res.data.categories);
    }, err => {
      console.log(err);
    });
  }

  getSubCategory(id){
    this.subCategoryService.getSubCategory(id).subscribe(res => {
      if(res.data){
        if(res.data.sub_category.length ===  0){
          this.toastr.error("No se encuentra el registro indicado")
        }else{
          this.form.patchValue({
            description: res.data.sub_category[0].description,
            state: res.data.sub_category[0].state,
            category: (res.data.sub_category[0].category) ? res.data.sub_category[0].category.id : null,
            accounting_account: res.data.sub_category[0].accounting_account,
          });
        }
      }
    }, err => {
      console.log(err);
    });
  }

    edit(data: any) {
      this.subCategoryService.updateSubCategory(this.subCategoryID,data).subscribe(res => {
        this.toastr.clear();
        this.toastr.success('Operación Exitosa');
        if(this.dialogRef){
          this.dialogRef.close(res.data.updateSubCategory);
        }
      }, err => {
        console.log(err);
      });
  }

}
