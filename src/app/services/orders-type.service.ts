import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersTypeService {

  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    order_types {
      id
      description
      state
      code
    }
  }`;
  
  public getOrderTypes(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getOrderType(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        order_types(client_id:${id}) {
          id
          description
          state
          code
        }
      }`
    }).valueChanges
  }

  public createOrderType(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createOrderType(
        $description: String!
        $code: String
        $state: Int!
      ) {
        createOrderType(
          description: $description,
          code: $code,
          state: $state,
        ) {
          id
          description
          state
          code
        }
      }`,
      variables:{
        description : data.description,
        state : data.state ? 1 : 0,
        code : data.code,
        client_id : 1,
        operation_order_id : data.operation_order_id,
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

  public updateOrderType(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateOrderType(
        $id : Int!
        $description: String!
        $code: String
        $state: Int!
      ) {
        updateOrderType(
          id:$id,
          description: $description,
          code: $code,
          state: $state,
        ) {
          id
          description
          state
          code
        }
      }`,
      variables:{
        id,
        description : data.description,
        state : data.state ? 1 : 0,
        code : data.code,
        client_id : 1,
        operation_order_id : data.operation_order_id,
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

  public deleteOrderType(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteOrderType($id:Int!,) {
        deleteOrderType(id:$id) {
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

  public updateStateOrderType(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateOrderType($id:Int!,$state: Int!) {
        updateStateOrderType(id:$id,state: $state,) {
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
