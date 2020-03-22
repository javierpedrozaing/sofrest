import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    modules {
      id
      description
      state
    }
  }`;
  public getModules(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getModule(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        modules(id:${id}) {
          id
          description
          state
        }
      }`
    }).valueChanges
  }

  public createModule(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createModule(
        $description: String!, $state: Int!, 
      ) {
        createModule(description: $description, state: $state, ) {
          id
          description
          state
        }
      }`,
      variables:{
        description : data.description,
        state : data.state ? 1 : 0,
        client_id : 1,
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

  public updateModule(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateModule(
        $id : Int!, $description: String!, $state: Int!,
      ) {
        updateModule(id:$id,description: $description, state: $state,) {
          id
          description
          state
        }
      }`,
      variables:{
        id,
        description : data.description,
        state : data.state ? 1 : 0,
        client_id:1,
        user_update:1
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteModule(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteModule($id:Int!,) {
        deleteModule(id:$id) {
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

  public updateStateModule(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateModule($id:Int!,$state: Int!,) {
        updateStateModule(id:$id,state: $state,) {
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
