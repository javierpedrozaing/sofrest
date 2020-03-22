import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    providers {
      id
      business_name
      tradename
      address
      phone
      alternative_phone
      ruc
      email
      web
      observation
      credit_day
      state
      ubigeo{
        id
      }
      days{
        id
        day
      }
    }
  }`

  public getProviders(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getProvider(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        providers(client_id:${id}) {
          id
          business_name
          tradename
          address
          phone
          alternative_phone
          ruc
          email
          credit_day
          web
          observation
          state
          ubigeo{
            id
          }
          days{
            id
            day
          }
        }
      }`
    }).valueChanges
  }


  public createProvider(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createProvider(
        $business_name: String!,
        $tradename: String!,
         $ruc: String!,
         $phone: String!,
         $address: String,
         $observation: String,
         $email: String,
         $web: String,
         $state: Int!,
         $alternative_phone: String,
         $credit_day: Int
         $ubigeo_id: Int!, $day: [Int]) {
        createProvider(business_name: $business_name, tradename: $tradename, ruc: $ruc, phone: $phone, address: $address, observation: $observation, email: $email, web: $web, state: $state, alternative_phone: $alternative_phone, ubigeo_id : $ubigeo_id, credit_day : $credit_day, day : $day) {
          id
          business_name
          tradename
          address
          phone
          alternative_phone
          ruc
          credit_day
          email
          web
          observation
          state
          ubigeo{
            id
          }
          days{
            id
            day
          }
        }
      }`,
      variables:{
        business_name: data.business_name,
        tradename: data.tradename,
        address: data.address,
        phone: data.phone,
        alternative_phone: data.alternative_phone,
        ruc: data.ruc,
        email: data.email,
        web: data.web,
        day: data.day,
        observation: data.observation,
        state: data.state ? 1 :0,
        ubigeo_id: data.ubigeo_id,
        credit_day : data.credit_day
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateProvider(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateProvider($id:Int!,
        $business_name: String!,
        $tradename: String!, $ruc: String!, 
        $phone: String,
        $address: String, 
        $observation: String,
        $email: String, 
        $web: String, $state: Int!,
        $alternative_phone: String,
        $ubigeo_id: Int!,
        $day: [Int],
        $day_for_provider_id: [Int],
        $credit_day : Int
        $client_id: Int!
        ) {
        updateProvider(id:$id,
          business_name: $business_name, 
          tradename: $tradename, 
          ruc: $ruc, 
          phone: $phone, 
          address: $address, 
          observation: $observation, 
          email: $email, 
          web: $web, 
          state: $state, 
          alternative_phone: $alternative_phone,  
          ubigeo_id : $ubigeo_id, 
          day : $day,
          day_for_provider_id: $day_for_provider_id,
          credit_day : $credit_day
          client_id: $client_id
          ) {
          id
          business_name
          tradename
          address
          phone
          alternative_phone
          ruc
          credit_day
          email
          web
          observation
          state
          ubigeo{
            id
          }
          days{
            id
            day
          }
        }
      }`,
      variables:{
        id,
        business_name: data.business_name,
        tradename: data.tradename,
        address: data.address,
        phone: data.phone,
        alternative_phone: data.alternative_phone,
        ruc: data.ruc,
        email: data.email,
        web: data.web,
        observation: data.observation,
        state: data.state ? 1 :0,
        client_id: 1,
        ubigeo_id: data.ubigeo_id,
        user_update: 1,
        day: data.day,
        day_for_provider_id: data.day_for_provider_id,
        credit_day : data.credit_day
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteDayForProvider(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteDayForProvider($id:Int!) {
        deleteDayForProvider(id:$id) {
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

  public deleteProvider(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteProvider($id:Int!) {
        deleteProvider(id:$id) {
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

  public updateStateProvider(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateProvider($id:Int!,$state: Int!,) {
        updateStateProvider(id:$id,state: $state,) {
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
