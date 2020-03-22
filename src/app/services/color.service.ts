import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private apollo: Apollo) { }
  public globalQuery : any = gql`query {
    colors {
      id
      description
    }
  }`;
  public getColors(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getColor(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        colors(id:${id}) {
          id
          description
        }
      }`
    }).valueChanges
  }

  public createColor(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createColor(
        $description: String!, 
      ) {
        createColor(description: $description,) {
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

  public updateColor(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateColor(
        $id : Int!, $description: String!,
      ) {
        updateColor(id:$id,description: $description,) {
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

  public deleteColor(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteColor($id:Int!,) {
        deleteColor(id:$id) {
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
