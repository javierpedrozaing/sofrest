import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { TypeAttributeService } from './type-attribute.service';
import { BoxService } from './box.service';
import { CashMovementService } from './cash-movement.service';
import { CategoryService } from './category.service';
import { CoinService } from './coin.service';
import { ComboService } from './combo.service';
import { DiscountService } from './discount.service';
import { DishCategoryService } from './dish-category.service';
import { DishService } from './dish.service';
import { ExpenditureService } from './expenditure.service';
import { FixedAssetService } from './fixed-asset.service';
import { GeneralConfigurationService } from './general-configuration.service';
import { HallTypeService } from './hall-type.service';
import { HallService } from './hall.service';
import { HeadquarterService } from './headquarter.service';
import { IncomeTypeService } from './income-type.service';
import { MeasurementUnitService } from './measurement-unit.service';
import { PaymentMethodService } from './payment-method.service';
import { ProductTypeService } from './product-type.service';
import { SubCategoryService } from './sub-category.service';
import { TaxService } from './tax.service';
import { UbigeoService } from './ubigeo.service';
import { AdjustReasonService } from './adjust-reason.service';
import { AreaService } from './area.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalCallService {

  constructor(
    public account : AccountService,
    public AdjustReasonService : AdjustReasonService,
    public  AreaService : AreaService,
    public  TypeAttributeService : TypeAttributeService,
    public  BoxService : BoxService,
    public  CashMovementService : CashMovementService,
    public  CategoryService : CategoryService,
    public  CoinService : CoinService,
    public  ComboService : ComboService,
    public  DiscountService : DiscountService,
    public  DishCategoryService : DishCategoryService,
    public  DishService : DishService,
    public  ExpenditureService : ExpenditureService,
    public  FixedAssetService : FixedAssetService,
    public  GeneralConfigurationService : GeneralConfigurationService,
    public  HallTypeService : HallTypeService,
    public  HallService : HallService,
    public  HeadquarterService : HeadquarterService,
    public  IncomeTypeService : IncomeTypeService,
    public  MeasurementUnitService : MeasurementUnitService,
    public  PaymentMethodService : PaymentMethodService,
    public  ProductTypeService : ProductTypeService,
    public  SubCategoryService : SubCategoryService,
    public  TaxService : TaxService,
    public  UbigeoService : UbigeoService,
  ) { 
      this.account.getAccounts().subscribe(res=>{

      })
      this.AdjustReasonService.getAdjustmentReson().subscribe(res=>{

      })
      this.AreaService.getAreas().subscribe(res=>{

      })
      this.TypeAttributeService.getTypeAttributes().subscribe(res=>{

      })
      this.BoxService.getBoxes().subscribe(res=>{

      })
      this.CategoryService.getCategories().subscribe(res=>{

      })
      this.CoinService.getCoins().subscribe(res=>{

      })
      this.ComboService.getCombos().subscribe(res=>{

      })
      this.DiscountService.getDiscounts().subscribe(res=>{

      })
      this.DishCategoryService.getDishCategories().subscribe(res=>{

      })
      this.DishService.getDishes().subscribe(res=>{

      })
      this.ExpenditureService.getExpenditures().subscribe(res=>{

      })
      this.GeneralConfigurationService.getGeneralConfigurations().subscribe(res=>{

      })
      this.HallTypeService.getHallTypes().subscribe(res=>{

      })
      this.HallService.getHalls().subscribe(res=>{

      })
      this.HeadquarterService.getHeadquarters().subscribe(res=>{

      })
      this.IncomeTypeService.getIncomeTypes().subscribe(res=>{

      })
      this.MeasurementUnitService.getMeasurementUnits().subscribe(res=>{

      })
      this.PaymentMethodService.getPaymentMethods().subscribe(res=>{

      })
      this.ProductTypeService.getProductTypes().subscribe(res=>{

      })
      this.SubCategoryService.getSubCategories().subscribe(res=>{

      })
      this.TaxService.getTaxes().subscribe(res=>{

      })
      this.UbigeoService.getUbiGeos().subscribe(res=>{

      })
  }
}
