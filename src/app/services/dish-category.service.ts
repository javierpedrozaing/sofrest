import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishCategoryService {

  constructor(private apollo: Apollo) { }

  public globalQuery: any = gql`query {
    dish_categories {
      id
      description
      code
      state
    }
  }`;
  public getDishCategories(): Observable<any> {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getDishCategory(id): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`query {
        dish_categories(id:${id}) {
          id
          description
          code
          state
        }
      }`
    }).valueChanges
  }

  public createDishCategory(data): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation createDishCategory(
        $description: String!,$code: String!, $state: Int!,
      ) {
        createDishCategory(
          description: $description, code: $code, state: $state,
          ) {
            id
            description
            code
            state
        }
      }`,
      variables: {
        description: data.description,
        code: data.code,
        state: data.state ? 1 : 0,
        client_id: 1,
        user_creation: 1,
        user_update: 1
      },
      refetchQueries: [
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateDishCategory(id, data): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation updateDishCategory(
        $id : Int!, 
        $description: String!,$code: String!, $state: Int!
      ) {
        updateDishCategory(id:$id,description: $description, code: $code, state: $state) {
          id
          description
          code
          state
        }
      }`,
      variables: {
        id,
        description: data.description,
        code: data.code,
        state: data.state ? 1 : 0,
        client_id: 1,
        user_update: 1
      },
      refetchQueries: [
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteDishCategory(id): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation deleteDishCategory($id:Int!,) {
        deleteDishCategory(id:$id) {
          id
        }
      }`,
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateStateDishCategory(data, id): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateDishCategory($id:Int!,$state: Int!, $user_update: Int!) {
        updateStateDishCategory(id:$id,state: $state,user_update: $user_update) {
          id
        }
      }`,
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
