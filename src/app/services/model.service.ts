import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private apollo: Apollo) { }
  public globalQuery : any = gql`query {
    model {
      id
      description
      state
      brand{
        id
        description
      }
    }
  }`;

  public getModels(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getModel(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        model(id:${id}) {
          id
          description
          state
          brand{
            id
            description
          }
        }
      }`
    }).valueChanges
  }

  public getModelsByBrand(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        model_with_brand(id:${id}) {
          id
          description
          state
          brand{
            id
            description
          }
        }
      }`
    }).valueChanges
  }

  public createModel(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createModel($description: String!, $state: Int!,$brand_id: Int!,) {
        createModel(description: $description, state: $state,brand_id: $brand_id,) {
          id
          description
          state
          brand{
            id
            description
          }
        }
      }`,
      variables:{
        description : data.description,
        state : data.state ? 1 : 0,
        brand_id:data.brand_id,
        user_update:1,
        user_creation:1,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateModel(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateModel(
        $id : Int!, $description: String!, $state: Int!,$brand_id: Int!,
      ) {
        updateModel(id:$id,description: $description, state: $state,brand_id: $brand_id,) {
          id
          description
          state
          brand{
            id
            description
          }
        }
      }`,
      variables:{
        id,
        description : data.description,
        state : data.state ? 1 : 0,
        brand_id:data.brand_id,
        user_update:1,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteModel(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteModel($id:Int!,) {
        deleteModel(id:$id) {
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

  public updateStateModel(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateModel($id:Int!,$state: Int!,) {
        updateStateModel(id:$id,state: $state,) {
          id
        }
      }`,
      variables:{
        id,
        state: data.state ? 1 : 0,
        user_update:1,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

}
