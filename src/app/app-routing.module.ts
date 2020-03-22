import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BaseLayoutComponent} from './Layout/base-layout/base-layout.component';
import {PagesLayoutComponent} from './Layout/pages-layout/pages-layout.component';

// DEMO PAGES

// Dashboards
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './session/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '', component: HomeComponent, data: {extraParameter: 'dashboardsMenu'}
      },
      {
        path: 'chats', loadChildren: () => import('./chats/chats.module').then(m => m.ChatsModule)
      },
      {
        path: 'kitchen', loadChildren: () => import('./kitchen/kitchen/kitchen.module').then(m => m.KitchenModule)
      },
      {
        path: 'printers', loadChildren: () => import('./printers/printers.module').then(m => m.PrintersModule)
      },
      {
        path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
      },
      {
        path: 'plates', loadChildren: () => import('./plates/plates.module').then(m => m.PlatesModule)
      },
      {
        path: 'orders', loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
      },
      {
        path: 'orders-mobile', loadChildren: () => import('./orders-mobile/orders-mobile.module').then(m => m.OrdersMobileModule)
      },
      { path: 'orders-charge', loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
      },
      {
        path: 'halls', loadChildren: () => import('./supervisor/supervisor.module').then(m => m.SupervisorModule)
      },
      {
        path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'providers', loadChildren: () => import('./providers/providers.module').then(m => m.ProvidersModule)
      },
      {
        path: 'stores', loadChildren: () => import('./store/store.module').then(m => m.StoreModule)
      },
      {
        path: 'products', loadChildren: () => import('./products/product.module').then(m => m.ProductModule)
      },
      {
        path: 'measurement-units', loadChildren: () => import('./measurement-units/measurement-units.module').then(m => m.MeasurementUnitsModule)
      },
      {
        path: 'stock', loadChildren: () => import('./stock/stock.module').then(m => m.StockModule)
      },
      {
        path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
      },
      {
        path: 'sales', loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule)
      },
      {
        path: 'pos-sales', loadChildren: () => import('./pos-sales/pos-sales.module').then(m => m.PosSalesModule)
      },
      {
        path: 'companies', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)
      },
      {
        path: 'branches', loadChildren: () => import('./branch/branch.module').then(m => m.BranchModule)
      },
      {
        path: 'payment-methods', loadChildren: () => import('./payment-method/payment-method.module').then(m => m.PaymentMethodModule)
      },
      {
        path: 'payment-way', loadChildren: () => import('./payment-way/payment-way.module').then(m => m.PaymentWayModule)
      },
      {
        path: 'roles', loadChildren: () => import('./role/role.module').then(m => m.RoleModule)
      },
      {
        path: 'reservations', loadChildren: () => import('./reservations/reservations.module').then(m => m.ReservationsModule)
      },
      {
        path: 'clients', loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)
      },
      {
        path: 'tables-and-orders', loadChildren: () => import('./tables-and-orders/tables-and-orders.module').then(m => m.TablesAndOrdersModule)
      },
      {
        path: 'food-hall', loadChildren: () => import('./food-hall/food-hall.module').then(m => m.FoodHallModule)
      },
      {
        path: 'sale-type', loadChildren: () => import('./sale-type/sale-type.module').then(m => m.SaleTypeModule)
      },
      {
        path: 'report', loadChildren: () => import('./report/report.module').then(m => m.ReportModule)
      },
      {
        path: 'settings', loadChildren: () => import('./settings/settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'human-resource', loadChildren: () => import('./human-resource/human-resource.module').then(m => m.HumanResourceModule)
      },
      {
        path: 'articles', loadChildren: () => import('./articles/articles.module').then(m => m.ArticlesModule)
      },
      {
        path: 'accounting', loadChildren: () => import('./accounting/accounting.module').then(m => m.AccountingModule)
      },
      {
        path: 'combos', loadChildren: () => import('./combos/combos.module').then(m => m.CombosModule)
      },
      {
        path: 'tables', loadChildren: () => import('./table/table.module').then(m => m.TableModule)
      },
      {
        path: 'quotes', loadChildren: () => import('./quotation/quotation.module').then(m => m.QuotationModule)
      },
      {
        path: 'trademark', loadChildren: () => import('./trademark/trademark.module').then(m => m.TrademarkModule)
      },
      {
        path: 'set', loadChildren: () => import('./set/set.module').then(m => m.SetModule)
      },
      {
        path: 'model', loadChildren: () => import('./model/model.module').then(m => m.ModelModule)
      },
      {
        path: 'parking', loadChildren: () => import('./parking/parking.module').then(m => m.ParkingModule)
      },
      {
        path: 'ubigeos', loadChildren: () => import('./ubigeo/ubigeo.module').then(m => m.UbigeoModule)
      },
      {
        path: 'areas', loadChildren: () => import('./areas/areas.module').then(m => m.AreasModule)
      },
      {
        path: 'hall-type', loadChildren: () => import('./hall-type/hall-type.module').then(m => m.HallTypeModule)
      },
      {
        path: 'colors', loadChildren: () => import('./color/color.module').then(m => m.ColorModule)
      },
      {
        path: 'operation-order', loadChildren: () => import('./operation-order/operation-order.module').then(m => m.OperationOrderModule)
      },
      {
        path: 'client-members', loadChildren: () => import('./client-members/client-members.module').then(m => m.ClientMembersModule)
      },
    ]
  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [
     {path: 'login', component: LoginComponent, data: {}},
      {path: 'kitchen', loadChildren: () => import('./kitchen/kitchen/kitchen.module').then(m => m.KitchenModule)},
     {
      path: 'sales', loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule)
     }
    ]
  },
  {path: '**', redirectTo: 'stock/fixed-assets'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
