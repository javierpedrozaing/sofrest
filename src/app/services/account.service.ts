import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private apollo: Apollo) { }
  public globalQuery : any = gql`query {
    accounts {
      id
      description
      observation
    }
  }`;

  public getAccounts(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery,
    }).valueChanges
  }

  public getAccount(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        accounts(id:${id}) {
          id
          description
          observation
        }
      }`
    }).valueChanges
  }

  public createAccount(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createAccount(
        $description: String!,
        $observation: String!,
        
      ) {
        createAccount(description: $description, observation: $observation, ) {
          id
          description
          observation
        }
      }`,
      variables:{
        description : data.description,
        observation : data.observation,
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

  public updateAccount(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateAccount(
        $id : Int!, $description: String!, $observation: String!,
      ) {
        updateAccount(id:$id,description: $description, observation: $observation, ) {
          id
          description
          observation
        }
      }`,
      variables:{
        id,
        description : data.description,
        observation : data.observation,
        user_creation : 1,
        user_update :1
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteAccount(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteAccount($id:Int!,) {
        deleteAccount(id:$id) {
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

  public updateStateAccount(data, id): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation updateStateAccount($id: Int!, $state: Int!,) {
          updateStateAccount(id: $id, state: $state,) {
            id
          }
        }
      `,
      variables: {
        id,
        state: data.state ? 1 : 0,
        user_update: 1
      },
      refetchQueries: [
        {
          query: this.globalQuery
        }
      ]
    });
  }
}
