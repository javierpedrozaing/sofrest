import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { ClientService } from 'src/app/services/client.service';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

  @Input() clientID : any;
  stores : any = [
    {
      "id" : 1,
      "name" : "Local 1",
    },
    {
      "id" : 2,
      "name" : "Local 2",
    },
  ];

  languages : any = [
    {
      "id" : 1,
      "name" : "Español",
    },
    {
      "id" : 2,
      "name" : "Inglés",
    },
  ];

  shop : any;
  public previewUrl : any = null;
  public form: FormGroup;
  public receiptEmail = new FormControl(null, FileUploadValidators.filesLimit(1));
  public receiptPrinted = new FormControl(null, FileUploadValidators.filesLimit(1));
  public plans : any[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private clientService : ClientService,
    public planService : PlanService,
  ) { 
    this.form = fb.group({
      id: [null,[]],
      business_name : [null,[Validators.required]],
      tradename : [null,[Validators.required]],
      ruc : [null,[Validators.required]],
      phone : [null,[Validators.required]],
      address : [null,[Validators.required]],
      observation : [null,[Validators.required]],
      email : [null,[Validators.required]],
      web : [null,[Validators.required]],
      invoice_size : [null,[]],
      ballot_size : [null,[]],
      consumer_recharge : [null,[]],
      price_type : [null,[]],
      plastic_bag_tax : [null,[]],
      consumption_surcharge_amount : [null,[]],
      plastic_bag_tax_amount : [null,[]],
      logo : this.receiptEmail,
      state : [null,[Validators.required]],
      plan_id : [null,[Validators.required]],

      // header: [null, [ Validators.required]],
      // footer: [null, [ Validators.required]],
      // info_client: [null, [ Validators.required]],
      // comments: [null, [ Validators.required]],
      // language: [1, [ Validators.required]],
      //receiptEmail : this.receiptEmail,
    });
  }

  changeShop(){
    
  }

  ngOnInit() {
    this.getPlans();
    this.getClient();
  }

  preview() {
    //Show preview 
    var mimeType = this.receiptEmail.value[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
 
    var reader = new FileReader();      
    reader.readAsDataURL(this.receiptEmail.value[0]); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
}


edit(data: any) {
  this.clientService.updateClient(data).subscribe(res => {
    this.toastr.clear();
    this.toastr.success('Operación Exitosa');
  }, err => {
    console.log(err);
  });
}

compareObjects(o1: any, o2: any) {
  if(o1 === o2) return true;
  else return false
}

getPlans() {
  this.planService.getPlans().subscribe(res => {
    if(res.data) this.plans = [].concat(res.data.plans);
  }, err => {
    console.log(err);
  });
}

getClient() {
  this.clientService.getClients().subscribe(res => {
    if(res.data){
      if (res.data.clients.length === 0) {
        this.toastr.error("No se encuentra el registro indicado")
      } else {
        this.clientID = res.data.clients.id;
        this.form.patchValue({
          business_name : res.data.clients.business_name,
          tradename : res.data.clients.tradename,
          ruc : res.data.clients.ruc,
          phone : res.data.clients.phone,
          address : res.data.clients.address,
          observation : res.data.clients.observation,
          email : res.data.clients.email,
          web : res.data.clients.web,
          invoice_size : res.data.clients.invoice_size,
          ballot_size : res.data.clients.ballot_size,
          consumer_recharge : res.data.clients.consumer_recharge,
          price_type : res.data.clients.price_type,
          plastic_bag_tax : res.data.clients.plastic_bag_tax,
          consumption_surcharge_amount : res.data.clients.consumption_surcharge_amount,
          plastic_bag_tax_amount : res.data.clients.plastic_bag_tax_amount,
          state : res.data.clients.state,
          plan_id: res.data.clients.plan ? res.data.clients.plan.id : null ,
        });
      }
    }
  }, err => {
    console.log(err);
  });
}

}
