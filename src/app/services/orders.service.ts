import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  public globalQuery =  gql`query {
    orders {
      id
      total
      subtotal
      igv
      tax
      observation
      waiting_for
      correlative
      serial_number
      state
      order_type
      headquarter{
        id
        description
      }
      provider{
        id
        business_name
      }
      headquarter_orgin{
        id
        description
      }
      headquarter_destination{
        id
        description
      }
    }
}`;

  constructor(private apollo: Apollo) { }

  
  public getOrders(): Observable<any>  {
    return this.apollo.watchQuery({
      query:this.globalQuery
    }).valueChanges
  }

  public getOrder(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        orders(id:${id}) {
          id
          total
          subtotal
          igv
          tax
          observation
          waiting_for
          correlative
          serial_number
          state
          order_type
          headquarter{
            id
            description
          }
          provider{
            id
            business_name
            tradename
            state
            days{
              id
              day
            }
          }
          headquarter_orgin{
            id
            description
          }
          headquarter_destination{
            id
            description
          }
          order_detail{
            id
            quantity
            subtotal
            total
            unit_price
            cost_price
            product{
              id
              name
            }
            measurement_unit{
              id
            }
          }
        }
      }`
    }).valueChanges
  }

  public getOrderByType(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        order_with_order_type(order_type:${id}) {
          id
          total
          subtotal
          igv
          tax
          
          observation
          waiting_for
          correlative
          serial_number
          state
          order_type
          headquarter{
            id
            description
          }
          provider{
            id
            business_name
          }
          headquarter_orgin{
            id
            description
          }
          headquarter_destination{
            id
            description
          }
        }
      }`
    }).valueChanges
  }
  
  public createOrder(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createOrder(
          $total: String!
          $subtotal: String!
          $igv: String!
          $tax: String!
          $observation: String!
          $waiting_for: String!
          $correlative: String!
          $serial_number: String!
          $hour: String!
          $state: Int!
          $order_type: Int!
          $user_id: Int!
          $headquarter_id: Int!
          $provider_id: Int!
          $headquarter_orgin_id: Int!
          $headquarter_destination_id: Int!
          $quantity_order_detail: [Int!]
          $subtotal_order_detail: [String]
          $total_order_detail: [String]
          $unit_price_order_detail: [String]
          $product_order_detail: [Int]
          $measurement_unit_order_detail: [Int]
          $cost_price_order_detail: [String]
      ) {
        createOrder(
          total: $total,
          subtotal: $subtotal,
          igv: $igv,
          tax: $tax,
          observation: $observation,
          waiting_for: $waiting_for,
          correlative: $correlative,
          serial_number: $serial_number,
          hour : $hour,
          state:  $state,
          order_type:  $order_type,
          user_id:  $user_id,
          headquarter_id:  $headquarter_id,
          provider_id:  $provider_id,
          headquarter_orgin_id:  $headquarter_orgin_id,
          headquarter_destination_id:  $headquarter_destination_id,
          quantity_order_detail:  $quantity_order_detail,
          subtotal_order_detail: $subtotal_order_detail,
          total_order_detail: $total_order_detail,
          unit_price_order_detail: $unit_price_order_detail,
          product_order_detail: $product_order_detail,
          measurement_unit_order_detail: $measurement_unit_order_detail,
          cost_price_order_detail: $cost_price_order_detail,
        ) {
          id
        }
      }`,
      variables:{
        total: data.total,
        subtotal: data.subtotal,
        igv: data.igv,
        tax: data.tax,
        observation: data.observation,
        waiting_for: data.waiting_for,
        correlative: data.correlative || 'null',
        serial_number: data.serial_number || 'null',
        state: data.state ? 1 :0,
        order_type: data.order_type || data.order_type,
        user_id: 1,
        hour : data.hour || '',
        headquarter_id: data.headquarter_id,
        provider_id: data.provider_id,
        headquarter_orgin_id: data.headquarter_orgin_id || data.headquarter_id,
        headquarter_destination_id: data.headquarter_destination_id || data.headquarter_id,
        user_creation: 1,
        user_update: 1,
        quantity_order_detail: data.quantity_order_detail || [],
        subtotal_order_detail: data.subtotal_order_detail || [],
        total_order_detail: data.total_order_detail || [],
        unit_price_order_detail: data.unit_price_order_detail || [],
        product_order_detail: data.product_order_detail || [],
        measurement_unit_order_detail: data.measurement_unit_order_detail || [],
        cost_price_order_detail: data.cost_price_order_detail || [],
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateOrder(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateOrder($id:Int!
        $total: String!
        $subtotal: String!
        $igv: String!
        $tax: String!
        $observation: String!
        $waiting_for: String!
        $correlative: String!
        $serial_number: String!
        $hour: String!
        $state: Int!
        $order_type: Int!
        $user_id: Int!
        $headquarter_id: Int!
        $provider_id: Int!
        $headquarter_orgin_id: Int!
        $headquarter_destination_id: Int!
        $quantity_order_detail: [Int!]
        $subtotal_order_detail: [String]
        $total_order_detail: [String]
        $unit_price_order_detail: [String]
        $product_order_detail: [Int]
        $measurement_unit_order_detail: [Int]
        $cost_price_order_detail: [String]
        $order_detail_id: [Int]
        ) {
        updateOrder(
          id:$id,
          total: $total,
          subtotal: $subtotal,
          igv: $igv,
          tax: $tax,
          observation: $observation,
          waiting_for: $waiting_for,
          correlative: $correlative,
          serial_number: $serial_number,
          hour : $hour,
          state:  $state,
          order_type:  $order_type,
          user_id:  $user_id,
          headquarter_id:  $headquarter_id,
          provider_id:  $provider_id,
          headquarter_orgin_id:  $headquarter_orgin_id,
          headquarter_destination_id:  $headquarter_destination_id,
          quantity_order_detail:  $quantity_order_detail,
          subtotal_order_detail: $subtotal_order_detail,
          total_order_detail: $total_order_detail,
          unit_price_order_detail: $unit_price_order_detail,
          product_order_detail: $product_order_detail,
          measurement_unit_order_detail: $measurement_unit_order_detail,
          cost_price_order_detail: $cost_price_order_detail,
          order_detail_id: $order_detail_id
          ) {
            id
        }
      }`,
      variables:{
        id,
        total: data.total,
        subtotal: data.subtotal,
        igv: data.igv,
        tax: data.tax,
        observation: data.observation,
        waiting_for: data.waiting_for,
        correlative: data.correlative || 'null',
        serial_number: data.serial_number || 'null',
        state: data.state ? 1 :0,
        order_type: data.order_type || data.order_type,
        user_id: 1,
        headquarter_id: data.headquarter_id,
        provider_id: data.provider_id,
        headquarter_orgin_id: data.headquarter_orgin_id || data.headquarter_id,
        headquarter_destination_id: data.headquarter_destination_id || data.headquarter_id,
        user_creation: 1,
        user_update: 1,
        hour : data.hour || '-',
        quantity_order_detail: data.quantity_order_detail || [],
        subtotal_order_detail: data.subtotal_order_detail || [],
        total_order_detail: data.total_order_detail || [],
        unit_price_order_detail: data.unit_price_order_detail || [],
        product_order_detail: data.product_order_detail || [],
        measurement_unit_order_detail: data.measurement_unit_order_detail || [],
        cost_price_order_detail: data.cost_price_order_detail || [],
        order_detail_id : data.order_detail_id || [],
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteOrder(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteOrder($id:Int!) {
        deleteOrder(id:$id) {
          id
        }
      }`,
      variables:{
        id,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateStateOrder(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateOrder($id:Int!,$state: Int!,) {
        updateStateOrder(id:$id,state: $state,) {
          id
        }
      }`,
      variables:{
        id,
        state: data.state ? 1 : 0,
        user_update: 1
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

}
