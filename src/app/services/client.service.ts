import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public globalQuery =  gql`query {
    clients {
      id
      business_name
      tradename
      ruc
      phone
      address
      observation
      email
      web
      invoice_size
      ballot_size
      consumer_recharge
      price_type
      plastic_bag_tax
      consumption_surcharge_amount
      plastic_bag_tax_amount
      state
      plan{
        id
        name
      }
    }
  }`;

  constructor(private apollo: Apollo) { }

  
  public getClients(): Observable<any>  {
    return this.apollo.watchQuery({
      query:this.globalQuery
    }).valueChanges
  }

  public getClient(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        clients(id:${id}) {
          id
          business_name
          tradename
          ruc
          phone
          address
          observation
          email
          web
          invoice_size
          ballot_size
          consumer_recharge
          price_type
          plastic_bag_tax
          consumption_surcharge_amount
          plastic_bag_tax_amount
          state
          plan{
            id
            name
          }
        }
      }`
    }).valueChanges
  }
  
  public createClient(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createClient(
        $business_name: String!
        $tradename: String!
        $ruc: String!
        $phone: String!
        $address: String!
        $observation: String!
        $email: String!
        $web: String!
        $state: Int!
        $invoice_size: Int
        $ballot_size: Int
        $consumer_recharge: Int
        $price_type: Int
        $plastic_bag_tax: Int
        $consumption_surcharge_amount: String
        $plastic_bag_tax_amount: String
        $logo: String
        $plan_id: Int!
        ) {
        createClient(
          business_name : $business_name
          tradename : $tradename
          ruc : $ruc
          phone : $phone
          address : $address
          observation : $observation
          email : $email
          web : $web
          state : $state
          invoice_size : $invoice_size
          ballot_size : $ballot_size
          consumer_recharge : $consumer_recharge
          price_type : $price_type
          plastic_bag_tax : $plastic_bag_tax
          consumption_surcharge_amount : $consumption_surcharge_amount
          plastic_bag_tax_amount : $plastic_bag_tax_amount
          logo : $logo
          plan_id : $plan_id
          ) {
            id
            business_name
            tradename
            ruc
            phone
            address
            observation
            email
            web
            invoice_size
            ballot_size
            consumer_recharge
            price_type
            plastic_bag_tax
            consumption_surcharge_amount
            plastic_bag_tax_amount
            state
            plan{
              id
              name
            }
          }
      }`,
      variables:{
        business_name : data.business_name,
        tradename : data.tradename,
        ruc : data.ruc,
        phone : data.phone,
        address : data.address,
        observation : data.observation,
        email : data.email,
        web : data.web,
        invoice_size : data.invoice_size,
        ballot_size : data.ballot_size,
        consumer_recharge : data.consumer_recharge? 1 : 0,
        price_type : data.price_type ? 1 : 0,
        plastic_bag_tax : data.plastic_bag_tax? 1 : 0,
        consumption_surcharge_amount : data.consumption_surcharge_amount,
        plastic_bag_tax_amount : data.plastic_bag_tax_amount,
        logo : data.logo,
        state : data.state ? 1 : 0,
        plan_id : data.plan_id,
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

  public updateClient(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateClient(
        $business_name: String!
        $tradename: String!
        $ruc: String!
        $phone: String!
        $address: String!
        $observation: String!
        $email: String!
        $web: String!
        $invoice_size: Int
        $ballot_size: Int
        $consumer_recharge: Int
        $price_type: Int
        $plastic_bag_tax: Int
        $consumption_surcharge_amount: String
        $plastic_bag_tax_amount: String
        $logo: String
        $state: Int!
        $plan_id: Int!
        ) 
        {
          updateClient(
          business_name : $business_name,
          tradename : $tradename,
          ruc : $ruc,
          phone : $phone,
          address : $address,
          observation : $observation,
          email : $email,
          web : $web,
          invoice_size : $invoice_size,
          ballot_size : $ballot_size,
          consumer_recharge : $consumer_recharge,
          price_type : $price_type,
          plastic_bag_tax : $plastic_bag_tax,
          consumption_surcharge_amount : $consumption_surcharge_amount,
          plastic_bag_tax_amount : $plastic_bag_tax_amount,
          logo : $logo,
          state : $state,
          plan_id : $plan_id,
          ) {
            id
            business_name
            tradename
            ruc
            phone
            address
            observation
            email
            web
            invoice_size
            ballot_size
            consumer_recharge
            price_type
            plastic_bag_tax
            consumption_surcharge_amount
            plastic_bag_tax_amount
            state
            plan{
              id
              name
            }
          }
      }`,
      variables:{
        business_name : data.business_name,
        tradename : data.tradename,
        ruc : data.ruc,
        phone : data.phone,
        address : data.address,
        observation : data.observation,
        email : data.email,
        web : data.web,
        invoice_size : data.invoice_size,
        ballot_size : data.ballot_size,
        consumer_recharge : data.consumer_recharge? 1 : 0,
        price_type : data.price_type ? 1 : 0,
        plastic_bag_tax : data.plastic_bag_tax? 1 : 0,
        consumption_surcharge_amount : data.consumption_surcharge_amount,
        plastic_bag_tax_amount : data.plastic_bag_tax_amount,
        logo : data.logo,
        state : data.state ? 1 : 0,
        plan_id : data.plan_id,
        user_update : 1,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteClient(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteClient($id:Int!) {
        deleteClient(id:$id) {
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

  public updateStateClient(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateClient($id:Int!,$state: Int!, $user_update: Int!) {
        updateStateClient(id:$id,state: $state,user_update: $user_update) {
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
