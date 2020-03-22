import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { HallTypeService } from 'src/app/services/hall-type.service';
import { DishCategoryService } from 'src/app/services/dish-category.service';
import { TasteService } from 'src/app/services/taste.service';

@Component({
  selector: 'app-taste-form',
  templateUrl: './taste-form.component.html',
  styleUrls: ['./taste-form.component.scss']
})
export class TasteFormComponent implements OnInit {

  @Input() tasteID: any;
  @Input() hideBack: boolean;
  @Input() showClose: boolean;
  public form: FormGroup;
  public headquarterTypes : any[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public hallTypeService: HallTypeService,
    public dishCategory : DishCategoryService,
    public tasteService : TasteService,
    private coolDialogs: NgxCoolDialogsService,
    private router: Router,
    public route: ActivatedRoute,
    public dialogRef: MatDialogRef<TasteFormComponent>,
  ) {
    this.form = fb.group({
      description: [null, [ Validators.required]],
    });
  }

  ngOnInit() {
    if (this.tasteID) {
      this.getTaste(this.tasteID);
    }else if(this.route.snapshot.params.id){
      this.getTaste(this.route.snapshot.params.id);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  getTaste(id) {
    this.tasteID = id;
    this.tasteService.getTaste(id).subscribe(res => {
      if(res.data){
        if (res.data.tastes.length === 0) {
          this.toastr.error("No se encuentra el registro indicado")
        } else {
          this.form.patchValue({
            description: res.data.tastes[0].description,
          });
        }
      }
    }, err => {
      console.log(err);
    });
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if (this.tasteID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.tasteService.createTaste(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.createTaste);
      }
    }, err => {
      console.log(err);
    });
  }

  edit(data: any) {
    this.tasteService.updateTaste(this.tasteID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.updateTaste);
      }
    }, err => {
      console.log(err);
    });
  }

}
