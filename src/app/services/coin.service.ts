import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinService {
  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    coins {
      id
      description
      code
      symbol
      state
    }
  }`;
  public getCoins(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getCoin(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        coins(id:${id}) {
          id
          description
          code
          symbol
          state
        }
      }`
    }).valueChanges
  }

  public createCoin(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createCoin(
        $description: String!,
        $code: String,
        $symbol: String!,
        $state: Int!,
      ) {
        createCoin(
          description: $description,
          code: $code,
          symbol: $symbol,
          state: $state, 
          ) {
          id
          description
          code
          symbol
          state
        }
      }`,
      variables:{
        description : data.description,
        code : data.code,
        symbol : data.symbol,
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

  public updateCoin(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateCoin(
        $id : Int!, 
        $description: String!,
        $code: String,
        $symbol: String!,
        $state: Int!,
      ) {
        updateCoin(
          id:$id,
          description: $description,
          code: $code,
          symbol: $symbol,
          state: $state,
          ) {
            id
            description
            code
            symbol
            state
        }
      }`,
      variables:{
        id,
        description : data.description,
        code : data.code,
        symbol : data.symbol,
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

  public deleteCoin(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteCoin($id:Int!,) {
        deleteCoin(id:$id) {
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

  public updateStateCoin(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateCoin($id:Int!,$state: Int!,) {
        updateStateCoin(id:$id,state: $state,) {
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
