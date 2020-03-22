import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HeadquarterService } from 'src/app/services/headquarter.service';
import { AreaService } from 'src/app/services/area.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-areas-form',
  templateUrl: './areas-form.component.html',
  styleUrls: ['./areas-form.component.scss']
})
export class AreasFormComponent implements OnInit {

  @Input() areasID: any;
  @Input() hideBack: boolean;
  @Input() showClose: boolean;

  public areaForm: FormGroup;
  headquarters: any;

  constructor(
    private fb: FormBuilder,
    private headquarterService: HeadquarterService,
    private areaService: AreaService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<AreasFormComponent>,
  ) {
    this.areaForm = fb.group({
      description: [null, [ Validators.required]],
      headquarter_id: [null, [Validators.required]],
      state : [true, [ Validators.required]]
    });
  }  
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  getHeadquarters() {
    this.headquarterService.getHeadquarters().subscribe(res => {
      if(res.data) this.headquarters = [].concat(res.data.headquarters);
    }, err => {
      console.log(err);
    });
  }

  compareObjects(o1: any, o2: any) {
    if (o1 === o2) return true;
    else return false
  }

  getArea(id){
    this.areaService.getArea(id).subscribe(res => {
      if(res.data){

        if(res.data.areas.length ===  0){
          this.toastr.error("No se encuentra el registro indicado")
        }else{
          this.areaForm.patchValue({
            description: res.data.areas[0].description,
            state: res.data.areas[0].state,
            headquarter_id : res.data.areas[0].headquarter ? res.data.areas[0].headquarter.id : null,
          });
        }
      }
    }, err => {
      console.log(err);
    });

  }

  save() {
    if (!this.areasID) {
      this.areaService.saveArea(this.areaForm.value).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.onNoClick();
    }, err => {
      console.log(err);
    });
    } else {
      this.areaService.updateArea(this.areasID, this.areaForm.value).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.onNoClick();
    }, err => {
      console.log(err);
    });
    }
  }

  ngOnInit() {
    this.getHeadquarters();
    if(this.areasID){
      this.getArea(this.areasID);
    }
  }

}
