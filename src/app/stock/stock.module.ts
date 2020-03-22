import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockListComponent, DialogFormStock } from './stock-list/stock-list.component';
import { StockFormComponent } from './stock-form/stock-form.component';
import { CommonMaterialModule } from '../common/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StockRoutingModule } from './stock.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { TransferOrderComponent, NewTransferOrderDialog } from './transfer-order/transfer-order.component';
import { PurchaseOrdersComponent, NewPurchaseOrderDialog } from './purchase-orders/purchase-orders.component';
import { AdjustStockComponent, NewStockAdjustDialog } from './adjust-stock/adjust-stock.component';
import { StockRecountComponent, NewStockRecountDialog } from './stock-recount/stock-recount.component';
import { ProductionsComponent, DialogProductionForm } from './productions/productions.component';
import { InventoryStockComponent, DialogInventoryStockDetail } from './inventory-stock/inventory-stock.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { StockValueComponent } from './stock-value/stock-value.component';
import { AdjustStockFormComponent } from './adjust-stock-form/adjust-stock-form.component';
import { SatNativeDateModule, SatDatepickerModule } from 'saturn-datepicker';
import { ProductionFormComponent } from './production-form/production-form.component';
import { OutStockComponent, DialogOutStockForm } from './out-stock/out-stock.component';
import { OutStockFormComponent } from './out-stock-form/out-stock-form.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { FixedAssetsComponent, DialogFixedAssetForm } from './fixed-assets/fixed-assets.component';
import { FixedAssetsFormComponent, DialogTrademarkForm, DialogSetForm, DialogModelForm } from './fixed-assets-form/fixed-assets-form.component';
import { MatNativeDateModule } from '@angular/material';
import { TrademarkModule } from '../trademark/trademark.module';
import { ModelModule } from '../model/model.module';
import { SetModule } from '../set/set.module';
import { DialogFormTypeProduct } from '../products/form-product/form-product.component';
import { ProductModule } from '../products/product.module';
import { ProductTypesComponent, ProductTypesContainerFormComponent } from './product-types/product-types.component';
import { ProductTypesFormComponent } from './product-types/product-types-form/product-types-form.component';
import { ApplicationPipesModuleModule } from '../common/application-pipes-module/application-pipes-module.module';

@NgModule({
  declarations: [
    StockListComponent,
    StockFormComponent,
    DialogFormStock,
    TransferOrderComponent,
    NewTransferOrderDialog,
    NewPurchaseOrderDialog,
    PurchaseOrdersComponent,
    AdjustStockComponent,
    NewStockAdjustDialog,
    StockRecountComponent,
    NewStockRecountDialog,
    ProductionsComponent,
    InventoryStockComponent,
    StockValueComponent,
    AdjustStockFormComponent,
    ProductionFormComponent,
    DialogProductionForm,
    OutStockComponent,
    OutStockFormComponent,
    DialogOutStockForm,
    FixedAssetsComponent,
    FixedAssetsFormComponent,
    DialogFixedAssetForm,
    DialogTrademarkForm,
    DialogSetForm,
    DialogModelForm,
    DialogInventoryStockDetail,
    ProductTypesComponent,
    ProductTypesContainerFormComponent,
    ProductTypesFormComponent
  ],
  imports: [
    CommonModule,
    CommonMaterialModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    StockRoutingModule,
    FlexLayoutModule,
    NgxDaterangepickerMd.forRoot(),
    NgxMatSelectSearchModule,
    SatDatepickerModule,
    SatNativeDateModule,
    NgxMaterialTimepickerModule,
    FileUploadModule,
    AmazingTimePickerModule,
    TrademarkModule,
    SetModule,
    ModelModule,
    ProductModule,
    ApplicationPipesModuleModule,
  ],
  entryComponents: [
    DialogFormStock,
    NewTransferOrderDialog,
    NewPurchaseOrderDialog,
    NewStockAdjustDialog,
    NewStockRecountDialog,
    DialogProductionForm,
    DialogOutStockForm,
    DialogFixedAssetForm,
    DialogTrademarkForm,
    DialogSetForm,
    DialogModelForm,
    DialogFormTypeProduct,
    DialogInventoryStockDetail,
    ProductTypesContainerFormComponent,
    ProductTypesFormComponent
  ],
})
export class StockModule { }
