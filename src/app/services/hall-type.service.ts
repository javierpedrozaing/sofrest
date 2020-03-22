import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HallTypeService {
  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    hall_types {
      id
      description
      state
    }
  }`;
  public getHallTypes(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getHallType(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        hall_types(id:${id}) {
          id
          description
          state
        }
      }`
    }).valueChanges
  }

  public createHallType(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createHallType(
        $description: String!, $state: Int!,
      ) {
        createHallType(description: $description, state: $state,) {
          id
          description
          state
        }
      }`,
      variables:{
        description : data.description,
        state : data.state ? 1 : 0,
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

  public updateHallType(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateHallType(
        $id : Int!, $description: String!, $state: Int!,
      ) {
        updateHallType(id:$id,description: $description, state: $state, ) {
          id
          description
          state
        }
      }`,
      variables:{
        id,
        description : data.description,
        state : data.state ? 1 : 0,
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

  public deleteHallType(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteHallType($id:Int!,) {
        deleteHallType(id:$id) {
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

  public updateStateHallType(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateHallType($id:Int!,$state: Int!,) {
        updateStateHallType(id:$id,state: $state,) {
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
