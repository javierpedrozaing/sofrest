import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private apollo: Apollo) { }

  public getCategories(): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        categories {
          id
          description
          state
          colour
        }
      }`,
    }).valueChanges
  }

  public getCategory(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        categories(id:${id}) {
          id
          description
          state
          colour
        }
      }`
    }).valueChanges
  }

  public saveCategory(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createCategory($description: String!, $state: Int!, $colour: String) {
        createCategory(description: $description, state: $state, colour: $colour) {
          id
          description
          state
          colour
        }
      }`,
      variables:{
        description : data.description,
        state: data.state ? 1 : 0,
        colour:data.colour
      },
      refetchQueries:[
        {
          query: gql`query {
            categories {
              id
              description
              state
              colour
            }
          }`
        }
      ]
    });
  }

  public updateCategory(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateCategory($id:Int!,$description: String!, $state: Int!,$colour: String) {
        updateCategory(id:$id,description: $description, state: $state, colour:$colour) {
          id
          description
          state
          colour
        }
      }`,
      variables:{
        id,
        description : data.description,
        state: data.state ? 1 : 0,
        colour:data.colour,
        user_update: 1
      },
      refetchQueries:[
        {
          query: gql`query {
            categories {
              id
              description
              state
              colour
            }
          }`
        }
      ]
    });
  }

  public deleteCategory(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteCategory($id:Int!) {
        deleteCategory(id:$id) {
          id
        }
      }`,
      variables:{
        id,
      },
      refetchQueries:[
        {
          query: gql`query {
            categories {
              id
              description
              state
              colour
            }
          }`
        }
      ]
    });
  }

  public updateStateCategory(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateCategory($id:Int!,$state: Int!) {
        updateStateCategory(id:$id,state: $state) {
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
          query: gql`query {
            categories {
              id
              description
              state
              colour
            }
          }`
        }
      ]
    });
  }
}
