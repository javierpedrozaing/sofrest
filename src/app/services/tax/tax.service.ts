import { Injectable, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  constructor(private apollo: Apollo) { }

  public getAll(): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query {
          taxes {
            id
            description
            state
            amount
          }
        }
      `
    }).valueChanges
  }

  public getById(id): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`query {
        taxes(id:${id}) {
          id
          description
          state
          amount
        }
      }`
    }).valueChanges
  }

  public save(data): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation CreateTax(
          $description : String!
          $amount: String!
          $state: Int!
        ) {
          createTax(
            description: $description
            state: $state
            amount : $amount
          ) {
            id
            description
            state
            amount
          }
        }
      `,
      variables: {
        description: data.description,
        state: data.state ? 1 : 0,
        amount: data.amount,
        user_creation: 1,
        user_update: 1
      },
      refetchQueries: [
        {
          query: gql`
            query {
              taxes {
                id
                description
                state
                amount
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
        mutation UpdateTax(
          $id: Int!
          $description : String!
          $amount: String!
          $state: Int!
        ) {
          updateTax(
            id: $id
            description: $description
            state: $state
            amount : $amount
          ) {
            id
            description
            state
            amount
          }
        }
      `,
      variables: {
        id,
        description: data.description,
        state: data.state ? 1 : 0,
        amount: data.amount,
        user_update: 1
      },
      refetchQueries: [
        {
          query: gql`
            query {
              taxes {
                id
                description
                state
                amount
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
        mutation DeleteTax($id: Int!) {
          deleteTax(id: $id) {
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
              taxes {
                id
                description
                state
                amount
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
        mutation UpdateStateTax($id: Int!, $state: Int!, ) {
          updateStateTax(id: $id, state: $state,) {
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
              taxes {
                id
                description
                state
                amount
              }
            }
          `
        }
      ]
    });
  }
}
