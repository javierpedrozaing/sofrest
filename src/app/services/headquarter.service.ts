import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeadquarterService {

  constructor(private apollo: Apollo) { }
  public globalQuery : any = gql`query {
    headquarters {
      id
      description
      code
      principal
      address
      state
      ubigeo{
        id
        code
      }
    }
  }`;

  /* public globalQueryHeadhquarterType : any = gql`
  query{
    headquarter_type{
      id
      description
      state
    }
  }
  ` */

  public getHeadquarters(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getHeadquarter(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        headquarters(id:${id}) {
          id
          description
          code
          principal
          address
          state
          reference
          ubigeo{
            id
            code
          }
        }
      }`
    }).valueChanges
  }

  public saveHeadquarter(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createHeadquarter(
        $description: String!,
        $code: String!,
        $principal: Int!,
        $address: String!,
        $reference: String,
        $state: Int!,
        $ubigeo_id: Int!
        ) {
        createHeadquarter(
          description: $description,
          code: $code,
          principal: $principal,
          address: $address,
          state: $state,
          reference: $reference,
          ubigeo_id: $ubigeo_id) {
          id
          description
          code
          principal
          address
          state
          reference
          ubigeo{
            id
            code
          }
        }
      }`,
      variables:{
        description: data.description,
        code: data.code,
        principal: data.principal,
        address: data.address,
        reference: data.reference,
        state: data.state,
        ubigeo_id: data.ubigeo_id,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateHeadquarter(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateHeadquarter($id: Int!,$description: String!,$code: String!,$principal: Int!,$address: String!,$reference: String,$state: Int!,$ubigeo_id: Int!) {
        updateHeadquarter(id :$id,description: $description,code: $code,principal: $principal,address: $address,reference: $reference,state: $state,ubigeo_id: $ubigeo_id) {
          id
          description
          code
          principal
          address
          state
          reference
          ubigeo{
            id
            code
          }
        }
      }`,
      variables:{
        id,
        description: data.description,
        code: data.code,
        principal: data.principal,
        address: data.address,
        state: data.state,
        reference: data.reference,
        ubigeo_id: data.ubigeo_id,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteHeadquarter(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteHeadquarter($id:Int!) {
        deleteHeadquarter(id:$id) {
          id
        }
      }`,
      variables:{
        id,
      },
      refetchQueries: [
        { query:this.globalQuery
        }
      ]
    });
  }

  public updateStateHeadquarter(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateHeadquarter($id:Int!,$state: Int!, $user_update: Int!) {
        updateStateHeadquarter(id:$id,state: $state,user_update: $user_update) {
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

  /* public getWHeadquartersTypes(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQueryHeadhquarterType
    }).valueChanges
  }

  public getHeadquarterType(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        headquarter_type(id:${id}) {
          id
          description
          state
        }
      }`
    }).valueChanges
  } */

  /* public createHeadquarterType(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createHeadquarterType(
        $description: String!, $state: Int!,$client_id: Int!, $user_creation: Int!, $user_update: Int!
      ) {
        createHeadquarterType(description: $description, state: $state, client_id : $client_id,user_creation : $user_creation, user_update: $user_update) {
          id
          description
          state
        }
      }`,
      variables:{
        description : data.description,
        state : data.state,
        client_id:1,
        user_creation:1,
        user_update:1
      },
      refetchQueries:[
        {
          query: this.globalQueryHeadhquarterType
        }
      ]
    });
  } */

  /* public updateHeadquarterType(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateHeadquarterType(
        $id : Int!,$description: String!, $state: Int!,$client_id: Int!, $user_update: Int!
      ) {
        updateHeadquarterType(id:$id,description: $description, state: $state, client_id : $client_id,user_update: $user_update) {
          id
          description
          state
        }
      }`,
      variables:{
        id,
        description : data.description,
        state : data.state,
        client_id:1,
        user_update:1
      },
      refetchQueries:[
        {
          query: this.globalQueryHeadhquarterType
        }
      ]
    });
  }

  public deleteHeadquarterType(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteHeadquarterType($id:Int!,) {
        deleteHeadquarterType(id:$id) {
          id
        }
      }`,
      variables:{
        id,
      },
      refetchQueries:[
        {
          query: this.globalQueryHeadhquarterType
        }
      ]
    });
  }

  public updateStateHeadquarterType(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateHeadquarterType($id:Int!,$state: Int!, $user_update: Int!) {
        updateStateHeadquarterType(id:$id,state: $state,user_update: $user_update) {
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
          query: this.globalQueryHeadhquarterType
        }
      ]
    });
  } */

}
