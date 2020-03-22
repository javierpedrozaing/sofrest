import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishDetailService {

  constructor(private apollo: Apollo) { }

  public globalQuery: any = gql`query {
    dish_details {
      id
      observation
      dish{
        id
      }
      recipe{
        id
      }
    }
  }`;
  public getDishDetails(): Observable<any> {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getDishDetail(id): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`query {
        dish_details(id:${id}) {
          id
          observation
          dish{
            id
          }
          recipe{
            id
          }
        }
      }`
    }).valueChanges
  }

  public createDishDetail(data): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation createDishDetail(
        $observation: String!,
        $dish_id: Int!,
        $recipe_id: Int!,
        $user_creation: Int!, 
        $user_update: Int!
      ) {
        createDishDetail(
          observation: $observation, 
          dish_id: $dish_id,
          recipe_id: $recipe_id,
          user_creation : $user_creation, 
          user_update: $user_update
          ) {
            id
            observation
            dish{
              id
            }
            recipe{
              id
            }
        }
      }`,
      variables: {
        observation: data.observation,
        dish_id: data.code,
        recipe_id: data.recipe_id,
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

  public updateDishDetail(id, data): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation updateDishDetail(
        $id : Int!, 
        $observation: String!,
        $dish_id: Int!,
        $recipe_id: Int!,
        $user_creation: Int!, 
        $user_update: Int!
      ) {
        updateDishDetail(id:$id,
          observation: $observation, 
          dish_id: $dish_id,
          recipe_id: $recipe_id,
          user_update: $user_update
          ) {
            id
            observation
            dish{
              id
            }
            recipe{
              id
            }
        }
      }`,
      variables: {
        id,
        observation: data.observation,
        dish_id: data.code,
        recipe_id: data.recipe_id,
        user_update: 1
      },
      refetchQueries: [
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteDishDetail(id): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation deleteDishDetail($id:Int!,) {
        deleteDishDetail(id:$id) {
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

}
