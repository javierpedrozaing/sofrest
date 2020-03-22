import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { HallTypeService } from 'src/app/services/hall-type.service';
import { DishCategoryService } from 'src/app/services/dish-category.service';
import { TasteService } from 'src/app/services/taste.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-form',
  templateUrl: './color-form.component.html',
  styleUrls: ['./color-form.component.scss']
})
export class ColorFormComponent implements OnInit {

  @Input() colorID: any;
  @Input() hideBack: boolean;
  @Input() showClose: boolean;
  public form: FormGroup;
  public headquarterTypes : any[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public hallTypeService: HallTypeService,
    public dishCategory : DishCategoryService,
    public ColorService : ColorService,
    private coolDialogs: NgxCoolDialogsService,
    private router: Router,
    public route: ActivatedRoute,
    public dialogRef: MatDialogRef<ColorFormComponent>,
  ) {
    this.form = fb.group({
      description: [null, [ Validators.required]],
    });
  }

  ngOnInit() {
    if (this.colorID) {
      this.getColor(this.colorID);
    }else if(this.route.snapshot.params.id){
      this.getColor(this.route.snapshot.params.id);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  getColor(id) {
    this.colorID = id;
    this.ColorService.getColor(id).subscribe(res => {
      if(res.data){
        if (res.data.colors.length === 0) {
          this.toastr.error("No se encuentra el registro indicado")
        } else {
          this.form.patchValue({
            description: res.data.colors[0].description,
          });
        }
      }
    }, err => {
      console.log(err);
    });
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if (this.colorID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.ColorService.createColor(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.createColor);
      }
    }, err => {
      console.log(err);
    });
  }

  edit(data: any) {
    this.ColorService.updateColor(this.colorID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.updateColor);
      }
    }, err => {
      console.log(err);
    });
  }

}
