import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-option',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  @Input() menuElement: any;

  constructor() { }

  ngOnInit() {
    console.log(this.menuElement);
  }

}
