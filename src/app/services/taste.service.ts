import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasteService {
  constructor(private apollo: Apollo) { }
  public globalQuery : any = gql`query {
    tastes {
      id
      description
    }
  }`;
  public getTastes(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getTaste(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        tastes(id:${id}) {
          id
          description
        }
      }`
    }).valueChanges
  }

  public createTaste(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createTaste(
        $description: String!
      ) {
        createTaste(description: $description) {
          id
          description
        }
      }`,
      variables:{
        description : data.description,
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

  public updateTaste(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateTaste(
        $id : Int!, $description: String!,
      ) {
        updateTaste(id:$id,description: $description) {
          id
          description
        }
      }`,
      variables:{
        id,
        description : data.description,
        user_creation : 1,
        user_update :1
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteTaste(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteTaste($id:Int!,) {
        deleteTaste(id:$id) {
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
