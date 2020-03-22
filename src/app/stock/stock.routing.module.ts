import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockFormComponent } from './stock-form/stock-form.component';
import { TransferOrderComponent, NewTransferOrderDialog } from './transfer-order/transfer-order.component';
import { PurchaseOrdersComponent, NewPurchaseOrderDialog } from './purchase-orders/purchase-orders.component';
import { AdjustStockComponent } from './adjust-stock/adjust-stock.component';
import { StockRecountComponent } from './stock-recount/stock-recount.component';
import { ProductionsComponent } from './productions/productions.component';
import { InventoryStockComponent } from './inventory-stock/inventory-stock.component';
import { StockValueComponent } from './stock-value/stock-value.component';
import { AdjustStockFormComponent } from './adjust-stock-form/adjust-stock-form.component';
import { ProductionFormComponent } from './production-form/production-form.component';
import { OutStockComponent } from './out-stock/out-stock.component';
import { OutStockFormComponent } from './out-stock-form/out-stock-form.component';
import { FixedAssetsComponent } from './fixed-assets/fixed-assets.component';
import { FixedAssetsFormComponent } from './fixed-assets-form/fixed-assets-form.component';
import { ProductTypesComponent } from './product-types/product-types.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: StockListComponent,
      },
      {
        path: 'new',
        component: StockFormComponent,
      },
      {
        path: 'transfer-orders',
        component: TransferOrderComponent,
      },
      {
        path: 'transfer-orders/form',
        component: NewTransferOrderDialog,
      },
      {
        path: 'transfer-orders/form/:id',
        component: NewTransferOrderDialog,
      },
      {
        path: 'purchase-orders',
        component: PurchaseOrdersComponent,
      },
      {
        path: 'purchase-orders/form',
        component: NewPurchaseOrderDialog,
      },
      {
        path: 'purchase-orders/form/:id',
        component: NewPurchaseOrderDialog,
      },
      {
        path: 'product-types',
        component: ProductTypesComponent,
      },
      {
        path: 'adjust-stock',
        component: AdjustStockComponent,
      },
      {
        path: 'adjust-stock/form',
        component: AdjustStockFormComponent,
      },
      {
        path: 'stock-recount',
        component: StockRecountComponent,
      },
      {
        path: 'stock-productions',
        component: ProductionsComponent,
      },
      {
        path: 'stock-productions/form',
        component: ProductionFormComponent,
      },
      {
        path: 'inventory-stock',
        component: InventoryStockComponent,
      },
      {
        path: 'valuation',
        component: StockValueComponent,
      },
      {
        path: 'products-out',
        component: OutStockComponent,
      },
      {
        path: 'products-out/form',
        component: OutStockFormComponent,
      },
      {
        path: 'fixed-assets',
        component: FixedAssetsComponent,
      },
      {
        path: 'fixed-assets/form',
        component: FixedAssetsFormComponent,
      },

     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StockRoutingModule { }
