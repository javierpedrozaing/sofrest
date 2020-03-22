import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-mobile',
  templateUrl: './chat-mobile.component.html',
  styleUrls: ['./chat-mobile.component.scss']
})
export class ChatMobileComponent implements OnInit {
  public messages : any = [
  ];
  constructor() { }

  ngOnInit() {
    for (let index = 1; index < 10; index++) {
      this.messages.push({
        "name" : `Persona ${index % 2 !== 0 ? 1 : 2}`,
        "message" : "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo aliquam quas ex tempore, officiis hic ipsa, non impedit recusandae officia sapiente eum, dicta qui a voluptatum maxime vitae facilis placeat?"
      });
    }
  }
  

}
