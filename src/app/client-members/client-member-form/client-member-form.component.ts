import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { ProvidersService } from 'src/app/services/providers.service';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/services/client.service';
import { PlanService } from 'src/app/services/plan.service';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-client-member-form',
  templateUrl: './client-member-form.component.html',
  styleUrls: ['./client-member-form.component.scss']
})
export class ClientMemberFormComponent implements OnInit {

  @Input() clientID: any;
  public plans : any[] = [];
  public form: FormGroup;
  public ubigeos : any[] =[];
  public ubigeoFilterCtrl: FormControl = new FormControl();
  public filteredUbigeos: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelectUbigeo', { static: true }) singleSelectUbigeo: MatSelect;
  public _onDestroy = new Subject<void>();

  public filterUbigeos() {
    if (!this.ubigeos) {
      return;
    }
    let search = this.ubigeoFilterCtrl.value;
    if (!search) {
      this.filteredUbigeos.next(this.ubigeos.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    let filterElement = search.split("/");
    filterElement = filterElement.filter(x => x !=="");
    this.filteredUbigeos.next(
      this.ubigeos.filter(x => {
        switch(filterElement.length){
          case 0: 
            return;
          case 1:
            return x.department.toLowerCase().indexOf(filterElement[0]) > -1 || x.province.toLowerCase().indexOf(filterElement[0]) > -1 || x.district.toLowerCase().indexOf(filterElement[0]) > -1;
          case 2:
            return x.department.toLowerCase().indexOf(filterElement[0]) > -1 && x.province.toLowerCase().indexOf(filterElement[1]) > -1 ;
          case 3:
            return x.department.toLowerCase().indexOf(filterElement[0]) > -1 && x.province.toLowerCase().indexOf(filterElement[1]) > -1  && x.district.toLowerCase().indexOf(filterElement[2]) > -1 ;
        }        
      })
    );
  }
  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public ubigeoService: UbigeoService,
    public clientService: ClientService,
    public planService : PlanService,
    private coolDialogs: NgxCoolDialogsService,
    private router: Router,
    public route: ActivatedRoute,
  ) {
    this.form = fb.group({
      business_name: [null, [ Validators.required]],
      tradename: [null, [ Validators.required]],
      address: [null],
      phone: [null, [ Validators.required]],
      //alternative_phone: [null, [ Validators.required]],
      ruc: [null, [ Validators.required]],
      email: [null, [ Validators.required]],
      web: [null, [ Validators.required]],
      observation: [null, [ Validators.required]],
      state: [true, [ Validators.required]],
      plan_id : [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.getPlans();
    this.filteredUbigeos.next(this.ubigeos.slice());
    this.ubigeoFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterUbigeos();
    });
    if (this.clientID) {
      this.getClient(this.clientID);
    }else if(this.route.snapshot.params.id){
      this.getClient(this.route.snapshot.params.id);
    }
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if (this.clientID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.clientService.createClient(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.router.navigateByUrl('/client-members/list');
    }, err => {
      console.log(err);
    });
  }

  edit(data: any) {
    // this.clientService.updateClient(this.clientID, data).subscribe(res => {
    //   this.toastr.clear();
    //   this.toastr.success('Operación Exitosa');
    //   this.router.navigateByUrl('/client-members/list');
    // }, err => {
    //   console.log(err);
    // });
  }

  compareObjects(o1: any, o2: any) {
    if(o1 === o2) return true;
    else return false
  }

  getClient(id) {
    this.clientID = id;
    this.clientService.getClient(id).subscribe(res => {
      if(res.data){
        if (res.data.clients.length === 0) {
          this.toastr.error("No se encuentra el registro indicado")
        } else {
          this.form.patchValue({
            business_name: res.data.clients[0].business_name,
            tradename: res.data.clients[0].tradename,
            address: res.data.clients[0].address,
            phone: res.data.clients[0].phone,
            // alternative_phone: res.data.clients[0].alternative_phone,
            ruc: res.data.clients[0].ruc,
            //ubigeo_id: res.data.clients[0].ubigeo ? res.data.clients[0].ubigeo.id : null ,
            plan_id: res.data.clients[0].plan ? res.data.clients[0].plan.id : null ,
            email: res.data.clients[0].email,
            web: res.data.clients[0].web,
            state: res.data.clients[0].state,
            observation: res.data.clients[0].observation,
          });
        }
      }
    }, err => {
      console.log(err);
    });
  }

  getUbigeos() {
    this.ubigeoService.getUbiGeos().subscribe(res => {
      if(res.data) this.ubigeos = [].concat(res.data.ubigeos);
      this.filterUbigeos();
    }, err => {
      console.log(err);
    });
  }


  getPlans() {
    this.planService.getPlans().subscribe(res => {
      if(res.data) this.plans = [].concat(res.data.plans);
    }, err => {
      console.log(err);
    });
  }

}
