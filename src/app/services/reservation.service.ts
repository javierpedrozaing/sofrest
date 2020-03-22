import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    reservation {
      id
      since
      until
      amount_pax
      reference
      observation
      registration_date
      state
      headquarter{
        id
        description
      }
      client{
        id
      }
      customer{
        id
      }
    }
  }`;
  public getReservations(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getReservation(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        reservation(id:${id}) {
          id
          since
          until
          amount_pax
          reference
          observation
          registration_date
          state
          headquarter{
            id
            description
          }
          client{
            id
          }
          customer{
            id
          }
        }
      }`
    }).valueChanges
  }

  public createReservation(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createReservation(
        $since: String!
        $until: String!
        $amount_pax: String!
        $reference: String!
        $observation: String!
        $registration_date: String!
        $state: Int!
        $headquarter_id: Int!
        $customer_id: Int!
      ) {
        createReservation(
          since : $since,
          until : $until,
          amount_pax : $amount_pax,
          reference : $reference,
          observation : $observation,
          registration_date : $registration_date,
          state : $state,
          headquarter_id : $headquarter_id,
          customer_id : $customer_id,
          ) {
            id
            since
            until
            amount_pax
            reference
            observation
            registration_date
            state
            headquarter{
              id
              description
            }
            client{
              id
            }
            customer{
              id
            }
        }
      }`,
      variables:{
        since: data.since,
        until: data.until,
        amount_pax: data.amount_pax,
        reference: data.reference || '',
        observation: data.observation,
        registration_date: data.registration_date,
        state: data.state ? 1 : 0,
        client_id: data.client_id || 1,
        customer_id : data.customer_id || 1,
        headquarter_id: data.headquarter_id,
        user_creation: data.user_creation || 1,
        user_update: data.user_update || 1,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateReservation(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateReservation(
        $id : Int!,
        $since: String!
        $until: String!
        $amount_pax: String!
        $reference: String!
        $observation: String!
        $registration_date: String!
        $state: Int!
        $headquarter_id: Int!
        $customer_id: Int!
      ) {
        updateReservation(id:$id,
          since : $since,
          until : $until,
          amount_pax : $amount_pax,
          reference : $reference,
          observation : $observation,
          registration_date : $registration_date,
          state : $state,
          headquarter_id : $headquarter_id,
          customer_id : $customer_id,
          ) {
            id
            since
            until
            amount_pax
            reference
            observation
            registration_date
            state
            headquarter{
              id
            }
            client{
              id
            }
            customer{
              id
            }
        }
      }`,
      variables:{
        id,
        since: data.since,
        until: data.until,
        amount_pax: data.amount_pax,
        reference: data.reference,
        observation: data.observation,
        registration_date: data.registration_date,
        state: data.state ? 1 : 0,
        client_id: data.client_id || 1,
        headquarter_id: data.headquarter_id,
        customer_id : data.customer_id || 1,
        user_update: data.user_update || 1,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteReservation(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteReservation($id:Int!,) {
        deleteReservation(id:$id) {
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

  public updateStateReservation(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateReservation($id:Int!,$state: Int!) {
        updateStateReservation(id:$id,state: $state,) {
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
