import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferTypeService {

  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    offer_types {
      id
      description
      state
    }
  }`;
  public getOfferTypes(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getOfferType(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        offer_types(id:${id}) {
          id
          description
          state
        }
      }`
    }).valueChanges
  }

  public createOfferType(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createOfferType(
        $description: String!, $state: Int!,
      ) {
        createOfferType(description: $description, state: $state, ) {
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

  public updateTypeProduct(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateTypeProduct(
        $id : Int!, $description: String!, $state: Int!,
      ) {
        updateTypeProduct(id:$id,description: $description, state: $state, ) {
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

  public deleteOfferType(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteOfferType($id:Int!,) {
        deleteOfferType(id:$id) {
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

  public updateStateOfferType(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateOfferType($id:Int!,$state: Int!,) {
        updateStateOfferType(id:$id,state: $state,) {
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
