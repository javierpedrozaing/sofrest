import { Injectable, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  static ngInjectableDef = undefined;

  public globalQuery: any = gql`
  query {
    sales{
      id
      total
      subtotal
      igv
      tax
      customer {
        id
        name
      }
      reference
      observation
      date_send_sunat
      state
    }
  }
`;
  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) { }

  getClientByDNI(doc: any): Observable<any> {
    return this.http.get<any>('https://emma.rodmensoft.com/consultByDni/' + doc).pipe();
  }

  getClientByRUC(doc: any): Observable<any> {
    return this.http.get<any>('https://emma.rodmensoft.com/consultByRuc/' + doc).pipe();
  }

  public getAll(): Observable<any> {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public createSale(data): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation createSale(
          $total: String!
          $subtotal: String!
          $igv: String!
          $tax: String!
          $reference: String!
          $observation: String!
          $date_send_sunat: String!
          $mailing_status: String!
          $administrative_payment: Int
          $total_discount: String!
          $ticket_number: String!
          $tip: String
          $type_order: Int!
          $state: Int!
          $consumer_recharge: String
          $exchange_rate: String
          $bill_type: String
          $serial_number: String!
          $correlative: String!
          $exonerated: String!
          $unaffected: String!
          $state_sunat: Int!
          $voucher_type_id: Int!
          $operation_type_id: Int!
          $headquarter_id: Int!
          $customer_id: Int!
          $type_sale_id: Int!
          $account_id: Int!
          $coin_id: Int!
          $sunat_state_id: Int!
          $user_creation: Int!
          $user_update: Int!
          $quantity_sale_detail: [Int]
          $subtotal_sale_detail: [String]
          $total_sale_detail: [String]
          $unit_price_sale_detail: [String]
          $dish_id_sale_detail: [Int]
          $amount_sale_discount: [String]
          $authorized_by_sale_discount: [Int]
          $discount_id_sale_discount: [Int]
          $amount_sale_payment: [String]
          $payment_method_id_sale_payment: [Int]
          $coin_id_sale_payment: [Int]
          $product_id_sale_product: [Int]
          $quantity_sale_product: [Int]
          $subtotal_sale_product: [String]
          $total_sale_product: [String]
          $unit_price_sale_product: [String]
          $igv_sale_product: [String]
          $percentage_sale_product: [String]
        ) {
          createSale(
            total : $total,
            subtotal : $subtotal,
            igv : $igv,
            tax : $tax,
            reference : $reference,
            observation : $observation,
            date_send_sunat : $date_send_sunat,
            mailing_status : $mailing_status,
            administrative_payment : $administrative_payment,
            total_discount : $total_discount,
            ticket_number : $ticket_number,
            tip : $tip,
            type_order : $type_order,
            state : $state,
            consumer_recharge : $consumer_recharge,
            exchange_rate : $exchange_rate,
            bill_type : $bill_type,
            serial_number : $serial_number,
            correlative : $correlative,
            exonerated : $exonerated,
            unaffected : $unaffected,
            state_sunat : $state_sunat,
            voucher_type_id : $voucher_type_id,
            operation_type_id : $operation_type_id,
            headquarter_id : $headquarter_id,
            customer_id : $customer_id,
            type_sale_id : $type_sale_id,
            account_id : $account_id,
            coin_id : $coin_id,
            sunat_state_id : $sunat_state_id,
            user_creation : $user_creation,
            user_update : $user_update,
            quantity_sale_detail : $quantity_sale_detail,
            subtotal_sale_detail : $subtotal_sale_detail,
            total_sale_detail : $total_sale_detail,
            unit_price_sale_detail : $unit_price_sale_detail,
            dish_id_sale_detail : $dish_id_sale_detail,
            amount_sale_discount : $amount_sale_discount,
            authorized_by_sale_discount : $authorized_by_sale_discount,
            discount_id_sale_discount : $discount_id_sale_discount,
            amount_sale_payment : $amount_sale_payment,
            payment_method_id_sale_payment : $payment_method_id_sale_payment,
            coin_id_sale_payment : $coin_id_sale_payment,
            product_id_sale_product : $product_id_sale_product,
            quantity_sale_product : $quantity_sale_product,
            subtotal_sale_product : $subtotal_sale_product,
            total_sale_product : $total_sale_product,
            unit_price_sale_product : $unit_price_sale_product,
            igv_sale_product : $igv_sale_product,
            percentage_sale_product : $percentage_sale_product,
          ) {
            id
          }
        }
      `,
      variables: {
        total: data.total,
        subtotal: data.subtotal,
        igv: data.igv,
        tax: "0",
        correlative: '123456',
        bill_type: "1",
        consumer_recharge: "0",
        unaffected: data.unaffected,
        exchange_rate: data.exchange_rate,
        serial_number: data.serial_number,
        voucher_type_id: data.voucher_type_id,
        exonerated: data.exonerated,
        reference: data.reference,
        date_send_sunat: data.date_send_sunat,
        mailing_status: this.formatDate(new Date()),
        total_discount: "0",
        state_sunat: 1,
        ticket_number: "123456",
        tip: data.tip,
        observation: "test",
        operation_type_id: 1,
        administrative_payment: 0,
        type_order: 1,
        headquarter_id: 1,
        customer_id: data.customer_id,
        type_sale_id: 1,
        account_id: 1,
        coin_id: data.coin_id,
        sunat_state_id: 1,
        state: data.state ? 1 : 0,
        user_creation: 1,
        user_update: 1,
        quantity_sale_detail: data.quantity_sale_detail ? data.quantity_sale_detail : [],
        subtotal_sale_detail: data.subtotal_sale_detail ? data.subtotal_sale_detail : [],
        total_sale_detail: data.total_sale_detail ? data.total_sale_detail : [],
        unit_price_sale_detail: data.unit_price_sale_detail ? data.unit_price_sale_detail : [],
        dish_id_sale_detail: data.dish_id_sale_detail ? data.dish_id_sale_detail : [],
        amount_sale_discount: data.amount_sale_discount ? data.amount_sale_discount : [],
        authorized_by_sale_discount: data.authorized_by_sale_discount ? data.authorized_by_sale_discount : [],
        discount_id_sale_discount: data.discount_id_sale_discount ? data.discount_id_sale_discount : [],
        amount_sale_payment: data.amount_sale_payment ? data.amount_sale_payment : [],
        payment_method_id_sale_payment: data.payment_method_id_sale_payment ? data.payment_method_id_sale_payment : [],
        coin_id_sale_payment: data.coin_id_sale_payment ? data.coin_id_sale_payment : [],
        product_id_sale_product: data.product_id_sale_product ? data.product_id_sale_product : [],
        quantity_sale_product: data.quantity_sale_product ? data.quantity_sale_product : [],
        subtotal_sale_product: data.subtotal_sale_product ? data.subtotal_sale_product : [],
        total_sale_product: data.total_sale_product ? data.total_sale_product : [],
        unit_price_sale_product: data.unit_price_sale_product ? data.unit_price_sale_product : [],
        igv_sale_product: data.igv_sale_product ? data.igv_sale_product : [],
        percentage_sale_product: data.percentage_sale_product ? data.percentage_sale_product : [],
      },
      refetchQueries: [
        {
          query:this.globalQuery
        }
      ]
    });
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  public UpdateSale(data): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateSale(
          $id: Int!
          $subtotal : String!
          $total : String!
          $igv : String!
          $tax : String!
          $reference : String!
          $date_send_sunat : String!
          $mailing_status : String!
          $ticket_number : String!
          $total_discount : String!
          $tip : String!
          $observation: String!,
          $state: Int!,
          $administrative_payment: Int!,
          $type_order: Int!,
          $headquarter_id: Int!,
          $customer_id: Int!,
          $type_sale_id: Int!,
          $account_id: Int!,
          $coin_id: Int!,
          $sunat_state_id: Int!,
          $user_update: Int!
        ) {
          updateSale(
            id : $id
            total: $total,
            subtotal: $subtotal,
            igv: $igv,
            tax: $tax,
            reference: $reference,
            date_send_sunat: $date_send_sunat,
            mailing_status: $mailing_status,
            total_discount: $total_discount,
            ticket_number: $ticket_number,
            tip: $tip,
            observation: $observation,
            state: $state,
            administrative_payment: $administrative_payment,
            type_order: $type_order,
            headquarter_id: $headquarter_id,
            customer_id: $customer_id,
            type_sale_id: $type_sale_id,
            account_id: $account_id,
            coin_id: $coin_id,
            sunat_state_id: $sunat_state_id,
            user_update: $user_update
          ) {
            id
            total
            state
            subtotal
          }
        }
      `,
      variables: {
        id: data.id,
        total: data.total,
        subtotal: data.subtotal,
        igv: data.igv,
        tax: data.tax,
        reference: data.reference,
        date_send_sunat: data.date_send_sunat,
        mailing_status: data.mailing_status,
        total_discount: data.total_discount,
        ticket_number: data.ticket_number,
        tip: data.tip,
        observation: data.observation,
        administrative_payment: data.administrative_payment,
        type_order: data.type_order,
        headquarter_id: data.headquarter_id,
        customer_id: data.customer_id,
        type_sale_id: data.type_sale_id,
        account_id: data.account_id,
        coin_id: data.coin_id,
        sunat_state_id: data.sunat_state_id,
        state: data.state ? 1 : 0,
        user_update: 1
      },
      refetchQueries: [
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public delete(id): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteSale($id: Int!) {
          deleteSale(id: $id) {
            id
          }
        }
      `,
      variables: {
        id
      },
      refetchQueries: [
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateState(data, id): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateStateSale($id: Int!, $state: Int!, $user_update: Int!) {
          updateStateSale(id: $id, state: $state, user_update: $user_update) {
            id
          }
        }
      `,
      variables: {
        id,
        state: data.state ? 1 : 0,
        user_update: 1
      },
      refetchQueries: [
        {
          query: this.globalQuery
        }
      ]
    });
  }
}
