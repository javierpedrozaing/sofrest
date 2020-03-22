import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PrintersService } from 'src/app/services/printers.service';
import { HeadquarterService } from 'src/app/services/headquarter.service';
import { AreaService } from 'src/app/services/area.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-printers-form',
  templateUrl: './printers-form.component.html',
  styleUrls: ['./printers-form.component.scss']
})
export class PrintersFormComponent implements OnInit {
  @Input() printerID: any;
  public form: FormGroup;
  headquarters: any = [];
  areas: any = [];

  constructor(
    private fb: FormBuilder,
    public toastr: ToastrService,
    private printerService: PrintersService,
    private headquarterService: HeadquarterService,
    private areaService: AreaService,
    private router: Router,
    public route: ActivatedRoute,
  ) {
    this.form = fb.group({
      description: [null, [ Validators.required]],
      //equip: [null, [ Validators.required]],
      ip: [null],
      headquarter: [null, Validators.required],
      area: [null, Validators.required],
      state: [1],
      observation: [null]
    });
  }

  getHeadquarters() {
    this.headquarterService.getHeadquarters().subscribe(res => {
      if(res.data) this.headquarters = [].concat(res.data.headquarters);
    }, err => {
      console.log(err);
    });
  }

  getAreas() {
    this.areaService.getAreas().subscribe(res => {
      if(res.data) this.areas = [].concat(res.data.areas);
    }, err => {
      console.log(err);
    });
  }

  getPrinter(id) {
    this.printerID = id;
    this.printerService.getPrinter(id).subscribe(res => {
      if(res.data){
        if (res.data.printers.length === 0) {
          this.toastr.error("No se encuentra el registro indicado")
        } else {
          this.form.patchValue({
            description: res.data.printers[0].description,
            state: res.data.printers[0].state,
            ip: res.data.printers[0].ip,
            headquarter: (res.data.printers[0].headquarter) ? res.data.printers[0].headquarter.id : null,
            //headquarter_id: res.data.printers[0].headquarter_id,
            area : res.data.printers[0].area ? res.data.printers[0].area.id : null,
          });
        }
      }
    }, err => {
      console.log(err);
    });
  }

  /* getAreaByHeadquarter(id) {
    this.areaService.getAreaByHeadquarter(id).subscribe(res => {
      this.areas = [].concat(res.data.areas);
    }, err => {
      console.log(err);
    });
  } */

  save(data: any) {
    if(this.printerID){
    this.printerService.updatePrinter(this.printerID, data).subscribe(res => {
      this.toastr.clear();
      this.toastr.success('Operación Exitosa');
      this.router.navigateByUrl('/printers/list');
    }, err => {
      console.log(err);
    });
    }else{
      this.printerService.savePrinter(data).subscribe(res => {
        this.toastr.clear();
        this.toastr.success('Operación Exitosa');
        this.router.navigateByUrl('/printers/list');
      }, err => {
        console.log(err);
      });
    }
  }

  ngOnInit() {
    this.getHeadquarters();
    this.getAreas();
    if (this.printerID) {
      this.getPrinter(this.printerID);
    }else if(this.route.snapshot.params.id){
      this.getPrinter(this.route.snapshot.params.id);
    }
  }

  edit(data: any) {

  }

}
