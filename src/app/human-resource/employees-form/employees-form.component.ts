import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { DocumentService } from 'src/app/services/document.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { Router, ActivatedRoute } from '@angular/router';
import { HeadquarterService } from 'src/app/services/headquarter.service';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.scss']
})
export class EmployeesFormComponent implements OnInit {

  @Input() employeeID: any;
  @ViewChild("pin0", {static: true}) pin0: ElementRef;
  @ViewChild("pin1", {static: true}) pin1: ElementRef;
  @ViewChild("pin2", {static: true}) pin2: ElementRef;
  @ViewChild("pin3", {static: true}) pin3: ElementRef;
  @ViewChild("pinVerify0", {static: true}) pinVerify0: ElementRef;
  @ViewChild("pinVerify1", {static: true}) pinVerify1: ElementRef;
  @ViewChild("pinVerify2", {static: true}) pinVerify2: ElementRef;
  @ViewChild("pinVerify3", {static: true}) pinVerify3: ElementRef;
  public form: FormGroup;
  public documentTypes : any[] = [];
  public pinCode : any[] = [null,null,null,null];
  public pinCodeVerify : any[] = [null,null,null,null];
  public verifiedPassword: any = null;

  public roles : any = [
    {
      "id" : 1,
      "name" : "Gerente",
    },
    {
      "id" : 1,
      "name" : "Administrador",
    },
  ];

  stores : any = [
  ];
  showStore : boolean = false;

  allSelected : boolean;


  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public userService: UserService,
    public documentService: DocumentService,
    private coolDialogs: NgxCoolDialogsService,
    private router: Router,
    public route: ActivatedRoute,
    public headquarterService : HeadquarterService,
  ) {
    this.form = fb.group({
      name: [null, [ Validators.required]],
      document_type_id: [null, [ Validators.required]],
      document: [null, [ Validators.required]],
      address: [null, [ Validators.required]],
      email: [null, [ Validators.required]],
      image: ['test', []],
      phone: [null, [ Validators.required]],
      role: [null, [ Validators.required]],
      gross_salary: [null, [ Validators.required]],
      net_salary: [null, [ Validators.required]],
      state: [true, [ Validators.required]],
      stores: [true, []],
    });
  }

  ngOnInit() {
    this.selectAll(true);
    this.getDocumentTypes();
    this.getHeadquarters();
    if (this.employeeID) {
      this.getUser(this.employeeID);
    }else if(this.route.snapshot.params.id){
      this.getUser(this.route.snapshot.params.id);
    }
    this.verifyPassword();
  }

  resetPassword(){
    this.pinCode = [null,null,null,null];
    this.pinCodeVerify = [null,null,null,null];
    this.verifyPassword();
  }

  verifyEntryValue(evt,index){
    if (isNaN(evt.data)){ 
      evt.target.value = null;
      this.pinCode[index] = null;
    }else{
      evt.target.value = evt.data;
      this.pinCode[index] = evt.data;
      if(index<3) this[`pin${index+1}`].nativeElement.focus();
    }
    this.verifyPassword();
  }

  verifyEntryValueVerify(evt,index){
    if (isNaN(evt.data)){ 
      evt.target.value = null;
      this.pinCodeVerify[index] = null;
    }else{
      evt.target.value = evt.data;
      this.pinCodeVerify[index] = evt.data;
      if(index<3) this[`pinVerify${index+1}`].nativeElement.focus();
    }
    this.verifyPassword();
  }

  getDocumentTypes() {
    this.documentService.getDocumentTypes().subscribe(res => {
      if(res.data) this.documentTypes = [].concat(res.data.document_types);
    }, err => {
      console.log(err);
    });
  }

  verifyPassword(){
    for (let index = 0; index < this.pinCode.length; index++) {
      if(this.pinCode[index]===null) {
        this.verifiedPassword = null;
        return null;}
    }
    let pinCodeString = this.pinCode.join("");
    let pinCodeVerifyString = this.pinCodeVerify.join("");
    if(pinCodeVerifyString!==pinCodeString) {
      this.verifiedPassword = false;
      return false
    }
    this.verifiedPassword = true;
    return true;
  }

  checkStore(value: boolean, index : number){
    this.stores[index]["checked"] = value;
    if(!value) this.allSelected = false;
    else{
      this.allSelected = this.stores.filter(data => data.checked).length === this.stores.length  ? true : false;
    }
  }

  selectAll(value: boolean){
    this.allSelected = value;
    this.stores.map(data => {
        data.checked = value;
        return data;
    });
  }

  submit(data: any, formDirective: FormGroupDirective) {
    data.stores = this.stores.filter(value => value.checked).map(value => value.id);
    if(data.stores.length===0) {
      this.toastr.clear();
      this.toastr.warning('Debe asignar uno o más locales');
    }
    else{
      if(this.pinCode.filter(x => x === null).length>0) return this.toastr.error("Debe especificar un pin válido");
      else{
        data.password = this.pinCode.join("");
        if(this.employeeID) this.edit(data);
        else this.save(data, formDirective);
      }
    }
  }

  compareObjects(o1: any, o2: any) {
    if (o1 === o2) return true;
    else return false
  }

  getHeadquarters() {
    this.headquarterService.getHeadquarters().subscribe(res => {
      if(res.data)  this.stores = [].concat(res.data.headquarters);
    }, err => {
      console.log(err);
    });
  }

  save(data: any, formDirective: FormGroupDirective) {
    if(this.pinCode.filter(x => x === null).length>0) return this.toastr.error("Debe especificar un pin válido");
    else{
      if(!this.verifiedPassword) return this.toastr.error("Los PIN deben coincidir");
      data.password = this.pinCode.join("");
      this.userService.createUser(data).subscribe(res => {
        this.toastr.clear();
        this.toastr.success('Operación Exitosa');
        this.router.navigateByUrl("/human-resource/list-employees");
      }, err => {
        console.log(err);
      });
    }

  }

  edit(data: any) {
    this.userService.updateUser(this.employeeID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.router.navigateByUrl("/human-resource/list-employees");
    }, err => {
      console.log(err);
    });
  }

  getUser(id) {
    this.employeeID = id;
    this.userService.getUser(id).subscribe(res => {
      if(res.data){
        if (res.data.users.length === 0) {
          this.toastr.error("No se encuentra el registro indicado")
        } else {
          this.form.patchValue({
            name: res.data.users[0].name,
            address: res.data.users[0].address,
            phone: res.data.users[0].phone,
            document: res.data.users[0].document,
            document_type_id: res.data.users[0].document_type ? res.data.users[0].document_type.id : null,
            email: res.data.users[0].email,
            state: res.data.users[0].state,
            gross_salary : res.data.users[0].gross_salary,
            net_salary : res.data.users[0].net_salary,
          });
          (res.data.users[0].password) ? res.data.users[0].password.splite("").forEach((element:any,index:number) => {
            this.pinCode[index] = element;
          }) : 0;
        }
      }
    }, err => {
      console.log(err);
    });
  }

}
