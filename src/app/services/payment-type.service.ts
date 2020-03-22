import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService {
  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    payment_types {
      id,
      description,
      code,
      sunat_code,
      image,
      state,
    }
  }`;
  public getPaymentTypes(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getPaymentType(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        payment_types(id:${id}) {
          id,
          description,
          code,
          sunat_code,
          image,
          state,
        }
      }`
    }).valueChanges
  }
  public createPaymentType(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createPaymentType(
        $description: String!,
        $code: String!,
        $sunat_code: String!,
        $image: String!,
        $state: Int!,
        $client_id: Int!,
        $user_creation: Int!,
        $user_update: Int!,
      ) {
        createPaymentType(
          description : $description,
          code : $code,
          sunat_code : $sunat_code,
          image : $image,
          state : $state,
          client_id : $client_id,
          user_creation : $user_creation,
          user_update : $user_update,
          ) {
            id,
            description,
            code,
            sunat_code,
            image,
            state,
        }
      }`,
      variables:{
        description: data.description,
        code: data.code,
        sunat_code: data.sunat_code,
        image: data.image,
        state : data.state ? 1 :0,
        client_id :1,
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

  public updatePaymentType(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updatePaymentType(
        $id : Int!,
        $description: String!,
        $code: String!,
        $sunat_code: String!,
        $image: String!,
        $state: Int!,
        $client_id: Int!,
        $user_update: Int!,
      ) {
        updatePaymentType(id:$id,
          description : $description,
          code : $code,
          sunat_code : $sunat_code,
          image : $image,
          state : $state,
          client_id : $client_id,
          user_update : $user_update,
          ) {
            id,
            description,
            code,
            sunat_code,
            image,
            state,
        }
      }`,
      variables:{
        id,
        description: data.description,
        code: data.code,
        sunat_code: data.sunat_code,
        image: data.image,
        state : data.state ? 1 :0,
        client_id :1,
        user_update:1
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deletePaymentType(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deletePaymentType($id:Int!,) {
        deletePaymentType(id:$id) {
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

  public updateStatePaymentType(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStatePaymentType($id:Int!,$state: Int!, $user_update: Int!) {
        updateStatePaymentType(id:$id,state: $state,user_update: $user_update) {
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
