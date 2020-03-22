import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { ProvidersService } from 'src/app/services/providers.service';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { SalesForm } from 'src/app/sales/list-sales/list-sales.component';
import { SalesService } from 'src/app/services/Sales/sales.service';

@Component({
  selector: 'app-form-provider',
  templateUrl: './form-provider.component.html',
  styleUrls: ['./form-provider.component.scss']
})
export class FormProviderComponent implements OnInit {
  @Input() providerID: any;
  public form: FormGroup;
  weekDays = [
    {name: 'Lunes', value: 1, checked: false, db_id :0 },
    {name: 'Martes', value: 2, checked: false, db_id :0},
    {name: 'Miercoles', value: 3, checked: false, db_id :0},
    {name: 'Jueves', value: 4, checked: false, db_id :0},
    {name: 'Viernes', value: 5, checked: false, db_id :0},
    {name: 'Sabado', value: 6, checked: false, db_id :0},
    {name: 'Domingo', value: 7, checked: false, db_id :0},
  ]
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
    public providersService: ProvidersService,
    private coolDialogs: NgxCoolDialogsService,
    private router: Router,
    public route: ActivatedRoute,
    public salesService : SalesService
  ) {
    this.form = fb.group({
      business_name: [null, [ Validators.required]],
      tradename: [null, [ Validators.required]],
      address: [null],
      phone: [null, []],
      alternative_phone: [null, []],
      ruc: [null, [ Validators.required]],
      email: [null, []],
      web: [null, [ ]],
      observation: [null, []],
      state: [true, [ Validators.required]],
      ubigeo_id : [null, [Validators.required]],
      credit_day : [null, []],
    });
  }

  getClientByRUC(doc: any) {
    this.salesService.getClientByRUC(doc).subscribe(response => {
      if(typeof response === "string") return this.toastr.warning("No se ha encontrado información");
      this.form.patchValue({
        business_name: response.razonSocial,
        tradename: response.nombreComercial,
        address: response.direccion,
      })
      if(response.telefonos.length>0){
        this.form.patchValue({
          phone: response.telefonos[0],
        })
      }
    }, 
    err=>{
      this.toastr.error("Ocurrió un error al realizar la operación")
    });
  }

  ngOnInit() {
    this.getUbigeos();
    this.filteredUbigeos.next(this.ubigeos.slice());
    this.ubigeoFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterUbigeos();
    });
    if (this.providerID) {
      this.getProvider(this.providerID);
    }else if(this.route.snapshot.params.id){
      this.getProvider(this.route.snapshot.params.id);
    }
  }

  submit(data: any, formDirective: FormGroupDirective) {
    let days= this.weekDays.filter(x => x.checked === true);
    if(days.length===0) return this.toastr.warning("Debe seleccionar uno o más días de entrega");
    data.day = days.map(x => x.value);
    data.day_for_provider_id = days.map(x => x.db_id);
    if (this.providerID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    let daysResult = this.weekDays.filter(obj => {
      return obj.checked === true;
    }).map(function(obj) {
      return obj.value;
    });
    data['day'] = daysResult;
    this.providersService.createProvider(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.router.navigateByUrl('/providers/list');
    }, err => {
      console.log(err);
    });
  }

  edit(data: any) {
    this.providersService.updateProvider(this.providerID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.router.navigateByUrl('/providers/list');
    }, err => {
      console.log(err);
    });
  }

  compareObjects(o1: any, o2: any) {
    if(o1 === o2) return true;
    else return false
  }

  getProvider(id) {
    this.providerID = id;
    this.providersService.getProvider(id).subscribe(res => {
      if(res.data)
{      if (res.data.providers.length === 0) {
        this.toastr.error("No se encuentra el registro indicado")
      } else {
        this.form.patchValue({
          business_name: res.data.providers[0].business_name,
          tradename: res.data.providers[0].tradename,
          address: res.data.providers[0].address,
          phone: res.data.providers[0].phone,
          alternative_phone: res.data.providers[0].alternative_phone,
          ruc: res.data.providers[0].ruc,
          ubigeo_id: res.data.providers[0].ubigeo ? res.data.providers[0].ubigeo.id : null ,
          email: res.data.providers[0].email,
          web: res.data.providers[0].web,
          state: res.data.providers[0].state,
          observation: res.data.providers[0].observation,
          credit_day: res.data.providers[0].credit_day,
        });
        if(res.data.providers[0].days.length >0){
          res.data.providers[0].days.forEach(element => {
            if(element.day){
              element.day = (typeof element.day === "string") ? parseInt(element.day) : element.day;
              let pos = this.weekDays.findIndex(x => x.value === element.day);
              if(pos!==-1){
                this.weekDays[pos]["checked"] = true;
                this.weekDays[pos]["db_id"] = element.id;
              }
            }
          });
        }
      }}
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

  changeCheck(index,status){
    if(status) this.weekDays[index]['checked'] = status;
    else{
      this.coolDialogs.confirm('Se desactivará el día indicado',{
        theme: 'default',
        okButtonText: 'Ok',
        cancelButtonText: 'Cancelar',
        color: 'darkblue',
        title: '¿Desea realizar esta acción?'
      })
      .subscribe(res => {
        if (res) {
          if(!this.weekDays[index]["db_id"]){
            this.weekDays[index]['checked'] = status;
          }else{
            this.providersService.deleteDayForProvider(this.weekDays[index]["db_id"]).subscribe(res => {
              this.weekDays[index]['checked'] = status;
            }, err => {
              console.log(err);
            });
          }
        }
      });
    }
  }
}
