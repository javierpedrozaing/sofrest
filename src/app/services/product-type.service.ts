import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  constructor(private apollo: Apollo) { }
  public globalQuery : any = gql`query {
    type_products {
      id
      description
      state
      code
    }
  }`;
  public getProductTypes(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getProductType(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        type_products(id:${id}) {
          id
          description
          state
          code
        }
      }`
    }).valueChanges
  }

  public createTypeProduct(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createTypeProduct(
        $description: String!, $state: Int!, $code: String
      ) {
        createTypeProduct(description: $description, state: $state, code: $code) {
          id
          description
          state
          code
        }
      }`,
      variables:{
        description : data.description,
        state : data.state,
        code: data.code
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
        $id : Int!, ,$description: String!, $code: String, $state: Int!,
      ) {
        updateTypeProduct(id:$id,description: $description, code: $code, state: $state) {
          id
          description
          state
          code
        }
      }`,
      variables:{
        id,
        description : data.description,
        code: data. code,
        state : data.state
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteTypeProduct(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteTypeProduct($id:Int!,) {
        deleteTypeProduct(id:$id) {
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

  public updateStateTypeProduct(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateTypeProduct($id:Int!,$state: Int!) {
        updateStateTypeProduct(id:$id,state: $state,) {
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
