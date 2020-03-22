import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrademarkService {

  public globalQuery : any =  gql`query {
    brand{
      description
      state
      id
    }
  }`
  constructor(private apollo: Apollo) { }

  public getAllTrademark(): Observable<any> {
    return this.apollo.watchQuery({
      query:this.globalQuery
    }).valueChanges
  }

  public getTrademark(id): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`query {
        brand(id:${id}){
          description
          state
          id
        }
      }`
    }).valueChanges
  }

  public createBrand(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql `mutation createBrand(
        $description: String!, 
        $state: Int!,
        ) {
        createBrand(description: $description, state: $state,) {
          id
          description
          state
        }
      }`,
      variables:{
        description : data.description,
        state: data.state ? 1 : 0,
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

  public updateBrand(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql `mutation updateBrand($id:Int!,$description: String!, $state: Int!,) {
        updateBrand(id:$id,description: $description, state: $state, ) {
          id
          description
          state
        }
      }`,
      variables:{
        id,
        description : data.description,
        state: data.state ? 1 : 0,
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

  public deleteBrand(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteBrand($id:Int!) {
        deleteBrand(id:$id) {
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

  public updateStateBrand(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateBrand($id:Int!,$state: Int!,) {
        updateStateBrand(id:$id,state: $state,) {
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
