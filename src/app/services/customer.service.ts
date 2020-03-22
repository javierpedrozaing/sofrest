import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public globalQuery =  gql`query {
    customers {
      id
      name
      document
      document_type {
        id
        description
      }
      phone
      address
      observation
      email
      web
      state
      ubigeo{
        id
        code
      }
    }
  }`;

  constructor(private apollo: Apollo) { }


  public getCustomers(): Observable<any>  {
    return this.apollo.watchQuery({
      query:this.globalQuery
    }).valueChanges
  }

  public getCustomer(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        customers(id:${id}) {
          id
          name
          document
          document_type {
            id
            description
          }
          phone
          address
          observation
          email
          web
          state
          ubigeo{
            id
            code
          }
        }
      }`
    }).valueChanges
  }

  public createCustomer(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createCustomer(
        $name: String!, 
        $document_type_id: Int!, 
        $document: String!, 
        $phone: String, 
        $address: String, 
        $observation: String, 
        $email: String, 
        $web: String,
         $state: Int!, 
        $ubigeo_id : Int!
         ) {
        createCustomer(name: $name, document_type_id: $document_type_id, document: $document, phone: $phone, address: $address, observation: $observation, email: $email, web: $web, state: $state, ubigeo_id : $ubigeo_id,) {
          id
          name
          document
          document_type {
            id
            description
          }
          phone
          address
          observation
          email
          web
          state
          ubigeo{
            id
            code
          }
        }
      }`,
      variables:{
        name: data.name,
        document: data.document,
        address: data.address,
        phone: data.phone,
        email: data.email,
        web: data.web,
        document_type_id: data.document_type_id,
        observation: data.observation,
        state: data.state ? 1 :0,
        client_id: 1,
        ubigeo_id: data.ubigeo_id,
        user_creation : 1,
        user_update: 1
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateCustomer(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateCustomer($id:Int!,
        $name: String!, 
        $document_type_id: Int!, 
        $document: String!, 
        $phone: String, 
        $address: String, 
        $observation: String, 
        $email: String, 
        $web: String,
        $state: Int!, 
        $ubigeo_id : Int!) {
        updateCustomer(id:$id,name: $name, document: $document, document_type_id: $document_type_id, phone: $phone, address: $address, observation: $observation, email: $email, web: $web, state: $state, ubigeo_id : $ubigeo_id, ) {
          id
          name
          document
          document_type {
            id
            description
          }
          phone
          address
          observation
          email
          web
          state
          ubigeo{
            id
            code
          }
        }
      }`,
      variables:{
        id,
        name: data.name,
        document: data.document,
        address: data.address,
        phone: data.phone,
        email: data.email,
        web: data.web,
        document_type_id: data.document_type_id,
        observation: data.observation,
        state: data.state ? 1 :0,
        client_id: 1,
        ubigeo_id: data.ubigeo_id,
        user_update: 1
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteCustomer(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteCustomer($id:Int!) {
        deleteCustomer(id:$id) {
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

  public updateStateCustomer(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateCustomer($id:Int!,$state: Int!,) {
        updateStateCustomer(id:$id,state: $state,) {
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
