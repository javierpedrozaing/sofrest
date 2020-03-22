import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { CryptoService } from 'src/app/common/security-service';
import { ToastrService } from 'ngx-toastr';
import { RestService } from 'src/app/services/rest.service';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  time: any;
  date: any;
  day: any;
  code: any;
  user: any;
  public form: FormGroup;
  constructor(
    private router: Router,
    public cryptoService: CryptoService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public restService : RestService,
    public authenticateService : AuthenticateService,
  ) {
    setInterval(() => {
      this.time = new Date();
      this.date = moment().locale('es').format('DD-MMMM-YYYY');
      this.day = moment().locale('es').format('dddd');
   }, 1000);
    this.form = fb.group({
      email: ['devrodriguezheber@gmail.com', [ Validators.required]],
      password: ['Psalm23777', [ Validators.required]],
    });
  }

  init(data) {
    this.authenticateService.authenticate(data).subscribe((res)=>{
      localStorage.setItem('token-emma', res.data.authenticate.token);
     let code = "0000";
      const encrypt: string = this.cryptoService.encryptUsingAES256(code);
      let dataEncrypt : string = this.cryptoService.encryptUsingAES256(JSON.stringify(res.data.authenticate));
      localStorage.setItem('role', encrypt);
      localStorage.setItem('emmaData', dataEncrypt);
      if (code === '0000') {
        this.router.navigate(['/report/human-resources']);
      } else if (code === '0011') {
        this.router.navigate(['/']);
      } else if (code === '1111') {
        this.router.navigate(['/halls']);
      } else if (code === '2222') {
        this.router.navigate(['/halls/halls/1']);
      } else if (code === '3333') {
        this.router.navigate(['/kitchen']);
      } else {
        this.toastr.clear();
        this.toastr.error('Código inválido');
      }
    })
  }

  ngOnInit() {
  }

}
