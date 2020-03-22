import { Injectable, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeSaleService {

  constructor(private apollo: Apollo) {}

  public getAll(): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query {
          type_sales {
            id
            description
            state
            code
          }
        }
      `
    }).valueChanges
  }

  public getById(id): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`query {
        type_sales(id:${id}) {
          id
          description
          state
          code
        }
      }`
    }).valueChanges
  }

  public save(data): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation createArea(
          $description: String!
          $state: Int!
          $code: String!
          $user_creation: Int!
          $user_update: Int!
        ) {
          createArea(
            description: $description
            state: $state
            code : $code
            user_creation: $user_creation
            user_update: $user_update
          ) {
            id
            description
            state
            code
          }
        }
      `,
      variables: {
        description: data.description,
        state: data.state ? 1 : 0,
        code : data.code,
        user_creation: 1,
        user_update: 1
      },
      refetchQueries: [
        {
          query: gql`
            query {
              type_sales {
                id
                description
                state
                code
              }
            }
          `
        }
      ]
    });
  }

  public update(id, data): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateTypeSale(
          $id: Int!
          $description: String!
          $state: Int!
          $code: String!
          $user_update: Int!
        ) {
          updateTypeSale(
            id: $id
            description: $description
            state: $state
            $code: $code
            user_update: $user_update
          ) {
            id
            description
            state
            code
          }
        }
      `,
      variables: {
        id,
        description: data.description,
        state: data.state ? 1 : 0,
        code: data.code,
        user_update: 1
      },
      refetchQueries: [
        {
          query: gql`
            query {
              type_sales {
                id
                description
                state
                code
              }
            }
          `
        }
      ]
    });
  }

  public delete(id): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteTypeSale($id: Int!) {
          deleteTypeSale(id: $id) {
            id
          }
        }
      `,
      variables: {
        id
      },
      refetchQueries: [
        {
          query: gql`
            query {
              type_sales {
                id
                description
                state
                code
              }
            }
          `
        }
      ]
    });
  }

  public updateState(data, id): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateTypeSale($id: Int!, $state: Int!, $user_update: Int!) {
          updateTypeSale(id: $id, state: $state, user_update: $user_update) {
            id
          }
        }
      `,
      variables: {
        id,
        state: data.state ? 1 : 0,
        user_update: 1
      },
      refetchQueries: [
        {
          query: gql`
            query {
              type_sales {
                id
                description
                state
                code
              }
            }
          `
        }
      ]
    });
  }
}
