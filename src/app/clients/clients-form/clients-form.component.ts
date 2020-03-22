import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { MatDialogRef, MatSelect } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { CustomerService } from 'src/app/services/customer.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesService } from 'src/app/services/Sales/sales.service';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.scss']
})
export class ClientsFormComponent implements OnInit {

  @Input() customerID: any;
  @Input() dni: any;
  @Input() hideBack: boolean;
  @Input() showClose: boolean;
  public Client: FormGroup;
  ubigeos = [];
  documentstypes: any;
  document_type: any;
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
    public dialogRef: MatDialogRef<ClientsFormComponent>,
    private toastr: ToastrService,
    public ubigeoService: UbigeoService,
    public customerService: CustomerService,
    private coolDialogs: NgxCoolDialogsService,
    private router: Router,
    private salesService: SalesService,
    public route: ActivatedRoute,
    public documentsType: DocumentService
  ) {
    this.Client = fb.group({
      name: [null, [Validators.required]],
      address: [null],
      phone: [null, []],
      document: [null, [ Validators.required]],
      ubigeo_id: [null, [ Validators.required]],
      email: [null, []],
      web: [null, []],
      observation: [null],
      state: [true, [ Validators.required]],
      document_type_id: [null, [ Validators.required]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.getUbigeos();
    this.getDocumentTypes();
    this.filteredUbigeos.next(this.ubigeos.slice());
    this.ubigeoFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterUbigeos();
    });
    if (this.customerID) {
      this.getCustomer(this.customerID);
    }else if(this.route.snapshot.params.id){
      this.getCustomer(this.route.snapshot.params.id);
    }
  }

  getDocumentTypes() {
    this.documentsType.getDocumentTypes().subscribe(response => {
      if(response.data) this.documentstypes = response.data.document_types;
    });
  }

  setClientData() {
    if(this.Client.value.document.length === 8) {
      this.getClientByDNI(this.Client.value.document);
    } else {
      this.getClientByRUC(this.Client.value.document);
    }
  }

  getClientByDNI(doc: any) {
    this.salesService.getClientByDNI(doc).subscribe(response => {
      this.Client.patchValue({
        name: response.nombres + ' ' + response.apellidoPaterno + ' ' + response.apellidoMaterno
      })
    });
  }

  getClientByRUC(doc: any) {
    this.salesService.getClientByRUC(doc).subscribe(response => {
      const ubigeoId = this.ubigeos.find(obj => {
        return obj.department+'/'+obj.province+'/'+obj.district === response.departamento+'/'+response.provincia+'/'+response.distrito;
      }).id;
      const selectedUbigeo = ubigeoId !== undefined ? ubigeoId : null;
      this.Client.patchValue({
        name: response.razonSocial,
        address: response.direccion,
        ubigeo_id: selectedUbigeo
      })
    });
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if (this.customerID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.customerService.createCustomer(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.createCustomer);
      }
    }, err => {
      console.log(err);
    });
  }

  edit(data: any) {
    this.customerService.updateCustomer(this.customerID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      if(this.dialogRef){
        this.dialogRef.close(res.data.updateCustomer);
      }
    }, err => {
      console.log(err);
    });
  }

  compareObjects(o1: any, o2: any) {
    if(o1 === o2) return true;
    else return false
  }

  getCustomer(id) {
    this.customerID = id;
    this.customerService.getCustomer(id).subscribe(res => {
      if(res.data){
        if (res.data.customers.length === 0) {
          this.toastr.error("No se encuentra el registro indicado")
        } else {
          this.Client.patchValue({
            name: res.data.customers[0].name,
            address: res.data.customers[0].address,
            phone: res.data.customers[0].phone,
            document: res.data.customers[0].document,
            ubigeo_id: res.data.customers[0].ubigeo ? res.data.customers[0].ubigeo.id : null,
            email: res.data.customers[0].email,
            web: res.data.customers[0].web,
            state: res.data.customers[0].state,
            document_type_id: (res.data.customers[0].document_type) ? res.data.customers[0].document_type.id : null,
            observation: res.data.customers[0].observation,
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

}
