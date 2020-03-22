import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  public globalQuery =  gql`query {
    box {
      id
      description
      ip
      serial_number
      observation
      state
      opening_state
      exchange_rate
      coin {
        id
        description
      }
    }
  }`;

  constructor(private apollo: Apollo) { }


  public getBoxes(): Observable<any>  {
    return this.apollo.watchQuery({
      query:this.globalQuery
    }).valueChanges
  }

  public assignedBox(): Observable<any>  {
    return this.apollo.watchQuery({
      query:gql`query {
        assigned_box {
          id
          description
          ip
          serial_number
          observation
          state
          opening_state
          exchange_rate
          coin{
            id
            description
          }
        }
      }`
    }).valueChanges
  }

  public getBox(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        box(id:${id}) {
          id
          description
          ip
          serial_number
          observation
          state
          coin {
            id
            description
          }
          exchange_rate
        }
      }`
    }).valueChanges
  }

  public createBox(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createBox(
        $description: String!,
        $ip: String,
        $serial_number: String!,
        $observation: String!,
        $state: Int!,
        $coin_id: Int
        ) {
        createBox(
          description: $description,
          ip: $ip,
          serial_number: $serial_number,
          observation: $observation,
          state: $state,
          coin_id: $coin_id,
          ) {
            id
            description
            ip
            serial_number
            observation
            state
            coin{
              id
            }
          }
      }`,
      variables:{
        description : data.description,
        ip : data.ip,
        serial_number : data.serial_number,
        observation : data.observation,
        state : data.state,
        coin_id: data.coin_id,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateBox(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateBox(
        $id : Int!,
        $description: String!,
        $ip: String,
        $serial_number: String!,
        $observation: String!,
        $state: Int!,
        $coin_id: Int
        )
        {
          updateBox(
          id: $id,
          description: $description,
          ip: $ip,
          serial_number: $serial_number,
          observation: $observation,
          state: $state,
          coin_id: $coin_id
          ) {
            id
            description
            ip
            serial_number
            observation
            state
            coin{
              id
            }
          }
      }`,
      variables:{
        id,
        description : data.description,
        ip : data.ip,
        serial_number : data.serial_number,
        observation : data.observation,
        state : data.state,
        headquarter_id : data.headquarter_id,
        user_update: 1,
        opening: 0,
        closing: 0,
        opening_state: 0,
        user_opening: 0,
        user_closing: 0,
        coin_id: data.coin_id,
        exchange_rate: data.exchange_rate
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteBox(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteBox($id:Int!) {
        deleteBox(id:$id) {
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

  public updateStateBox(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateBox($id:Int!,$state: Int!, ) {
        updateStateBox(id:$id,state: $state,) {
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

  public openBox(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation openBox(
        $description: String
        $box_id: Int!
        $amount_open: String!
        $exchange_rate: Int
        ) {
        openBox(
         description:$description,
        box_id:$box_id,
        amount_open:$amount_open,
        exchange_rate:$exchange_rate
          ) {
            id
          }
      }`,
      variables:{
        description: data.description,
        box_id: data.box_id,
        amount_open: data.amount_open,
        exchange_rate: data.exchange_rate
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public closeBox(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation closeBox(
        $description: String
        $box_id: Int!
        $amount_closing: String!
        $exchange_rate: Int
        ) {
        closeBox(
         description:$description,
        box_id:$box_id,
        amount_closing:$amount_closing,
        exchange_rate:$exchange_rate
          ) {
            id
          }
      }`,
      variables:{
        description: data.description,
        box_id: data.box_id,
        amount_closing: data.amount_close,
        exchange_rate: data.exchange_rate
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }
}
