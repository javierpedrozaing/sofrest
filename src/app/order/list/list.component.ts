import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  categories: any = [
    {
      name: 'Entradas',
      selected : true,
    },
    {
      name: 'Ensaladas',
    },
    {
      name: 'Piqueos',
    },
    {
      name: 'Carnes',
    },
    {
      name: 'Pastas',
    },
    {
      name: 'Pescados',
    },
    {
      name: 'Bebidas',
    },
    {
      name: 'Bebidas con Alcohol',
    },
  ];

  items = new Array(25);
  constructor(
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  selectedCategory(index: number) {
    this.categories.forEach(element => {
      element.selected = false;
    });
    this.categories[index].selected = true;
  }

  saveOrder(){
    this.toastr.success("Orden guardada");
    this.router.navigateByUrl('halls/halls/0');
  }

}
