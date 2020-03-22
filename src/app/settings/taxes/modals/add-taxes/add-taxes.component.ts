import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaxService } from 'src/app/services/tax.service';
import { ToastrService } from 'ngx-toastr';
import { HeadquarterService } from 'src/app/services/headquarter.service';

@Component({
  selector: 'app-add-taxes',
  templateUrl: './add-taxes.component.html',
  styleUrls: ['./add-taxes.component.scss']
})
export class AddTaxesComponent implements OnInit {

  public form: FormGroup;
  public panelOpenState = false;
  public headquarters : any[] = [];
  checkedAll = false;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddTaxesComponent>,
    public taxService: TaxService,
    private toastr: ToastrService,
    public headquarterService: HeadquarterService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form = fb.group({
      description: [null, [ Validators.required]],
      amount: [null, [ Validators.required]],
      type: [null, [ Validators.required]],
      type_tax: [null, [ Validators.required]],
      type_application: [null, [ Validators.required]],
      state: [true, [ Validators.required]],
      option: [null, [ Validators.required]]
    });
   }

   ngOnInit() {
     if(this.data.id) this.getTax(this.data.id);
     this.getHeadquarters();
  }

  close(): void {
    this.dialogRef.close();
  }

  getHeadquarters() {
    this.headquarterService.getHeadquarters().subscribe(res => {
      if(res.data)  this.headquarters = [].concat(res.data.headquarters);
    }, err => {
      console.log(err);
    });
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if(this.data.id) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.taxService.createTax(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.createTax);
      }
    }, err => {
      console.log(err);
    });
  }

  compareObjects(o1: any, o2: any) {
    if(o1 === o2) return true;
    else return false
  }

  getTax(id){
    this.taxService.getTax(id).subscribe(res => {
      if(res.data){
      if(res.data.taxes.length ===  0){
        this.toastr.error("No se encuentra el registro indicado")
      }else{
        this.form.patchValue({
          description: res.data.taxes[0].description,
          state: res.data.taxes[0].state,
          amount: res.data.taxes[0].amount,
          option: res.data.taxes[0].option,
          type: res.data.taxes[0].type,
          type_tax: res.data.taxes[0].type_tax,
          type_application: res.data.taxes[0].type_application,
        });
      }}
    }, err => {
      console.log(err);
    });
  }

    edit(data: any) {
      this.taxService.updateTax(this.data.id,data).subscribe(res => {
        this.toastr.clear();
        this.toastr.success('Operación Exitosa');
        if(this.dialogRef){
          this.dialogRef.close(res.data.updateTax);
        }
      }, err => {
        console.log(err);
      });
  }


}
