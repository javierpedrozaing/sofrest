import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  cant = 0;
  selected = false;
  constructor() { }

  ngOnInit() {
  }

  increment() {
    if (typeof this.cant === 'number') { this.cant += 1; } else { this.cant = 0; }
  }

  decrement() {
    if (typeof this.cant === 'number') {
      if (this.cant > 0) { this.cant -= 1; }
    } else { this.cant = 0; }
  }
}
