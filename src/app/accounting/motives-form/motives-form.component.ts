import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { ReasonSpendingService } from 'src/app/services/reason-spending.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-motives-form',
  templateUrl: './motives-form.component.html',
  styleUrls: ['./motives-form.component.scss']
})
export class MotivesFormComponent implements OnInit {

  @Input() motiveID: any;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private coolDialogs: NgxCoolDialogsService,
    private reasonSpendingService : ReasonSpendingService,
    private router: Router,
    public route: ActivatedRoute,
  ) {
    this.form = fb.group({
      description: [null, [ Validators.required]],
      name: [null, [ Validators.required]],
      amount: [null, [ Validators.required]],
    });
  }

  ngOnInit() {
    if (this.motiveID) {
      this.getReasonSpending(this.motiveID);
    }else if(this.route.snapshot.params.id){
      this.getReasonSpending(this.route.snapshot.params.id);
    }
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if (this.motiveID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.reasonSpendingService.createReasonSpending(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.router.navigateByUrl('/accounting/motives');
    }, err => {
      console.log(err);
    });
  }

  edit(data: any) {
    this.reasonSpendingService.updateReasonSpending(this.motiveID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.router.navigateByUrl('/accounting/motives');
    }, err => {
      console.log(err);
    });
  }

  getReasonSpending(id){
    this.motiveID = id;
    this.reasonSpendingService.getReasonSpending(id).subscribe(res => {
      if(res.data){
        if(res.data.reason_spending.length ===  0){
          this.toastr.error("No se encuentra el registro indicado")
        }else{
          this.form.patchValue({
            description: res.data.reason_spending[0].description,
            name: res.data.reason_spending[0].name,
            amount: res.data.reason_spending[0].amount,
          });
        }
      }
    }, err => {
      console.log(err);
    });
  }
}
