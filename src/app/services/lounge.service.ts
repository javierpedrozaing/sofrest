import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoungeService {

  public globalQuery : any = gql`query {
    lounge {
      id
      name
      observation
      table
      headquarter {
        id
        description
        code
      }
      state
    }
  }`;

  constructor(private apollo: Apollo) { }

  public getLounges(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getLounge(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public createLounge(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createLounge($name: String!,$observation: String!, $state: Int!,$table: Int!,$headquarter_id: Int!, $user_creation: Int!,$user_update: Int!) {
        createLounge(name: $name,observation: $observation, state: $state,table: $table, headquarter_id: $headquarter_id, user_creation: $user_creation, user_update: $user_update) {
          id
          name
          observation
          table
          headquarter {
            id
            description
            code
          }
          state
        }
      }`,
      variables:{
        name : data.name,
        observation:data.observation,
        state: data.state ? 1 : 0,
        table:data.table,
        headquarter_id:data.headquarter_id,
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

  public updateLounge(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateLounge($id:Int!,$name: String!,$observation: String!, $state: Int!,$table: Int!,$headquarter_id: Int!,$user_update: Int!) {
        updateLounge(id:$id,name: $name,observation: $observation, state: $state,table: $table, headquarter_id: $headquarter_id, user_update: $user_update) {
          id
          name
          observation
          table
          headquarter {
            id
            description
            code
          }
          state
        }
      }`,
      variables:{
        id,
        name : data.name,
        observation:data.observation,
        state: data.state ? 1 : 0,
        table:data.table,
        headquarter_id:data.headquarter_id,
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

  public deleteLounge(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteLounge($id:Int!) {
        deleteLounge(id:$id) {
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

  public updateStateLounge(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateLounge($id:Int!,$state: Int!, $user_update: Int!) {
        updateStateLounge(id:$id,state: $state,user_update: $user_update) {
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
