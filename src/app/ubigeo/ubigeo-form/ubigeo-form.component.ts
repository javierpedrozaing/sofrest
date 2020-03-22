import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-ubigeo-form',
  templateUrl: './ubigeo-form.component.html',
  styleUrls: ['./ubigeo-form.component.scss']
})
export class UbigeoFormComponent implements OnInit {

  @Input() ubigeoID: any;
  public form: FormGroup;
  categories : any[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UbigeoFormComponent>,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private ubigeoService: UbigeoService,
  ) {
    this.form = fb.group({
      department: [null, [ Validators.required]],
      province: [null, [ Validators.required]],
      district: [null, [ Validators.required,]],
      code: [null, [ Validators.required]],
    });
  }

  ngOnInit() {
    if(this.ubigeoID){
      this.getSubCategory(this.ubigeoID); 
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  ngOnChanges(changes: SimpleChanges) {
   if(changes['ubigeoID']){
     this.getSubCategory(this.ubigeoID);
   }
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if(this.ubigeoID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.ubigeoService.createUbigeo(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.createUbigeo);
      }
    }, err => {
      console.log(err);
    });
  }
  
  compareObjects(o1: any, o2: any) {
    if(o1 === o2) return true;
    else return false
  }

  getSubCategory(id){
    this.ubigeoService.getUbiGeo(id).subscribe(res => {
      if(res.data){
      if(res.data.ubigeos.length ===  0){
        this.toastr.error("No se encuentra el registro indicado")
      }else{
        this.form.patchValue({
          department: res.data.ubigeos[0].department,
          province: res.data.ubigeos[0].province,
          district: res.data.ubigeos[0].district,
          code: res.data.ubigeos[0].code,
        });
      }
    }
    }, err => {
      console.log(err);
    });
  }

    edit(data: any) {
      this.ubigeoService.updateUbigeo(this.ubigeoID,data).subscribe(res => {
        this.toastr.clear();
        this.toastr.success('Operación Exitosa');
        if(this.dialogRef){
          this.dialogRef.close(res.data.updateUbigeo);
        }
      }, err => {
        console.log(err);
      });
  }

}
