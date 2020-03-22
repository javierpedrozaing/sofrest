import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { HallTypeService } from 'src/app/services/hall-type.service';
import { DishCategoryService } from 'src/app/services/dish-category.service';

@Component({
  selector: 'app-dish-category-form',
  templateUrl: './dish-category-form.component.html',
  styleUrls: ['./dish-category-form.component.scss']
})
export class DishCategoryFormComponent implements OnInit {

  @Input() dishCategoryID: any;
  @Input() hideBack: boolean;
  @Input() showClose: boolean;
  public form: FormGroup;
  public headquarterTypes : any[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public hallTypeService: HallTypeService,
    public dishCategory : DishCategoryService,
    private coolDialogs: NgxCoolDialogsService,
    private router: Router,
    public route: ActivatedRoute,
    public dialogRef: MatDialogRef<DishCategoryFormComponent>,
  ) {
    this.form = fb.group({
      description: [null, [ Validators.required]],
      code: [null, [ Validators.required]],
      state: [true, [ Validators.required]],
    });
  }

  ngOnInit() {
    if (this.dishCategoryID) {
      this.getDishCategory(this.dishCategoryID);
    }else if(this.route.snapshot.params.id){
      this.getDishCategory(this.route.snapshot.params.id);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  getDishCategory(id) {
    this.dishCategoryID = id;
    this.dishCategory.getDishCategory(id).subscribe(res => {
      if(res.data){
        if (res.data.dish_categories.length === 0) {
          this.toastr.error("No se encuentra el registro indicado")
        } else {
          this.form.patchValue({
            state: res.data.dish_categories[0].state,
            description: res.data.dish_categories[0].description,
            code : res.data.dish_categories[0].code,
          });
        }
      }
    }, err => {
      console.log(err);
    });
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if (this.dishCategoryID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.dishCategory.createDishCategory(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.createDishCategory);
      }
    }, err => {
      console.log(err);
    });
  }

  edit(data: any) {
    this.dishCategory.updateDishCategory(this.dishCategoryID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.updateDishCategory);
      }
    }, err => {
      console.log(err);
    });
  }

}
