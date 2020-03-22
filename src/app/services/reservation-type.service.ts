import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReservationTypeService {

  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    reservation_types {
      id
      description
      state
    }
  }`;
  public getReservationTypes(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getReservationType(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        reservation_types(id:${id}) {
          id
          description
          state
        }
      }`
    }).valueChanges
  }

  public createReservationType(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createReservationType(
        $description: String!, 
        $state: Int!, 
      ) {
        createReservationType(
          description: $description, 
          state: $state, 
          ) {
          id
          description
          state
        }
      }`,
      variables:{
        description : data.description,
        state : data.state ? 1 : 0,
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

  public updateReservationType(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateReservationType(
        $id : Int!, $description: String!, $state: Int!,
      ) {
        updateReservationType(id:$id,description: $description, state: $state,) {
          id
          description
          state
        }
      }`,
      variables:{
        id,
        description : data.description,
        state : data.state ? 1 : 0,
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

  public deleteReservationType(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteReservationType($id:Int!,) {
        deleteReservationType(id:$id) {
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

  public updateStateReservationType(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateReservationType($id:Int!,$state: Int!) {
        updateStateReservationType(id:$id,state: $state,) {
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
