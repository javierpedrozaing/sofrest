import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor(private apollo: Apollo) { }

  public getSubCategories(): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        sub_category {
          id
          description
          state
          accounting_account
          category{
            id
            description
          }
        }
      }`
    }).valueChanges
  }

  public getSubCategory(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        sub_category(id:${id}) {
          id
          description
          state
          accounting_account
          category{
            id
            description
          }
        }
      }`
    }).valueChanges
  }

  public getSubCategoryByCategory(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        sub_category_with_category(id:${id}) {
          id
          description
          state
          accounting_account
          category{
            id
            description
          }
        }
      }`
    }).valueChanges
  }

  public createSubCategory(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createSubCategory($description: String!, $accounting_account: String, $state: Int!, $category_id: Int!) {
        createSubCategory(description: $description, accounting_account: $accounting_account, state: $state, category_id: $category_id) {
          id
          description
          state
          accounting_account
          category{
            id
            description
          }
        }
      }`,
      variables:{
        description : data.description,
        state: data.state ? 1 : 0,
        accounting_account : data.accounting_account,
        category_id:data.category
      },
      refetchQueries:[
        {
          query: gql`query {
            sub_category {
              id
              description
              state
              accounting_account
              category{
                id
                description
              }
            }
          }`
        }
      ]
    });
  }

  public updateSubCategory(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateSubCategory($id: Int!,$description: String!, $accounting_account: String, $state: Int!, $category_id: Int!) {
        updateSubCategory(id:$id,description: $description,  accounting_account: $accounting_account, state: $state, category_id: $category_id) {
          id
          description
          state
          accounting_account
          category{
            id
            description
          }
        }
      }`,
      variables:{
        id,
        description : data.description,
        state: data.state ? 1 : 0,
        accounting_account : data.accounting_account,
        category_id:data.category,
        user_update: 1
      },
      refetchQueries:[
        {
          query: gql`query {
            sub_category {
              id
              description
              state
              accounting_account
              category{
                id
                description
              }
            }
          }`
        }
      ]
    });
  }

  public deleteSubCategory(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteSubCategory($id:Int!) {
        deleteSubCategory(id:$id) {
          id
        }
      }`,
      variables:{
        id,
      },
      refetchQueries:[
        {
          query: gql`query {
            sub_category {
              id
              description
              state
              accounting_account
              category{
                id
                description
              }
            }
          }`
        }
      ]
    });
  }

  public updateStateSubCategory(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateSubCategory($id:Int!,$state: Int!) {
        updateStateSubCategory(id:$id,state: $state) {
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
            sub_category {
              id
              description
              state
              accounting_account
              category{
                id
                description
              }
            }
          }`
        }
      ]
    });
  }
}
