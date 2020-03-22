import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    payment_methods {
      id,
      description,
      code,
      sunat_code,
      image,
      discount,
      state,
    }
  }`;
  public getPaymentMethods(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getPaymentMethod(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        payment_methods(id:${id}) {
          id,
          description,
          code,
          sunat_code,
          discount,
          image,
          state,
          discount,
        }
      }`
    }).valueChanges
  }
  
  public createPaymentMethod(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createPaymentMethod(
        $description: String!,
        $code: String,
        $sunat_code: String!,
        $image: String!,
        $discount: String!,
        $state: Int!,
      ) {
        createPaymentMethod(
          description : $description,
          code : $code,
          sunat_code : $sunat_code,
          image : $image,
          discount : $discount,
          state : $state,
          ) {
            id,
            description,
            code,
            sunat_code,
            image,
            discount,
            state,
        }
      }`,
      variables:{
        description: data.description,
        code: data.code,
        sunat_code: data.sunat_code,
        image: data.image,
        discount : data.discount,
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

  public updatePaymentMethod(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updatePaymentMethod(
        $id : Int!,
        $description: String!,
        $code: String,
        $sunat_code: String!,
        $image: String!,
        $discount: String!,
        $state: Int!,
      ) {
        updatePaymentMethod(id:$id,
          description : $description,
          code : $code,
          sunat_code : $sunat_code,
          image : $image,
          state : $state,
          discount : $discount,
          ) {
            id,
            description,
            code,
            sunat_code,
            discount,
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
        discount : data.discount,
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

  public deletePaymentMethod(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deletePaymentMethod($id:Int!,) {
        deletePaymentMethod(id:$id) {
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

  public updateStatePaymentMethod(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStatePaymentMethod($id:Int!,$state: Int!,) {
        updateStatePaymentMethod(id:$id,state: $state,) {
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
