import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth-form-dialog',
  templateUrl: './auth-form-dialog.component.html',
  styleUrls: ['./auth-form-dialog.component.scss']
})
export class AuthFormDialogComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AuthFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public authenticateService : AuthenticateService,
    public toastrService : ToastrService
  ) {
    this.form = fb.group({
      email: ['devrodriguezheber@gmail.com', [ Validators.required]],
      password: ['Psalm23777', [ Validators.required]],
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  save(data: any) {
    console.log(data);
    this.authenticateService.authenticate(data).subscribe((res)=>{
      this.dialogRef.close(res.data.authenticate);
     },
     err=>{
      this.toastrService.error("ERROR");
     })
  }

  edit(data: any) {

  }

}
