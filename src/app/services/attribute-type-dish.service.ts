import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttributeTypeDishService {

  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    attribute_type_dishes {
      id
      description
      code
      state
    }
  }`;
  public getAttributeTypeDishes(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getAttributeTypeDish(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        attribute_type_dishes(id:${id}) {
          id
          description
          code
          state
        }
      }`
    }).valueChanges
  }

  public createAttributeTypeDish(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createAttributeTypeDish(
        $description: String!,$code: String!, $state: Int!,
      ) {
        createAttributeTypeDish(
          description: $description, code: $code, state: $state,
          ) {
          id
          description
          state
        }
      }`,
      variables:{
        description : data.description,
        code : data.code,
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

  public updateAttributeTypeDish(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateAttributeTypeDish(
        $id : Int!, 
        $description: String!,$code: String!, $state: Int!,
      ) {
        updateAttributeTypeDish(id:$id,description: $description, code: $code, state: $state,) {
          id
          description
          state
        }
      }`,
      variables:{
        id,
        description : data.description,
        code : data.code,
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

  public deleteAttributeTypeDish(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteAttributeTypeDish($id:Int!,) {
        deleteAttributeTypeDish(id:$id) {
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

  public updateStateDishCategory(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateDishCategory($id:Int!,$state: Int!, $user_update: Int!) {
        updateStateDishCategory(id:$id,state: $state,user_update: $user_update) {
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
