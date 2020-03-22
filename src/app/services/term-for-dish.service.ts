import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TermForDishService {

  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    term_for_dish {
      id
      description
      dish{
        id
        description
      }
      state
    }
  }`;
  public getTermsForDish(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getTermForDish(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        term_for_dish(id:${id}) {
          id
          description
          dish{
            id
            description
          }
          state
        }
      }`
    }).valueChanges
  }

  public createTermForDish(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createTermForDish(
        $description: String!, $state: Int!, $dish_id: Int!,
      ) {
        createTermForDish(
          description: $description, state: $state, dish_id : $dish_id, 
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
        dish_id : 1,
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

  public updateTermForDish(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateTermForDish(
        $id : Int!, 
        $description: String!, $state: Int!, $dish_id: Int!,
      ) {
        updateTermForDish(id:$id,description: $description, state: $state, dish_id : $dish_id, ) {
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
        dish_id:1,
        user_update:1
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteTermForDish(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteTermForDish($id:Int!,) {
        deleteTermForDish(id:$id) {
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

  public updateStateTermForDish(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateTermForDish($id:Int!,$state: Int!, $user_update: Int!) {
        updateStateTermForDish(id:$id,state: $state,user_update: $user_update) {
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
