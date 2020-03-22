import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductionAreaService {

  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    production_areas {
      id
      description
      code
      headquarter {
        id
        description
        code
      }
      state
    }
  }`;

  public getProductionAreas(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getProductionArea(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        production_areas(id:${id}) {
          id
          description
          state
          code
          headquarter {
            id
            description
            code
          }
        }
      }`
    }).valueChanges
  }

  public createProductionArea(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createProductionArea($description: String!, $state: Int!,$headquarter_id: Int!,$code: String) {
        createProductionArea(description: $description, state: $state,headquarter_id: $headquarter_id, code: $code,) {
          id
          description
          state
          code
          headquarter {
            id
            description
            code
          }
        }
      }`,
      variables:{
        description : data.description,
        state: data.state ? 1 : 0,
        code : data.code,
        headquarter_id : data.headquarter_id,
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

  public updateProductionArea(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateProductionArea($id:Int!,$description: String!, $state: Int!,$code: String,$headquarter_id: Int!) {
        updateProductionArea(id:$id,description: $description, state: $state,code: $code,headquarter_id: $headquarter_id) {
          id
          description
          state
          code
          headquarter {
            id
            description
            code
          }
        }
      }`,
      variables:{
        id,
        description : data.description,
        state: data.state ? 1 : 0,
        code : data.code,
        headquarter_id : data.headquarter_id,
        user_update: 1
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteProductionArea(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteProductionArea($id:Int!) {
        deleteProductionArea(id:$id) {
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

  public updateStateProductionArea(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateProductionArea($id:Int!,$state: Int!) {
        updateStateProductionArea(id:$id,state: $state) {
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
