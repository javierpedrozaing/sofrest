import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockAdjustmentService {

  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    stock_adjustment {
      id
      observation
      date_generated
      adjustment_reason{
        id
      }
      headquarter{
        id
      }
    }
  }`;
  public getStockAdjustments(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getStockAdjustment(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        stock_adjustment(id:${id}) {
          id
          observation
          date_generated
          adjustment_reason{
            id
          }
          headquarter{
            id
          }
        }
      }`
    }).valueChanges
  }

  public createStockAdjustment(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createStockAdjustment(
          $observation: String!
          $date_generated: String!
          $adjustment_reason_id: Int!
          $headquarter_id: Int!
      ) {
        createStockAdjustment(
          observation: $observation
          date_generated: $date_generated
          adjustment_reason_id: $adjustment_reason_id
          headquarter_id: $headquarter_id
        ) {
          id
          observation
          date_generated
          adjustment_reason{
            id
          }
          headquarter{
            id
          }
        }
      }`,
      variables:{
        observation : data.observation,
        date_generated : data.date_generated,
        adjustment_reason_id : data.adjustment_reason_id,
        headquarter_id : data.headquarter_id,
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

  public updateStockAdjustment(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStockAdjustment(
        $id : Int!
        $observation: String!
        $date_generated: String!
        $adjustment_reason_id: Int!
        $headquarter_id: Int!
      ) {
        updateStockAdjustment(id:$id,
          observation: $observation
          date_generated: $date_generated
          adjustment_reason_id: $adjustment_reason_id
          headquarter_id: $headquarter_id
          ) {
            id
            observation
            date_generated
            adjustment_reason{
              id
            }
            headquarter{
              id
            }
        }
      }`,
      variables:{
        id,
        observation : data.observation,
        date_generated : data.date_generated,
        adjustment_reason_id : data.adjustment_reason_id,
        headquarter_id : data.headquarter_id,
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

  public deleteStockAdjustment(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteStockAdjustment($id:Int!,) {
        deleteStockAdjustment(id:$id) {
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

  public deleteStockAdjustmentDetail(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteStockAdjustmentDetail($id:Int!,) {
        deleteStockAdjustmentDetail(id:$id) {
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

}
