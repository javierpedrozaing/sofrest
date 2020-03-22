import { Injectable } from "@angular/core";
import { Apollo, QueryRef } from "apollo-angular";
import gql from "graphql-tag";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AreaService {

  public globalQuery : any = gql`
  query {
    areas {
      id
      description
      state
      headquarter {
        id
        description
      }
    }
  }
`;
  constructor(private apollo: Apollo) {}

  public getAreas(): Observable<any> {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getArea(id): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`query {
        areas(id:${id}) {
          id
          description
          state
          headquarter {
            id
            description
          }
        }
      }`
    }).valueChanges
  }

  public getAreaByHeadquarter(id): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`query {
        areas(headquarter_id:${id}) {
          id
          description
          state
          headquarter {
            id
            description
          }
        }
      }`
    }).valueChanges
  }

  public saveArea(data): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation createArea(
          $description: String!
          $state: Int!
          $headquarter_id: Int!
        ) {
          createArea(
            description: $description
            state: $state
            headquarter_id: $headquarter_id
          ) {
            id
            description
            state
            headquarter {
              id
              description
            }
          }
        }
      `,
      variables: {
        description: data.description,
        state: data.state ? 1 : 0,
        headquarter_id: data.headquarter_id
      },
      refetchQueries: [
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateArea(id, data): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation updateCategory(
          $id: Int!
          $description: String!
          $state: Int!
          $headquarter_id: Int!
        ) {
          updateArea(
            id: $id
            description: $description
            state: $state
            headquarter_id: $headquarter_id
          ) {
            id
            description
            state
            headquarter {
              id
              description
            }
          }
        }
      `,
      variables: {
        id,
        description: data.description,
        state: data.state ? 1 : 0,
        headquarter_id: data.headquarter_id,
      },
      refetchQueries: [
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteArea(id): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation deleteArea($id: Int!) {
          deleteArea(id: $id) {
            id
          }
        }
      `,
      variables: {
        id
      },
      refetchQueries: [
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateStateArea(data, id): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation updateStateArea($id: Int!, $state: Int!) {
          updateStateArea(id: $id, state: $state) {
            id
          }
        }
      `,
      variables: {
        id,
        state: data.state ? 1 : 0
      },
      refetchQueries: [
        {
          query: this.globalQuery
        }
      ]
    });
  }
}
