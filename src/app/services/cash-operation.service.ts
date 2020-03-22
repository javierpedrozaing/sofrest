import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CashOperationService {

  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    cash_operation {
      id
      description
      type_operation
      amount
    }
  }`;
  public getCashOperations(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getCashOperation(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        cash_operation(id:${id}) {
          id
          description
          type_operation
          amount
        }
      }`
    }).valueChanges
  }

  public createCashOperation(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createCashOperation(
        $description: String!
        $type_operation: Int!
        $amount: String!
        $user_creation: Int!
        $user_update: Int!
      ) {
        createCashOperation(
          description : $description,
          type_operation : $type_operation,
          amount : $amount,
          user_creation : $user_creation,
          user_update : $user_update,
          ) {
          id
          description
          type_operation
          amount
        }
      }`,
      variables:{
        description : data.description,
        type_operation : data.type_operation,
        amount : data.amount,
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

  public updateCashOperation(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateCashOperation(
        $id : Int!, 
        $description: String!
        $type_operation: Int!
        $amount: String!
        $user_update: Int!
      ) {
        updateCashOperation(
          id:$id
          description : $description,
          type_operation : $type_operation,
          amount : $amount,
          user_update : $user_update,
          ) {
            id
            description
            type_operation
            amount
        }
      }`,
      variables:{
        id,
        description : data.description,
        type_operation : data.type_operation,
        amount : data.amount,
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

  public deleteCashOperation(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteCashOperation($id:Int!,) {
        deleteCashOperation(id:$id) {
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
