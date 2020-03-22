import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private apollo: Apollo) { }
  public globalQuery: any = gql`query {
    document_types {
      id
      description
      state
      code
    }
  }`;

  public getDocumentTypes(): Observable<any> {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getDocumentType(id): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`query {
        document_types(id:${id}) {
          id
          description
          state
          code
        }
      }`
    }).valueChanges
  }

  public createDocumentType(data): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation createDocumentType($description: String!,$code: String!, $state: Int!) {
        createDocumentType(description: $description, code: $code, state: $state) {
          id
          description
          state
          code
        }
      }`,
      variables: {
        description: data.description,
        state: data.state ? 1 : 0,
        code: data.code,
      },
      refetchQueries: [
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateDocumentType(id, data): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation updateDocumentType(
        $id : Int!, $description: String!,$code: String!, $state: Int!,
      ) {
        updateDocumentType(id:$id,description: $description, code: $code, state : $state ) {
          id
          description
          state
          code
        }
      }`,
      variables: {
        id,
        description: data.description,
        state: data.state,
        code: data.code,
      },
      refetchQueries: [
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteDocumentType(id): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation deleteDocumentType($id:Int!,) {
        deleteDocumentType(id:$id) {
          id
        }
      }`,
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateStateDocumentType(data, id): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateDocumentType($id:Int!,$state: Int!,) {
        updateStateDocumentType(id:$id,state: $state) {
          id
        }
      }`,
      variables: {
        id,
        state: data.state ? 1 : 0,
      },
      refetchQueries: [
        {
          query: this.globalQuery
        }
      ]
    });
  }

}
