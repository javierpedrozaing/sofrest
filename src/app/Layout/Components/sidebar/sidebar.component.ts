import { Component, HostListener, OnInit } from '@angular/core';
import { ThemeOptions } from '../../../theme-options';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CryptoService } from 'src/app/common/security-service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`
      .app-header__logo{
        background : #000000;
      }

      .active-item{
        background : orange !important;
      }

      .dropdown-item:hover{
        background : orange !important;
        cursor:pointer;
      }

      .dropdown-item-menu:focus{
        background : #ffb74d !important;
        cursor:pointer;
      }

      .v-sidebar-menu .vsm-link:hover, .v-sidebar-menu .vsm-link.active-item, .app-sidebar.text-lighter .v-sidebar-menu .vsm-item.active-item > .vsm-link, .app-sidebar.text-darker .v-sidebar-menu .vsm-item.active-item > .vsm-link{
        background : orange !important;
        color: #033C73 !important;
      }
  `]
})
export class SidebarComponent implements OnInit {
  public extraParameter: any;
  public menuItems: any[] = [];
  public statusTheme = false;
  public statusMenu = false;
  constructor(
    public globals: ThemeOptions,
    private activatedRoute: ActivatedRoute,
    public cryptoService: CryptoService,
    private status: LoginService
  ) {
    this.status.statusTheme.subscribe(res => {
      this.statusTheme = res.dark;
    });

    this.status.statusMenu.subscribe(res => {
      this.statusMenu = res.right;
    });
  }

  @select('config') public config$: Observable<any>;

  public newInnerWidth: number;
  private innerWidth: number;

  toggleSidebar() {
    this.globals.toggleSidebar = !this.globals.toggleSidebar;
  }

  sidebarHover() {
    this.globals.sidebarHover = !this.globals.sidebarHover;
  }

  selectMenuOption(element){
    document.getElementById(element).click();
  }

  getMenuItemsAdmin() {
    return [
      {
        name: 'Reportes',
        icon: 'reports',
        tooltip : 'Reportes',
        items: [
          {
            name: 'Resumen de Ventas',
            icon: 'pe-7s-home',
            route: '/report/sales-summary',
            tooltip : 'Resumen de Ventas',
          },
          {
            name: 'Clientes',
            icon: 'pe-7s-display1',
            route: '/report/clients',
            tooltip: 'Reportes de Clientes',
          },
          {
            name: 'Platos',
            icon: 'pe-7s-display1',
            route: '/report/plates',
            tooltip: 'Reportes de Platos',
          },
          {
            name: 'Recursos Humanos',
            icon: 'pe-7s-display1',
            tooltip: 'Reportes de Trabajadores',
            route: '/report/human-resources',
          },
        ]
      },
      {
        name: 'Artículos',
        icon: 'articles',
        "slug": "articles.menu",
        items: [
          {
            name: 'Categorias',
            route: '/articles/categories',
            icon: 'pe-7s-box1',
            tooltip : 'Categorias',
            "slug": "articles.categories",
          },
          {
            name: 'Sub-Categorias',
            route: '/articles/sub-categories',
            icon: 'pe-7s-box1',
            tooltip : 'Sub-Categorias',
            "slug": "articles.subcategories",
          },
          {
            name: 'Lista de Artículos',
            route: '/articles/list',
            icon: 'pe-7s-box1',
            tooltip: 'Lista de Articulos',
            "slug": "articles.articles",
          },
          {
            name: 'Modificadores',
            route: '/articles/modifiers',
            icon: 'pe-7s-box1',
            tooltip : 'Modificadores',
            "slug": "articles.modifier",
          },
          {
            name: 'Areas de Produccion',
            route: '/articles/production-areas',
            icon: 'pe-7s-box1',
            tooltip : 'Areas de Produccion',
            "slug": "articles.production_area",
          },
        ]
      },
      {
        name: 'Cocina/Bar',
        icon: 'kitchen-bar',
        "slug": "kitchen.menu",
        items: [
          {
            name: 'Recetas Bases',
            icon: 'pe-7s-box1',
            dropdown : false,
            route: "/recipes",
            // items:[
            //   {
            //     name: "Recetas Bases",
            //     route: "/recipes",
            //     tooltip : 'Recetas',
            //     "slug": "kitchen.recipes.recipes",
            //   }
            // ],
          },
          {
            name: 'Platos/Cócteles',
            icon: 'pe-7s-box1',
            dropdown : true,
            "slug": "kitchen.dish.menu",
            items:[
              // {
              //   name: 'Sabores',
              //   icon: 'pe-7s-print',
              //   route: '/plates/taste',
              //   "slug": "kitchen.dish.flavors",
              //   dropdown: false,
              //   tooltip : 'Colores',
              // },
              {
                name: 'Categorías',
                icon: 'pe-7s-print',
                route: '/plates/dish-category',
                dropdown: false,
                tooltip : 'Categorías',
                "slug": "kitchen.dish.categories",
              },
              {
                name: 'Platos',
                route: '/plates',
                tooltip: 'Platos',
                "slug": "kitchen.dish.dishes",
              }
            ],
          },
          {
            name: 'Porcionamiento',
            icon: 'pe-7s-box1',
            route: "/parking/form",
            tooltip: 'Porcionamiento',
            "slug": "kitchen.dish.portioning.create",
          },
        ]
      },
      {
        name: 'Combos',
        icon: 'combos',
        "slug": "combo.menu",
        items: [
          {
            name: 'Combos',
            route: '/combos/list',
            icon: 'pe-7s-box1',
            tooltip : 'Combos',
            "slug": "combo.combo",
          },
          {
            name: 'Promociones',
            route: '/combos/special-sales',
            icon: 'pe-7s-box1',
            tooltip: 'Promociones',
            "slug": "combo.promotions",
          },
        ]
      },
      {
        name: 'Almacén',
        icon: 'storage',
        "slug": "warehouse.menu",
        items: [
          {
            name: 'Almacén',
            route: '/stores/list',
            icon: 'pe-7s-box1',
            tooltip : 'Almacén',
            "slug": "warehouse.warehouse",
          },
          {
            name: 'Proveedores',
            route: '/providers/list',
            icon: 'pe-7s-cart',
            tooltip : 'Proveedores',
            "slug": "warehouse.providers",
          },
          {
            name: 'Inventario',
            route: '/stock/list',
            icon: 'pe-7s-note2',
            dropdown: true,
            tooltip : 'Inventario',
            "slug": "warehouse.inventory",
            items: [
              {
                name: 'Activos Fijos',
                route: '/stock/fixed-assets',
                "slug": "warehouse.inventory.fixed_assets",
              },
              {
                name: 'Tipos de Producto',
                route: '/stock/product-types',
              },
              {
                name: 'Ordenes de Compra',
                route: '/stock/purchase-orders',
              },
              {
                name: 'Órdenes de Transferencia',
                route: '/stock/transfer-orders',
              },
              {
                name: 'Egresos de Productos',
                route: '/stock/products-out',
              },
              {
                name: 'Ajuste de Stock',
                route: '/stock/adjust-stock',
              },
              {
                name: 'Inventario Físico',
                route: '/stock/stock-recount',
              },
              {
                name: 'Producciones',
                route: '/stock/stock-productions',
              },
              {
                name: 'Histórico de Inventario',
                route: '/stock/inventory-stock',
                icon: 'pe-7s-cart',
              },
              {
                name: 'Valoración de Inventario',
                route: '/stock/valuation',
                icon: 'pe-7s-cart',
              },
            ]
          },
          // {
          //   name: 'Unidades de Medida',
          //   route: '/measurement-units/list',
          //   icon: 'pe-7s-bookmarks',
          //   tooltip : 'Unidades de medida',
          // },
          // {
          //   name: 'Ingreso de Documentos',
          //   icon: 'pe-7s-chat',
          //   dropdown: true,
          //   tooltip : 'Ingreso de Documentos',
          //   items: [
          //     // {
          //     //   name: 'Tipos de Documentos',
          //     //   route: '/orders/orders-types/list',
          //     // },
          //     // {
          //     //   name: 'Tipos de Ingresos',
          //     //   route: '/orders/entry-type',
          //     // },
          //     {
          //       name: 'Documentos',
          //       route: '/orders/list',
          //     }
          //   ]
          // },
          {
            name: 'Compras',
            icon: 'pe-7s-chat',
            route: '/orders/list',
            tooltip : 'Gestionar Compras',
            items: [
              // {
              //   name: 'Tipos de Documentos',
              //   route: '/orders/orders-types/list',
              // },
              // {
              //   name: 'Tipos de Ingresos',
              //   route: '/orders/entry-type',
              // },
              {
                name: 'Documentos',
                route: '/orders/list',
              }
            ]
          },
        ]
      },
      {
        name: 'Caja',
        icon: 'cash-register',
        "slug": "box.menu",
        items: [
          {
            name: 'Venta Directa',
            icon: 'pe-7s-cash',
            route: '/sales',
            dropdown: false,
            tooltip : 'Venta Directa',
            "slug": "box.sale",
          },
          {
            name: 'Cobro POS',
            icon: 'pe-7s-cash',
            route: '/pos-sales/list',
            dropdown: false,
            tooltip : 'Ventas Pos',
            "slug": "box.pos",
          },
          {
            name: 'Gestionar Caja',
            icon: 'pe-7s-cash',
            route: '/pos-sales/cash-registers',
            dropdown: false,
            tooltip : 'Gestionar Caja',
            "slug": "box.box",
          },
          {
            name: 'Mesas y Pedidos',
            icon: 'pe-7s-cart',
            route: '/tables-and-orders/list-orders',
            dropdown: false,
            tooltip : 'Mesas y Pedidos',
            "slug": "box.table_orders",
          },
          {
            name: 'Reservas',
            icon: 'pe-7s-credit',
            route: '/reservations',
            dropdown: false,
            tooltip : 'Reservas',
            "slug": "box.reservation",
          },
          {
            name: 'Presupuesto/Cotizaciones',
            icon: 'pe-7s-credit',
            route: '/quotes/list',
            dropdown: false,
            tooltip : 'Presupuesto/Cotizaciones',
            "slug": "box.quotation",
          },
        ]
      },
      {
        name: 'Contabilidad',
        icon: 'account',
        "slug": "accounting.menu",
        items: [
          {
            name: 'Exportar Datos',
            icon: 'pe-7s-download',
            route: '/accounting/list',
            tooltip : 'Exportar Datos',
          },
          {
            name: 'Comprobantes Electrónicos',
            route: '/accounting/electronic-receipt',
            icon: 'pe-7s-file',
            tooltip : 'Comprobantes Electrónicos',
          },
          {
            name: 'Pagos y Gastos',
            icon: 'pe-7s-file',
            dropdown: true,
            tooltip : 'Pagos y Gastos',
            "slug": "accounting.payments.menu",
            items:[
              {
                name: 'Motivos',
                icon: 'pe-7s-file',
                route: '/accounting/motives',
                tooltip : 'Motivos',
                "slug": "accounting.payments.motive",
              },
              {
                name: 'Pagos y Gastos',
                icon: 'pe-7s-cash',
                route: '/accounting/payments-expenses',
                tooltip : 'Pagos y Gastos',
                "slug": "accounting.payments.payments",
              },
            ],
          },
        ]
      },
      {
        name: 'Fidelización',
        icon: 'loyalty',
        "slug": "loyalty.menu",
        items: [
          {
            name: 'Clientes',
            route: '/clients',
            icon: 'pe-7s-users',
            dropdown: false,
            tooltip : 'clientes',
            "slug": "loyalty.customers",
          },
          {
            name: 'Estadísticas de Clientes',
            route: '/clients-statistics',
            icon: 'pe-7s-display1',
            dropdown: false,
            tooltip : 'Estadisticas de Clientes',
            "slug": "loyalty.customers.statistics",
          },
        ]
      },
      {
        name: 'Órdenes de Atención',
        icon: 'attention-orders',
        "slug": "attention_order.menu",
        items: [
          {
            name: 'Salones',
            route: '/halls',
            icon: 'pe-7s-users',
            tooltip : 'Mesas',
            "slug": "attention_order.halls",
          },
          {
            name: 'Mesas',
            route: '/tables',
            icon: 'pe-7s-users',
            tooltip : 'Mesas',
            "slug": "attention_order.tables",
          },
          {
            name: 'Pedidos',
            route: '/orders/list-orders',
            icon: 'pe-7s-users',
            tooltip : 'pedidos',
            "slug": "attention_order.orders",
          }
        ]
      },
      {
        name: 'Recursos Humanos',
        icon: 'human-resources',
        "slug": "human_resources.menu",
        items: [
          {
            name: 'Personal',
            icon: 'pe-7s-users',
            dropdown: true,
            "slug": "human_resources.personal.menu",
            items : [
              {
                name : "Usuarios",
                route: '/human-resource/list-employees',
                tooltip : 'Usuarios',
              }
            ]
          },
          {
            name: 'Permisos y Roles',
            route: '/human-resource/accessPermits',
            icon: 'pe-7s-id',
            tooltip : 'Permisos de acceso',
            "slug": "human_resources.roles",
          },
          {
            name: 'Tarjetas de Asistencia',
            route: '/human-resource/assistance-card',
            icon: 'pe-7s-id',
            tooltip : 'Tarjetas de Asistencia',
          },
          {
            name: 'Horas Trabajadas',
            route: '/human-resource/working-time-counter',
            icon: 'pe-7s-timer',
            tooltip : 'Horas trabajadas',
          },
          {
            name: 'Planilla',
            route: '/human-resource/payroll',
            icon: 'pe-7s-timer',
            tooltip : 'Planilla',
          },
        ]
      },
      {
        name: 'Configuración',
        icon: 'settings',
        items: [
          {
            name: 'Configuración General',
            route: '/settings/general',
            icon: 'pe-7s-timer',
            tooltip : 'configuración General',
            "slug": "configuration",
          },
          {
            name: 'Métodos de Pago',
            icon: 'pe-7s-way',
            route: '/payment-methods/list',
            dropdown: false,
            tooltip : 'Métodos de pago',
            "slug": "configuration.payment_methods",
          },
          {
            name: 'Tipos de Salon',
            icon: 'pe-7s-way',
            route: '/hall-type/list',
            dropdown: false,
            tooltip : 'Tipos de Salon',
          },
          {
            name: 'Tipos de Pedidos',
            icon: 'pe-7s-portfolio',
            route: '/settings/order-types',
            dropdown: false,
            tooltip : 'Tipos de Pedidos',
            "slug": "configuration.order_type",
          },
          {
            name: 'Configuración de Empresa',
            icon: 'pe-7s-portfolio',
            route: '/settings/receipts',
            dropdown: false,
            tooltip : 'Configuración de Empresa',
            "slug": "configuration.document",
          },
          // {
          //   name: 'Datos de la Empresa',
          //   icon: 'pe-7s-portfolio',
          //   route: '/companies',
          //   dropdown: false,
          //   tooltip : 'Datos de la Empresa',
          //   "slug": "configuration.company",
          // },
          /* {
            name: 'Miembros',
            icon: 'pe-7s-portfolio',
            route: '/client-members/list',
            dropdown: false,
            tooltip : 'Miembros',
          }, */
          {
            name: 'Sucursales',
            icon: 'pe-7s-copy-file',
            dropdown: false,
            tooltip : 'Sucursales',
            route: '/branches/list',
            "slug": "configuration.headquarters.menu",
            /* items: [
              {
                name: 'Sucursales',
                route: '/branches/list',
                "slug": "configuration.headquarters",
              },
              {
                name: 'Tipos de Sucursales',
                "slug": "configuration.headquarters.type",
                route: '/branches/branches-types/list',
              },
            ] */
          },
          /* {
            name: 'Puntos de Lealtad',
            icon: 'pe-7s-portfolio',
            route: '/settings/loyalty-points',
            dropdown: false,
            tooltip : 'Puntos de Lealtad',
          }, */
          {
            name: 'Impuestos',
            icon: 'pe-7s-portfolio',
            route: '/settings/taxes',
            dropdown: false,
            tooltip : 'Impuestos',
            "slug": "configuration.taxes",
          },
          {
            name: 'Monedas',
            icon: 'pe-7s-portfolio',
            route: '/settings/coins',
            dropdown: false,
            tooltip : 'Monedas',
            "slug": "configuration.coin",
          },
          {
            name: 'Descuentos',
            route: '/articles/discounts',
            icon: 'pe-7s-box1',
            tooltip : 'Descuentos',
            "slug": "configuration.discounts",
          },
          // {
          //   name: 'Ubigeo',
          //   route: '/ubigeos/list',
          //   icon: 'pe-7s-box1',
          //   tooltip : 'Ubigeo',
          // },
          /* {
            name: 'Formas de Mesa',
            route: '/tables/shapes',
            icon: 'pe-7s-box1',
            tooltip : 'Formas de Mesa',
          }, */
          // {
          //   name: 'Configuración de Empresa',
          //   icon: 'pe-7s-portfolio',
          //   route: '/settings/receipts',
          //   dropdown: false,
          //   tooltip : 'Configuración de Empresa',
          //   "slug": "configuration.document",
          // },
          /* {
            name: 'Tickets Abiertos',
            icon: 'pe-7s-portfolio',
            route: '/settings/open-tickets',
            dropdown: false,
            tooltip : 'Tickets Abiertos',
          }, */
          {
            name: 'Impresoras',
            icon: 'pe-7s-print',
            dropdown: false,
            tooltip : 'Impresoras',
            route: '/printers/list',
            items: [
              {
                name: 'Áreas de Impresión',
                route: '/areas/list',
                "slug": "configuration.printers",
              },
              {
                name: 'Impresoras',
                route: '/printers/list',
              }
            ]
          },
          {
            name: 'Áreas',
            route: '/areas/list',
            "slug": "configuration.printers",
          },
          {
            name: 'Tipos de Reservaciones',
            icon: 'pe-7s-print',
            route: '/reservations/types',
            dropdown: false,
            tooltip : 'Tipos de Reservaciones',
            "slug": "configuration.type_reservation",
          },
          /* {
            name: 'Órdenes de Operación',
            icon: 'pe-7s-print',
            route: '/operation-order/list',
            dropdown: false,
            tooltip : 'Órdenes de Operación',
          }, */
          {
            name: 'Colores',
            icon: 'pe-7s-print',
            route: '/colors/list',
            dropdown: false,
            tooltip : 'Colores',
            "slug": "configuration.colours",
          },
          /* {
            name: 'Áreas de Impresión',
            icon: 'pe-7s-print',
            route: '/areas/list',
            dropdown: false,
            tooltip : 'Áreas de Impresión',
          }, */
          {
            name: 'Permisos de Acceso',
            icon: 'pe-7s-browser',
            route: '/roles/list',
            dropdown: false,
            tooltip : 'Pemisos de Acceso',
          },
        ]
      },
      {
        name : 'Copias de Seguridad',
        icon: 'backup',
        "slug": "backup.menu",
        items: [
          {
            name: 'Copias de Seguridad',
            route: '/security-copy',
            icon: 'pe-7s-door-lock',
            dropdown: false,
            tooltip : 'Copias de Seguridad',
            "slug": "backup",
          },
        ]
      },
      {
        name : 'Artículos Deshabilitados',
        icon: 'unavailables-articles',
        "slug": "articles.disabled.menu",
        items: [
          {
            name: 'Artículos Deshabilitados',
            route: '/articles/disabled-items',
            icon: 'pe-7s-door-lock',
            dropdown: false,
            tooltip : 'Artículos Deshabilitados',
            "slug": "articles.disabled",
          },
        ]
      },
      {
        name : 'Facturación y Suscripción',
        icon: 'billing-subscription',
        items: [
          {
            name: 'Planes',
            icon: 'pe-7s-safe',
            route: '/clients/plans',
            tooltip : 'Planes',
          },
        ]
      },
      {
        name : 'Licencia',
        icon: 'licence',
        "slug": "licence",
        items: [
          {
            name: 'Licencia',
            icon: 'pe-7s-safe',
            route: 'license',
            tooltip : 'Licencia',
          },
        ]
      },
      {
        name : 'Extras',
        icon: 'xtras',
        items: [
          {
            name: 'Manual de uso',
            icon: 'pe-7s-safe',
            route: 'tutorial',
            tooltip : 'Manual de uso',
          },
          {
            name: 'Actualizar',
            icon: 'pe-7s-safe',
            route: 'update',
            tooltip : 'Actualizar',
          },
          {
            name: 'Soporte Técnico',
            icon: 'pe-7s-safe',
            route: 'support',
            tooltip : 'Soporte Técnico',
          },
        ]
      },
    ];
  }

  getMenuItemsSales() {
    return [
      // {
      //   name: 'Menu de Navegación',
      //   icon: 'pe-7s-display1',
      //   items: [
      //     {
      //       name: 'Dashboard',
      //       icon: 'pe-7s-home',
      //       dropdown: false,
      //     },
      //   ]
      // },
      {
        name: 'Caja',
        icon: 'cash-register',
        items: [
          {
            name: 'Venta Directa',
            icon: 'pe-7s-cash',
            route: '/pos-sales/shopping-cart',
            dropdown: false,
            tooltip : 'Venta Directa',
          },
          {
            name: 'Cobro POS',
            icon: 'pe-7s-cash',
            route: '/pos-sales/list',
            dropdown: false,
            tooltip : 'Ventas Pos',
          },
          {
            name: 'Gestionar Caja',
            icon: 'pe-7s-cash',
            route: '/pos-sales/cash-registers',
            dropdown: false,
            tooltip : 'Gestionar Caja',
          },
          {
            name: 'Mesas y Pedidos',
            icon: 'pe-7s-cart',
            route: '/tables-and-orders/list-orders',
            dropdown: false,
            tooltip : 'Mesas y Pedidos',
          },
          {
            name: 'Reservas',
            icon: 'pe-7s-credit',
            route: '/reservations',
            dropdown: false,
            tooltip : 'Reservas',
          },
          {
            name: 'Presupuesto/Cotizaciones',
            icon: 'pe-7s-credit',
            route: '/quotes/list',
            dropdown: false,
            tooltip : 'Presupuesto/Cotizaciones',
          },
        ]
      },
      {
        name: 'Fidelización',
        icon: 'loyalty',
        items: [
          {
            name: 'Clientes',
            route: '/clients',
            icon: 'pe-7s-users',
            dropdown: false,
          },
          {
            name: 'Estadísticas de Clientes',
            route: '/clients-statistics',
            icon: 'pe-7s-display1',
            dropdown: false,
          },
          {
            name: 'Descuentos y Ofertas',
            icon: 'pe-7s-credit',
            route: '/offers',
            dropdown: false,
          },
        ]
      },
    ];
  }

  getMenuItemsBossWaiter() {
    return [
      // {
      //   name: 'Menu de Navegación',
      //   icon: 'pe-7s-display1',
      //   items: [
      //     {
      //       name: 'Dashboard',
      //       icon: 'pe-7s-home',
      //       route: '/halls/halls/0',
      //       dropdown: false,
      //     },
      //   ]
      // },
      {
        name: 'Órdenes',
        icon: 'attention-orders',
        items: [
          {
            name: 'Mesas',
            icon: 'pe-7s-drawer',
            route: '/tables',
            dropdown: false,
          },
          {
            name: 'Salones',
            icon: 'pe-7s-safe',
            route: '/halls',
            dropdown: false,
          },
        ]
      },
    ];
  }

  getMenuItemsWaiter() {
    return [
      {
        name: 'Órdenes',
        icon: 'attention-orders',
        items: [
          {
            name: 'Dashboard',
            icon: 'pe-7s-home',
            route: '/halls/halls/1',
            dropdown: false,
          },
        ]
      },
    ];
  }

  getMenuItemsKitchen() {
    return [
      {
        name: 'Menu de Navegación',
        icon: 'kitchen-bar',
        items: [
          {
            name: 'Cocina',
            icon: 'pe-7s-home',
            route: '/kitchen',
            dropdown: false,
          },
        ]
      },
    ];
  }

  ngOnInit() {
    this.newInnerWidth = window.innerWidth;
    setTimeout(() => {
      this.globals.toggleSidebar = true;
    });
    if (localStorage.getItem('role')) {
      const desencrypt: any = this.cryptoService.decryptUsingAES256(localStorage.getItem('role'));
      try {
        this.menuItems = this.getItemByRole(desencrypt);
      } catch (error) {

      }
    }
    this.extraParameter = this.activatedRoute.snapshot.firstChild.data.extraParameter;

  }

  getItemByRole(code: string) {
    switch (code) {
      case '0000':
        return this.getMenuItemsAdmin();
      case '0011':
        return this.getMenuItemsSales();
      case '1111':
        return this.getMenuItemsBossWaiter();
      case '2222':
        return this.getMenuItemsWaiter();
      case '3333':
        return this.getMenuItemsKitchen();
      default:
        return [];
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.newInnerWidth = event.target.innerWidth;
    if (this.newInnerWidth < 1200) {
      this.globals.toggleSidebar = true;
    } else {
      this.globals.toggleSidebar = true;
    }

  }
}
