import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public authenticateService : AuthenticateService,
    public toastrService : ToastrService
  ) {
    this.form = fb.group({
      email: [null, [ Validators.required]],
      password: [null, [ Validators.required]],
    });
  }

  ngOnInit() {
  }


  save(data: any) {
    this.authenticateService.authenticate(data).subscribe((res)=>{
      
     },
     err=>{
      this.toastrService.error("ERROR");
     })
  }

  edit(data: any) {

  }
}
