import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormGroupDirective } from '@angular/forms';
import { ModelService } from 'src/app/services/model.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { TrademarkService } from 'src/app/services/trademark/trademark.service';

@Component({
  selector: 'app-model-form',
  templateUrl: './model-form.component.html',
  styleUrls: ['./model-form.component.scss']
})
export class ModelFormComponent implements OnInit {

  @Input() modelID: any;
  @Input() hideBack: boolean;
  @Input() showClose: boolean;

  public form: FormGroup;
  public brands = [];
  constructor(
    private fb: FormBuilder,
    private modelService: ModelService,
    private trademarkService: TrademarkService,
    private toastr: ToastrService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<ModelFormComponent>,
  ) {
    this.form = fb.group({
      description: [null, [Validators.required]],
      brand_id: [null, [Validators.required]],
      state: [true, [Validators.required]],
    });
  }

  ngOnInit() {
    if (this.modelID) {
      this.getModel(this.modelID);
    }
    this.getTrademarks();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getModel(id) {
    this.modelID = id;
    this.modelService.getModel(id).subscribe(res => {
      if(res.data){
        if (res.data.model.length === 0) {
          this.toastr.error("No se encuentra el registro indicado")
        } else {
          this.form.patchValue({
            description: res.data.model[0].description,
            state: res.data.model[0].state,
            brand_id: (res.data.model[0].brand) ? res.data.model[0].brand.id : null,
          });
        }
      }
    }, err => {
      console.log(err);
    });
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if (this.modelID) this.edit(data);
    else this.save(data);
  }

  save(data: any) {
    this.modelService.createModel(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if (this.dialogRef) {
        this.dialogRef.close(res.data.createModel);
      }
    }, err => {
      console.log(err);
    });
  }

  getTrademarks() {
    this.trademarkService.getAllTrademark().subscribe(res => {
      if(res.data) this.brands = [].concat(res.data.brand);
    }, err => {
      console.log(err);
    });
  }

  edit(data: any) {
    this.modelService.updateModel(this.modelID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if (this.dialogRef) {
        this.dialogRef.close(res.data.updateModel);
      }
    }, err => {
      console.log(err);
    });
  }

  compareObjects(o1: any, o2: any) {
    if (o1 === o2) return true;
    else return false
  }

}
