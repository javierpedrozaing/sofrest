import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-open-tickets',
  templateUrl: './open-tickets.component.html',
  styleUrls: ['./open-tickets.component.scss']
})
export class OpenTicketsComponent implements OnInit {

  public showOptions :  boolean = false;
  public itemsTickes : any = [];
  public Tickets: FormGroup;
  store:any;

  constructor(
    public form: FormBuilder,
  ) {

    this.Tickets = this.form.group({
      "items": this.form.array([])
    });
   }

  ngOnInit() {
  }

  addTicket(){
    const itemsArray = this.Tickets.controls.items as FormArray;
    itemsArray.push(this.form.group({
      name: '',
    }));
  }

  deleteItem(idx){
    this.getItems.controls.splice(idx, 1);
    this.Tickets.value.items.splice(idx, 1);
  }

  get getItems() {
    return this.Tickets.get('items') as FormArray;
  }


}
