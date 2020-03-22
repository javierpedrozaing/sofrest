import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material';
import { DiscountsShops } from '../articles-discounts/articles-discounts.component';

const ELEMENT_DATA2: DiscountsShops[] = [
  { available: true, shop: 'Local 1' }
];
@Component({
  selector: 'app-articles-discounts-form',
  templateUrl: './articles-discounts-form.component.html',
  styleUrls: ['./articles-discounts-form.component.scss']
})
export class ArticlesDiscountsFormComponent implements OnInit {

  @Input() articleDiscountID: any;
  public form: FormGroup;
  addDiscountFormGroup: FormGroup;
  isSaved = false;
  displayedColumnsShops: string[] = ['available', 'shop'];
  modaldataSourceShops = new MatTableDataSource<DiscountsShops>(ELEMENT_DATA2);
  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.form = fb.group({
      name: [null, [ Validators.required]],
    });
   }

  ngOnInit() {
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if(this.articleDiscountID) this.edit(data);
    else this.save(data, formDirective);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.toastr.clear();
    this.toastr.success('Operación Exitosa');
  }

  edit(data: any) {
    this.toastr.clear();
    this.toastr.success('Operación Exitosa');
  }

}
