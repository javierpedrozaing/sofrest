import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralConfigurationService {
  public globalQuery =  gql`query {
    general_configuration {
      id
      close_box
      clock_function
      open_ticket
      customer_display
      low_stock_notification
      negative_stock_alert
      time_zone
    }
  }`;

  constructor(private apollo: Apollo) { }


  public getGeneralConfigurations(): Observable<any>  {
    return this.apollo.watchQuery({
      query:this.globalQuery
    }).valueChanges
  }

  public getGeneralConfiguration(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        general_configuration(id:${id}) {
          id
          close_box
          clock_function
          open_ticket
          customer_display
          low_stock_notification
          negative_stock_alert
          time_zone
        }
      }`
    }).valueChanges
  }

  public createGeneralConfiguration(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createGeneralConfiguration(
          $close_box: Int
          $clock_function: Int
          $open_ticket: Int
          $customer_display: Int
          $low_stock_notification: Int
          $negative_stock_alert: Int
          $time_zone: String
          $client_id: Int!
          $user_creation: Int!
          $user_update: Int!
        ) {
        createGeneralConfiguration(
            close_box : $close_box,
            clock_function : $clock_function,
            open_ticket : $open_ticket,
            customer_display : $customer_display,
            low_stock_notification : $low_stock_notification,
            negative_stock_alert : $negative_stock_alert,
            time_zone : $time_zone,
            client_id : $client_id,
            user_creation : $user_creation,
            user_update : $user_update,
          ) {
            id
            close_box
            clock_function
            open_ticket
            customer_display
            low_stock_notification
            negative_stock_alert
            time_zone
        }
      }`,
      variables:{
        close_box : data.close_box ? 1 : 0,
        clock_function : data.clock_function ? 1 : 0,
        open_ticket : data.open_ticket ? 1 : 0,
        customer_display : data.customer_display ? 1 : 0,
        low_stock_notification : data.low_stock_notification ? 1 : 0,
        negative_stock_alert : data.negative_stock_alert ? 1 : 0,
        time_zone : data.time_zone,
        client_id : 1,
        user_creation : 1,
        user_update : 1,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateGeneralConfiguration(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateGeneralConfiguration(
        $id:Int!,
        $close_box: Int
        $clock_function: Int
        $open_ticket: Int
        $customer_display: Int
        $low_stock_notification: Int
        $negative_stock_alert: Int
        $time_zone: String
        ) {
        updateGeneralConfiguration(
          id:$id,
          close_box : $close_box,
          clock_function : $clock_function,
          open_ticket : $open_ticket,
          customer_display : $customer_display,
          low_stock_notification : $low_stock_notification,
          negative_stock_alert : $negative_stock_alert,
          time_zone : $time_zone,
          ) {
          id
          close_box
          clock_function
          open_ticket
          customer_display
          low_stock_notification
          negative_stock_alert
          time_zone
        }
      }`,
      variables:{
        id,
        close_box : data.close_box ? 1 : 0,
        clock_function : data.clock_function ? 1 : 0,
        open_ticket : data.open_ticket ? 1 : 0,
        customer_display : data.customer_display ? 1 : 0,
        low_stock_notification : data.low_stock_notification ? 1 : 0,
        negative_stock_alert : data.negative_stock_alert ? 1 : 0,
        time_zone : data.time_zone,
        client_id : 1,
        user_creation : 1,
        user_update : 1,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

}
