import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private apollo: Apollo) { }

  public globalQuery: any = gql`query {
    tables {
      id
      name
      headquarter {
        id
        description
      }
      table_shape {
        id
        description
      }
    }
  }`;

  public getTables(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getTable(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        tables(id:${id}) {
          id
          name
          headquarter {
            id
            description
          }
          table_shape {
            id
            description
          }
        }
      }`
    }).valueChanges
  }

  public createTable(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createTable(
        $name: String!, $state: Int!, $headquarter_id: Int!, $table_shape_id: Int!,
      ) {
        createTable(name: $name, state: $state, headquarter_id: $headquarter_id, table_shape_id: $table_shape_id, ) {
          id
          name
          headquarter {
            id
            description
          }
          table_shape {
            id
            description
          }
        }
      }`,
      variables:{
        name : data.name,
        headquarter_id: data.headquarter_id,
        table_shape_id: data.table_shape_id,
        state: data.state,
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

  public updateTable(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateTable(
        $id : Int!, $name: String!, $state: Int!, $headquarter_id: Int!, $table_shape_id: Int!, 
      ) {
        updateTable(id:$id, state: $state,name: $name, headquarter_id: $headquarter_id, table_shape_id: $table_shape_id, ) {
          id
          name
          headquarter {
            id
            description
          }
          table_shape {
            id
            description
          }
        }
      }`,
      variables:{
        id,
        name : data.name,
        state: data.state,
        headquarter_id: data.headquarter_id,
        table_shape_id: data.table_shape_id,
        user_update :1
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteTable(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteTable($id:Int!,) {
        deleteTable(id:$id) {
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

}
