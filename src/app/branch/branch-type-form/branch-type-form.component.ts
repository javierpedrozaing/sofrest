import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HeadquarterService } from 'src/app/services/headquarter.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-branch-type-form',
  templateUrl: './branch-type-form.component.html',
  styleUrls: ['./branch-type-form.component.scss']
})
export class BranchTypeFormComponent implements OnInit {

  @Input() branchTypeID: any;
  @Input() hideBack: boolean;
  @Input() showClose: boolean;
  public form: FormGroup;
  public headquarterTypes : any[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public headquarterService: HeadquarterService,
    private coolDialogs: NgxCoolDialogsService,
    private router: Router,
    public route: ActivatedRoute,
    public dialogRef: MatDialogRef<BranchTypeFormComponent>,
  ) {
    this.form = fb.group({
      description: [null, [ Validators.required]],
      state: [true, [ Validators.required]],
    });
  }

  ngOnInit() {
    if (this.branchTypeID) {
      this.getHeadquarterType(this.branchTypeID);
    }else if(this.route.snapshot.params.id){
      this.getHeadquarterType(this.route.snapshot.params.id);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  getHeadquarterType(id) {
    this.branchTypeID = id;
    // this.headquarterService.getHeadquarterType(id).subscribe(res => {
    //   if(res.data){
    //     if (res.data.headquarter_type.length === 0) {
    //       this.toastr.error("No se encuentra el registro indicado")
    //     } else {
    //       this.form.patchValue({
    //         state: res.data.headquarter_type[0].state,
    //         description: res.data.headquarter_type[0].description,
    //       });
    //     }
    //   }
    // }, err => {
    //   console.log(err);
    // });
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if (this.branchTypeID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    // this.headquarterService.createHeadquarterType(data).subscribe(res => {
    //   this.toastr.clear();
    //   this.toastr.success('Operación Exitosa');
    //   if(this.dialogRef){
    //     this.dialogRef.close(res.data.createHeadquarterType);
    //   }
    // }, err => {
    //   console.log(err);
    // });
  }

  edit(data: any) {
    // this.headquarterService.updateHeadquarterType(this.branchTypeID, data).subscribe(res => {
    //   this.toastr.clear();
    //   this.toastr.success('Operación Exitosa');
    //   if(this.dialogRef){
    //     this.dialogRef.close(res.data.updateHeadquarterType);
    //   }
    // }, err => {
    //   console.log(err);
    // });
  }

}
