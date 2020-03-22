import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {

  @Input() groupID: any;
  public form: FormGroup;
  public optionsAccess : any = {
    "tpv" : [
      {
        value : 1,
        "option" : "Ver todos los recibos",
        "description" : "Cuando esta opción esté deshabilitada, un cajero puede ver los últimos 5 recibos"
      },
      {
        value : 1,
        "option" : "Aplicar descuentos con acceso restringido",
      },
      {
        value : 1,
        "option" : "Cambiar los impuestos en una venta",
      },
      {
        value : 1,
        "option" : "Realizar devoluciones de compras",
      },
      {
        value : 1,
        "option" : "Gestionar todos los tickets abiertos",
      },
      {
        value : 1,
        "option" : "Borrar artículos de tickets abiertos",
      },
      {
        value : 1,
        "option" : "Ver cierre de caja",
      },
      {
        value : 1,
        "option" : "Abrir cajón portamonedas sin hacer una venta",
      },
      {
        value : 1,
        "option" : "Editar articulos",
      },
      {
        value : 1,
        "option" : "Modificar la configuración",
      },
      {
        value : 1,
        "option" : "Acceso a soporte de chat en vivo",
      },
    ],
    "back_office" : [
      {
        value : 1,
        "option" : "Informes",
        "description" : "Ver reportes de ventas y notificaciones"
      },
      {
        value : 1,
        "option" : "Artículos y administración de inventario",
        "description" : "Editar artículos y gestionar el inventario"
      },
      {
        value : 1,
        "option" : "Empleados",
        "description" : "Gestión de Empleados"
      },
      {
        value : 1,
        "option" : "Clientes",
        "description" : "Acceso a la base de clientes y notificaciones"
      },
      {
        value : 1,
        "option" : "Editar Perfil",
      },
      {
        value : 1,
        "option" : "Administrar facturación",
      },
      {
        value : 1,
        "option" : "Métodos de pago",
      },
      {
        value : 1,
        "option" : "Cambiar la configuración del programa de lealtad",
      },
      {
        value : 1,
        "option" : "Configurar impuestos",
      },
      {
        value : 1,
        "option" : "Configurar las impresoras de cocina",
      },
      {
        value : 1,
        "option" : "Administrar tipos de pedidos",
      },
      {
        value : 1,
        "option" : "Administrar Dispositivos Moviles",
        "description" : "Esta opción permite el inicio de sesión usando un email y contraseña"
      },
      {
        value : 1,
        "option" : "Soporte",
      },
      {
        value : 1,
        "option" : "Acceso a soporte de chat en vivo",
      },
    ]
  }
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.form = fb.group({
      role: [null, [ Validators.required]],
      tpv: [false, [ ]],
      back_office: [false, [ ]],
    });
  }


  ngOnInit() {
  }

  submit(data: any, formDirective: FormGroupDirective) {
    if(this.groupID) this.edit(data);
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
