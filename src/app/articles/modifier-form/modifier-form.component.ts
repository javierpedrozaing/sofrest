import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/services/products.service';
import { ModifierService } from 'src/app/services/modifier.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeadquarterService } from 'src/app/services/headquarter.service';

@Component({
  selector: 'app-modifier-form',
  templateUrl: './modifier-form.component.html',
  styleUrls: ['./modifier-form.component.scss']
})
export class ModifierFormComponent implements OnInit {

  @Input() modifierID: any;
  public form: FormGroup;
  public products: any[] = [];

  stores: any = [];
  showStore: boolean = false;
  public listOptions: any = [
    {
      "product": null,
      "quantity": null,
    }
  ]
  allSelected: boolean;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private productsService: ProductsService,
    public modifierService: ModifierService,
    public headquarterService : HeadquarterService,
    private router: Router,
    public route: ActivatedRoute,
  ) {
    this.form = fb.group({
      description: [null, [Validators.required]],
      state: [true, [ Validators.required]],
    });
  }


  ngOnInit() {
    this.getHeadquarters();
    this.getProducts();
    if (this.modifierID) {
      this.getModifier(this.modifierID);
    }else if(this.route.snapshot.params.id){
      this.getModifier(this.route.snapshot.params.id);
    }
  }

  addOption() {
    this.listOptions.push({
      "option": null,
      "cant": null,
    });
  }

  verifyEntryValue(evt, index) {
    if (isNaN(evt.data)) {
      //evt.target.value = evt.target.value.replace('',evt.data);
    }
  }

  checkStore(value: boolean, index: number) {
    this.stores[index]["checked"] = value;
    if (!value) this.allSelected = false;
    else {
      this.allSelected = this.stores.filter(data => data.checked).length === this.stores.length ? true : false;
    }
  }

  selectAll(value: boolean) {
    this.allSelected = value;
    this.stores.map(data => {
      data.checked = value;
      return data;
    });
  }

  submit(data: any, formDirective: FormGroupDirective) {
    data.stores = this.stores.filter(value => value.checked).map(value => value.id);
    if (data.stores.length === 0) {
      this.toastr.clear();
      this.toastr.warning('Debe asignar uno o más locales');
    }
    else if(this.listOptions.filter(x => x.product===null || x.quantity===null).length>0){
      this.toastr.clear();
      this.toastr.warning('Existen campos inválidos');
    }
    else {
      data.headquarter = this.stores.filter(x => x.checked === true).map(x => {
        return x.id;
      })
      data.product = this.listOptions.map(x => {
        return x.product;
      });
      data.quantity = this.listOptions.map(x => {
        return x.quantity;
      });
      if (this.modifierID) this.edit(data);
      else this.save(data, formDirective);
    }
  }

  deleteOption(index: number) {
    this.listOptions.splice(index, 1);
  }

  save(data: any, formDirective: FormGroupDirective) {
    this.modifierService.createModifier(data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.router.navigateByUrl("/articles/modifiers");
    }, err => {
      console.log(err);
    });
  }

  edit(data: any) {
    this.modifierService.updateModifier(this.modifierID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.router.navigateByUrl("/articles/modifiers");
    }, err => {
      console.log(err);
    });
  }

  getProducts() {
    this.productsService.getProducts().subscribe(res => {
      if(res.data) this.products = [].concat(res.data.products);
    }, err => {
      console.log(err);
    });
  }

  getModifier(id){
    this.modifierID = id;
    this.modifierService.getModifier(id).subscribe(res => {
      if(res.data){
        if(res.data.modifier.length ===  0){
          this.toastr.error("No se encuentra el registro indicado")
        }else{
          this.form.patchValue({
            description: res.data.modifier[0].description,
            state: res.data.modifier[0].state,
          });
          if(res.data.modifier[0].modifier_detail.length>0){
            this.listOptions = res.data.modifier[0].modifier_detail.map(x =>{
              return {
                "product": x.product ? x.product.id : null,
                "quantity": x.quantity ? (typeof x.quantity === 'string' ? parseInt(x.quantity) : x.quantity) : 0,
              }
            })
          }
        }
      }
    }, err => {
      console.log(err);
    });
  }

  getHeadquarters() {
    this.headquarterService.getHeadquarters().subscribe(res => {
      if(res.data) this.stores = [].concat(res.data.headquarters);
      this.selectAll(true);
    }, err => {
      console.log(err);
    });
  }

  compareObjects(o1: any, o2: any) {
    if (o1 === o2) return true;
    else return false
  }

}

