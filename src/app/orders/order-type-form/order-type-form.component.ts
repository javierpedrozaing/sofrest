import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DocumentService } from 'src/app/services/document.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-type-form',
  templateUrl: './order-type-form.component.html',
  styleUrls: ['./order-type-form.component.scss']
})
export class OrderTypeFormComponent implements OnInit, OnChanges {

  @Input() orderTypeID: any;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public documentService: DocumentService,
    private toastr: ToastrService,
    private router: Router,
    public route: ActivatedRoute,
  ) {
    this.form = fb.group({
      description: [null, [Validators.required]],
      state: [true, [Validators.required]],
      code: [null, [Validators.required]],
      type: [null, [Validators.required]],
    });
  }
  ngOnInit() {
    if (this.orderTypeID) {
      this.getDocumentType(this.orderTypeID);
    }else if(this.route.snapshot.params.id){
      this.getDocumentType(this.route.snapshot.params.id);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['orderTypeID']) {
      this.getDocumentType(this.orderTypeID);
    }
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if (this.orderTypeID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.documentService.createDocumentType(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.router.navigateByUrl('/orders/orders-types/list');
    }, err => {
      console.log(err);
    });
  }

  getDocumentType(id) {
    this.orderTypeID = id;
    this.documentService.getDocumentType(id).subscribe(res => {
      if(res.data){
        if (res.data.document_types.length === 0) {
          this.toastr.error("No se encuentra el registro indicado")
        } else {
          this.form.patchValue({
            description: res.data.document_types[0].description,
            state: res.data.document_types[0].state,
            code: res.data.document_types[0].code,
          });
        }
      }
    }, err => {
      console.log(err);
    });
  }
  
  edit(data: any) {
    this.documentService.updateDocumentType(this.orderTypeID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.router.navigateByUrl('/orders/orders-types/list');
    }, err => {
      console.log(err);
    });
  }

}

