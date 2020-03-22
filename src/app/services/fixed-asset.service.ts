import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FixedAssetService {
 
  public globalQuery =  gql`query {
    fixed_asset {
      id
      admission_date
      amount
      detail
      observation
      serial
      model {
        id
        description
      }
      state
      type_product{
        id
        description
      }
      brand{
        id
        description
      }
    }
  }`;

  constructor(private apollo: Apollo) { }


  public getFixedAssets(): Observable<any>  {
    return this.apollo.watchQuery({
      query:this.globalQuery
    }).valueChanges
  }

  public getFixedAsset(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        fixed_asset(id:${id}) {
          id
          admission_date
          amount
          detail
          observation
          serial
          model {
            id
            description
          }
          state
          type_product{
            id
            description
          }
          brand{
            id
            description
          }
        }
      }`
    }).valueChanges
  }

  public createFixedAsset(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createFixedAsset(
        $admission_date: String!, 
        $amount: String,
        $detail: String!,$observation: String,$serial: String,
        $model_id: Int!,$state: Int!,$type_product_id: Int!,$brand_id: Int!,
        ) {
        createFixedAsset(admission_date: $admission_date, amount: $amount, detail: $detail,observation: $observation,serial: $serial,model_id: $model_id,state: $state,type_product_id: $type_product_id,brand_id: $brand_id,) {
          id
          admission_date
          amount
          detail
          observation
          serial
          model {
            id
            description
          }
          state
          type_product{
            id
            description
          }
          brand{
            id
            description
          }
        }
      }`,
      variables:{
        admission_date: data.admission_date,
        amount: data.amount,
        detail: data.detail,
        observation: data.observation,
        serial: data.serial,
        model_id: data.model,
        state: data.state,
        type_product_id: data.type_product_id,
        brand_id: data.brand_id,
        user_creation: 1,
        user_update: 1,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateFixedAsset(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateFixedAsset($id:Int!,
        $admission_date: String!, 
        $amount: String,
        $detail: String!,
        $observation: String,
        $serial: String,
        $model_id: Int!,
        $state: Int!,
        $type_product_id: Int!,
        $brand_id: Int!) {
        updateFixedAsset(id:$id,admission_date: $admission_date, amount: $amount, detail: $detail,observation: $observation,serial: $serial,model_id: $model_id,state: $state,type_product_id: $type_product_id,brand_id: $brand_id,) {
          id
          admission_date
          amount
          detail
          observation
          serial
          model {
            id
            description
          }
          state
          type_product{
            id
            description
          }
          brand{
            id
            description
          }
        }
      }`,
      variables:{
        id,
        admission_date: data.admission_date,
        amount: data.amount,
        detail: data.detail,
        observation: data.observation,
        serial: data.serial,
        model_id: data.model,
        state: data.state,
        type_product_id: data.type_product_id,
        brand_id: data.brand_id,
        user_update: 1,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteFixedAsset(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteFixedAsset($id:Int!) {
        deleteFixedAsset(id:$id) {
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

  public updateStateFixedAsset(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateFixedAsset($id:Int!,$state: Int!) {
        updateStateFixedAsset(id:$id,state: $state) {
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
