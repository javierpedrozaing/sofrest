import { Injectable, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleDetailService {

  constructor(private apollo: Apollo) {}

  public getAll(): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query {
          sale_details {
            total
            quantity
            subtotal
          }
        }
      `
    }).valueChanges
  }

  public getById(id): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`query {
        sale_details(id:${id}) {
          id
          total
          quantity
          subtotal
        }
      }`
    }).valueChanges
  }

  public save(data): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation createSaleDetail(
          $quantity : String!
          $observation: String!
          $subtotal : String!
          $total : String!
          $unit_price : String!  
          $sale_id: Int!
          $dish_id: Int!
        ) {
          createSaleDetail(
            quantity : $quantity
            observation: $observation
            subtotal : $subtotal
            total : $total
            unit_price : $unit_price 
            sale_id: $sale_id
            dish_id: $dish_id
          ) {
            id
            total
            quantity
            subtotal
          }
        }
      `,
      variables: {
        quantity : data.quantity,
        observation: data.observation,
        subtotal : data.subtotal,
        total : data.total,
        unit_price : data.unit_price ,
        sale_id: data.sale_id,
        dish_id: data.dish_id,
        user_creation: 1,
        user_update: 1
      },
      refetchQueries: [
        {
          query: gql`
            query {
              sale_details {
                total
                quantity
                subtotal
              }
            }
          `
        }
      ]
    });
  }

  public update(id, data): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateSaleDetail(
          $id: Int!
          $quantity : String!
          $observation: String!
          $subtotal : String!
          $total : String!
          $unit_price : String!  
          $sale_id: Int!
          $dish_id: Int!
        ) {
          updateSaleDetail(
            id: $id
            quantity : $quantity
            observation: $observation
            subtotal : $subtotal
            total : $total
            unit_price : $unit_price 
            sale_id: $sale_id
            dish_id: $dish_id
          ) {
            id
            total
            quantity
            subtotal
          }
        }
      `,
      variables: {
        id,
        quantity : data.quantity,
        observation: data.observation,
        subtotal : data.subtotal,
        total : data.total,
        unit_price : data.unit_price ,
        sale_id: data.sale_id,
        dish_id: data.dish_id,
        user_update: 1
      },
      refetchQueries: [
        {
          query: gql`
            query {
              sale_details {
                total
                quantity
                subtotal
              }
            }
          `
        }
      ]
    });
  }

  public delete(id): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteSaleDetail($id: Int!) {
          deleteSaleDetail(id: $id) {
            id
          }
        }
      `,
      variables: {
        id
      },
      refetchQueries: [
        {
          query: gql`
            query {
              type_sales {
                id
              }
            }
          `
        }
      ]
    });
  }

  public updateState(data, id): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateSaleDetail($id: Int!, $state: Int!, ) {
          updateSaleDetail(id: $id, state: $state,) {
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
          query: gql`
            query {
              type_sales {
                id
              }
            }
          `
        }
      ]
    });
  }
}
