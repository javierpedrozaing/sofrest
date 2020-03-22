import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    purchase {
      id,
      serial_number
      correlative
      broadcast_date
      admission_date
      payment_schedule
      exchange_rate
      total
      isc
      igv
      state
      headquarter{
        id
      }
      warehouse{
        id
      }
      area{
        id
      }
      coin{
        id
      }
      provider{
        id
        business_name
      }
      voucher_type{
        id
      }
      income_type{
        id
        description
      }
    }
  }`;
  public getPurshases(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getPurshase(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        purchase(id:${id}) {
          id,
          serial_number
          correlative
          broadcast_date
          admission_date
          payment_schedule
          exchange_rate
          total
          isc
          igv
          state
          headquarter{
            id
          }
          warehouse{
            id
          }
          area{
            id
          }
          coin{
            id
          }
          provider{
            id
            business_name
          }
          voucher_type{
            id
          }
          income_type{
            id
            description
          }
        }
      }`
    }).valueChanges
  }
  
  public createPurchase(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createPurchase(
        $serial_number: String!
        $correlative: String!
        $broadcast_date: String!
        $admission_date: String!
        $payment_schedule: String!
        $exchange_rate: String!
        $total: String!
        $isc: String!
        $igv: String!
        $state: Int!
        $voucher_type_id: Int!
        $warehouse_id: Int!
        $area_id: Int!
        $income_type_id: Int!
        $coin_id: Int!
        $provider_id: Int!
        $quantity_detail: [String]
        $price_detail: [String]
        $igv_detail: [String]
        $isc_detail: [String]
        $product_id_detail: [Int]
      ) {
        createPurchase(
          serial_number : $serial_number
          correlative : $correlative
          broadcast_date : $broadcast_date
          admission_date : $admission_date
          payment_schedule : $payment_schedule
          exchange_rate : $exchange_rate
          total : $total
          isc : $isc
          igv : $igv
          state : $state
          voucher_type_id : $voucher_type_id
          warehouse_id : $warehouse_id
          area_id : $area_id
          income_type_id : $income_type_id
          coin_id : $coin_id
          provider_id : $provider_id
          quantity_detail : $quantity_detail
          price_detail : $price_detail
          igv_detail : $igv_detail
          isc_detail : $isc_detail
          product_id_detail : $product_id_detail
          ) {
            id,

        }
      }`,
      variables:{
        serial_number : data.serial_number,
        correlative : data.correlative,
        broadcast_date : data.broadcast_date,
        admission_date : data.admission_date,
        payment_schedule : data.payment_schedule,
        exchange_rate : data.exchange_rate,
        total : data.total,
        isc : data.isc,
        igv : data.igv,
        state : data.state,
        voucher_type_id : data.voucher_type_id,
        warehouse_id : data.warehouse_id,
        area_id : data.area_id,
        income_type_id : data.income_type_id,
        coin_id : data.coin_id,
        provider_id : data.provider_id,
        quantity_detail : data.quantity_detail,
        price_detail : data.price_detail,
        igv_detail : data.igv_detail,
        isc_detail : data.isc_detail,
        product_id_detail : data.product_id_detail,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updatePaymentMethod(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updatePaymentMethod(
        $id : Int!,
        serial_number: String!
        correlative: String!
        broadcast_date: String!
        admission_date: String!
        payment_schedule: String!
        exchange_rate: String!
        total: String!
        isc: String!
        igv: String!
        state: Int!
        voucher_type_id: Int!
        warehouse_id: Int!
        area_id: Int!
        income_type_id: Int!
        coin_id: Int!
        provider_id: Int!
        quantity_detail: [String]
        price_detail: [String]
        igv_detail: [String]
        isc_detail: [String]
        product_id_detail: [Int]
      ) {
        updatePaymentMethod(id:$id,
          serial_number : $serial_number
          correlative : $correlative
          broadcast_date : $broadcast_date
          admission_date : $admission_date
          payment_schedule : $payment_schedule
          exchange_rate : $exchange_rate
          total : $total
          isc : $isc
          igv : $igv
          state : $state
          voucher_type_id : $voucher_type_id
          warehouse_id : $warehouse_id
          area_id : $area_id
          income_type_id : $income_type_id
          coin_id : $coin_id
          provider_id : $provider_id
          quantity_detail : $quantity_detail
          price_detail : $price_detail
          igv_detail : $igv_detail
          isc_detail : $isc_detail
          product_id_detail : $product_id_detail
          ) {
            id,
        }
      }`,
      variables:{
        id,
        serial_number : data.serial_number,
        correlative : data.correlative,
        broadcast_date : data.broadcast_date,
        admission_date : data.admission_date,
        payment_schedule : data.payment_schedule,
        exchange_rate : data.exchange_rate,
        total : data.total,
        isc : data.isc,
        igv : data.igv,
        state : data.state,
        voucher_type_id : data.voucher_type_id,
        warehouse_id : data.warehouse_id,
        area_id : data.area_id,
        income_type_id : data.income_type_id,
        coin_id : data.coin_id,
        provider_id : data.provider_id,
        quantity_detail : data.quantity_detail,
        price_detail : data.price_detail,
        igv_detail : data.igv_detail,
        isc_detail : data.isc_detail,
        product_id_detail : data.product_id_detail,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

}
