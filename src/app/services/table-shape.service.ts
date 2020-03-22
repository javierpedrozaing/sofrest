import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableShapeService {
  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    table_shapes {
      id
      description
      state
    }
  }`;
  public getTableShapes(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getTableShape(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        table_shapes(id:${id}) {
          id
          description
          state
        }
      }`
    }).valueChanges
  }

  public createTableShape(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createTableShape(
        $description: String!, $state: Int!,
      ) {
        createTableShape(description: $description, state: $state,) {
          id
          description
          state
        }
      }`,
      variables:{
        description : data.description,
        state : data.state ? 1 : 0,
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

  public updateTableShape(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateTableShape(
        $id : Int!, $description: String!, $state: Int!,
      ) {
        updateTableShape(id:$id,description: $description, state: $state, ) {
          id
          description
          state
        }
      }`,
      variables:{
        id,
        description : data.description,
        state : data.state ? 1 : 0,
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

  public deleteTableShape(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteTableShape($id:Int!,) {
        deleteTableShape(id:$id) {
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

  public updateStateTableShape(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateTableShape($id:Int!,$state: Int!, ) {
        updateStateTableShape(id:$id,state: $state,) {
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
