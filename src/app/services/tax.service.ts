import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaxService {


  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    taxes {
      id
      description
      amount
      state
      type
      type_application
    }
  }`;

  public getTaxes(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getTax(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        taxes(id:${id}) {
          id
          description
          amount
          state
          type
          type_application
          type_tax
          option
        }
      }`
    }).valueChanges
  }

  public createTax(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createTax(
        $description: String!,$amount: String!,
        $type_application: Int!,
        $type: Int!,
        $type_tax: Int!,
        $option: Int!,
        $state: Int!,
      ) {
        createTax(
          description: $description,
          amount: $amount,
          option: $option,
          type_application : $type_application,
          type : $type,
          type_tax: $type_tax,
          state: $state,
          ) {
          id
          amount
          option
          description
          state
          type
          type_application
        }
      }`,
      variables:{
        description : data.description,
        amount : data.amount,
        state : data.state ? 1 : 0,
        type: data.type,
        option: data.option,
        type_tax: data.type_tax,
        type_application: data.type_application,
        client_id : 1,
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

  public updateTax(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateTax(
        $id : Int!,
        $description: String!,$amount: String!,
        $type_application: Int!,
        $type: Int!,
        $type_tax: Int!,
        $option: Int!,
        $state: Int!,
      ) {
        updateTax(id:$id,description: $description, amount: $amount,
          option: $option,
          type_application : $type_application,
          type : $type,
          type_tax: $type_tax,
          state: $state) {
          id
          description
          state
          amount
          type
          type_application
        }
      }`,
      variables:{
        id,
        description : data.description,
        amount : data.amount,
        state : data.state ? 1 : 0,
        type: data.type,
        option: data.option,
        type_tax: data.type_tax,
        type_application: data.type_application,
        client_id:1,
        user_update:1
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteTax(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteTax($id:Int!,) {
        deleteTax(id:$id) {
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

  public updateStateTax(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateTax($id:Int!,$state: Int!,) {
        updateStateTax(id:$id,state: $state,) {
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
