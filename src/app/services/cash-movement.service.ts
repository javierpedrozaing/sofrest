import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CashMovementService {

  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    cash_movement {
      id
      amount
      box
      headquarter{
        id
      }
    }
  }`;
  public getCashMovements(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getCashMovement(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        cash_movement(id:${id}) {
          id
          amount
          box
          headquarter{
            id
          }
        }
      }`
    }).valueChanges
  }

  public createCashMovement(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createCashMovement(
          $amount: String!
          $box_id: Int!
          $headquarter_id: Int!
      ) {
        createCashMovement(
          amount : $amount,
          box_id : $box_id,
          headquarter_id : $headquarter_id,
          ) {
          id
          description
          state
        }
      }`,
      variables:{
        amount : data.amount,
        box_id : data.box_id,
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

  public updateCashMovement(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateCashMovement(
        $id : Int!, 
        $amount: String!
        $box_id: Int!
        $headquarter_id: Int!
      ) {
        updateCashMovement(
          id:$id
          amount : $amount,
          box_id : $box_id,
          headquarter_id : $headquarter_id,
          ) {
          id
          description
          state
        }
      }`,
      variables:{
        id,
        amount : data.amount,
        box_id : data.box_id,
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

  public deleteCashMovement(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteCashMovement($id:Int!,) {
        deleteCashMovement(id:$id) {
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
