import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { TrademarkService } from 'src/app/services/trademark/trademark.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-trademark-form',
  templateUrl: './trademark-form.component.html',
  styleUrls: ['./trademark-form.component.scss']
})
export class TrademarkFORMComponent implements OnInit {

  @Input() trademarkID: any;
  @Input() hideBack: boolean;
  @Input() showClose: boolean;

  public form: FormGroup;
  public type : any;

  constructor(
    private fb: FormBuilder,
    private trademark : TrademarkService,
    private toastr: ToastrService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<TrademarkFORMComponent>,
  ) {
    this.form = fb.group({
      description: [null, [ Validators.required]],
      state: [true, [ Validators.required]],
    });
  }

  ngOnInit() {
    if(this.trademarkID){
      this.getTrademark(this.trademarkID); 
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if(this.trademarkID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.trademark.createBrand(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.createBrand);
      }
    }, err => {
      console.log(err);
    });
  }

  getTrademark(id){
    this.trademarkID = id;
    this.trademark.getTrademark(id).subscribe(res => {
      if(res.data){
      if(res.data.brand.length ===  0){
        this.toastr.error("No se encuentra el registro indicado")
      }else{
        this.form.patchValue({
          description: res.data.brand[0].description,
          state: res.data.brand[0].state
        });
      }
    }
    }, err => {
      console.log(err);
    });
  }
  
    edit(data: any) {
      this.trademark.updateBrand(this.trademarkID,data).subscribe(res => {
        this.toastr.clear();
        this.toastr.success('Operación Exitosa');
        if(this.dialogRef){
          this.dialogRef.close(res.data.updateBrand);
        }
      }, err => {
        console.log(err);
      });
  }


}
