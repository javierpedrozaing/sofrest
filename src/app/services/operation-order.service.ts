import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationOrderService {

  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    operation_orders {
      id
      description
      state
    }
  }`;
  public getOperationOrders(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getOperationOrder(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        operation_orders(id:${id}) {
          id
          description
          state
        }
      }`
    }).valueChanges
  }

  public createOperationOrder(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createOperationOrder(
        $description: String!, $state: Int!,
      ) {
        createOperationOrder(description: $description, state: $state, ) {
          id
          description
          state
        }
      }`,
      variables:{
        description : data.description,
        state : data.state ? 1 : 0,
        user_creation:1,
        user_update:1
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateOperationOrder(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateOperationOrder(
        $id : Int!, $description: String!, $state: Int!, 
      ) {
        updateOperationOrder(id:$id,description: $description, state: $state) {
          id
          description
          state
        }
      }`,
      variables:{
        id,
        description : data.description,
        state : data.state ? 1 : 0,
        user_creation:1,
        user_update:1
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteOperationOrder(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteOperationOrder($id:Int!,) {
        deleteOperationOrder(id:$id) {
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

  public updateStateOperationOrder(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateOperationOrder($id:Int!,$state: Int!,) {
        updateStateOperationOrder(id:$id,state: $state,) {
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
