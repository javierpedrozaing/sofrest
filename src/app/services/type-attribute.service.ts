import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeAttributeService {

  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    type_attributes {
      id
      description
      state
    }
  }`;
  public getTypeAttributes(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getTypeAttribute(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        type_attributes(id:${id}) {
          id
          description
          state
        }
      }`
    }).valueChanges
  }

  public createTypeAttribute(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createTypeAttribute(
        $description: String!, $state: Int!, 
      ) {
        createTypeAttribute(description: $description, state: $state, ) {
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

  public updateTypeAttribute(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateTypeAttribute(
        $id : Int!, $description: String!, $state: Int!,
      ) {
        updateTypeAttribute(id:$id,description: $description, state: $state, ) {
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

  public deleteTypeAttribute(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteTypeAttribute($id:Int!,) {
        deleteTypeAttribute(id:$id) {
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

  public updateStateTypeAttribute(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateTypeAttribute($id:Int!,$state: Int!, $user_update: Int!) {
        updateStateTypeAttribute(id:$id,state: $state,user_update: $user_update) {
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
