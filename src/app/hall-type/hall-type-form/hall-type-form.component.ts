import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { HallTypeService } from 'src/app/services/hall-type.service';

@Component({
  selector: 'app-hall-type-form',
  templateUrl: './hall-type-form.component.html',
  styleUrls: ['./hall-type-form.component.scss']
})
export class HallTypeFormComponent implements OnInit {

  @Input() hallTypeID: any;
  @Input() hideBack: boolean;
  @Input() showClose: boolean;
  public form: FormGroup;
  public headquarterTypes : any[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public hallTypeService: HallTypeService,
    private coolDialogs: NgxCoolDialogsService,
    private router: Router,
    public route: ActivatedRoute,
    public dialogRef: MatDialogRef<HallTypeFormComponent>,
  ) {
    this.form = fb.group({
      description: [null, [ Validators.required]],
      state: [true, [ Validators.required]],
    });
  }

  ngOnInit() {
    if (this.hallTypeID) {
      this.getHallType(this.hallTypeID);
    }else if(this.route.snapshot.params.id){
      this.getHallType(this.route.snapshot.params.id);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  getHallType(id) {
    this.hallTypeID = id;
    this.hallTypeService.getHallType(id).subscribe(res => {
      if(res.data){
        if (res.data.hall_types.length === 0) {
          this.toastr.error("No se encuentra el registro indicado")
        } else {
          this.form.patchValue({
            state: res.data.hall_types[0].state,
            description: res.data.hall_types[0].description,
          });
        }
      }
    }, err => {
      console.log(err);
    });
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if (this.hallTypeID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.hallTypeService.createHallType(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.createHeadquarterType);
      }
    }, err => {
      console.log(err);
    });
  }

  edit(data: any) {
    this.hallTypeService.updateHallType(this.hallTypeID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.updateHeadquarterType);
      }
    }, err => {
      console.log(err);
    });
  }
}
