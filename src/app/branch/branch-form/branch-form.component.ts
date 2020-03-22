import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogFormBranchType } from '../branch-type-list/branch-type-list.component';
import { ToastrService } from 'ngx-toastr';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { HeadquarterService } from 'src/app/services/headquarter.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-branch-form',
  templateUrl: './branch-form.component.html',
  styleUrls: ['./branch-form.component.scss']
})
export class BranchFormComponent implements OnInit {

  @Input() branchID: any;
  public form: FormGroup;
  public ubigeos : any[] = [];
  public headquarterTypes : any[] =[];


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
    public dialog: MatDialog,
    private toastr: ToastrService,
    private ubigeoService: UbigeoService,
    private headquarterService: HeadquarterService,
    private coolDialogs: NgxCoolDialogsService,
    private router: Router,
    public route: ActivatedRoute,
  ) {
    this.form = fb.group({
      description: [null, [ Validators.required]],
      address: [null, [ Validators.required]],
      ubigeo_id: [null, [ Validators.required]],
      reference: [null, []],
      code: [null, [Validators.minLength(2),Validators.maxLength(2)]],
      principal: [false, [ Validators.required]],
      state : [true, [ Validators.required]],
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
    if (this.branchID) {
      this.getHeadquarter(this.branchID);
    }else if(this.route.snapshot.params.id){
      this.getHeadquarter(this.route.snapshot.params.id);
    }
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if (this.branchID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.headquarterService.saveHeadquarter(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.router.navigateByUrl("/branches/list");
    }, err => {
      console.log(err);
    });
  }

  edit(data: any) {
    this.headquarterService.updateHeadquarter(this.branchID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.router.navigateByUrl("/branches/list");
    }, err => {
      console.log(err);
    });
  }

  compareObjects(o1: any, o2: any) {
    if(o1 === o2) return true;
    else return false
  }

  getHeadquarter(id) {
    this.branchID = id;
    this.headquarterService.getHeadquarter(id).subscribe(res => {
      if(res.data){
        if (res.data.headquarters.length === 0) {
          this.toastr.error("No se encuentra el registro indicado")
        } else {
          this.form.patchValue({
            description: res.data.headquarters[0].description,
            address: res.data.headquarters[0].address,
            ubigeo_id:  (res.data.headquarters[0].ubigeo) ? res.data.headquarters[0].ubigeo.id : null,
            reference: res.data.headquarters[0].reference,
            code: res.data.headquarters[0].code,
            principal: res.data.headquarters[0].principal,
            state: res.data.headquarters[0].state
          });
        }
      }
    }, err => {
      console.log(err);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogFormBranchType, {
      width: '50vw'
    });
    dialogRef.componentInstance.hideBack = true;
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(result.id) this.form.patchValue({
          headquarter_type_id: result.id
        })
      }
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
