import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  constructor(private apollo: Apollo) { }

  public getUbiGeos(): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        ubigeos{
          id
          department
          province
          district
          code
        }
      }`
    }).valueChanges
  }
  
  public getUbiGeo(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        ubigeos(id:${id}) {
          id
          department
          province
          district
          code
        }
      }`
    }).valueChanges
  }

  public createUbigeo(data): Observable<any>  {
    return this.apollo.mutate({   
      mutation: gql`mutation createUbigeo($department: String!, $province: String!,$district: String!, $code: String!,) {
        createUbigeo(department: $department, province: $province,district: $district, code: $code,) {
          id
          department
          province
          district
          code
        }
      }`,
      variables:{
        department : data.department,
        province: data.province,
        district : data.district,
        code:data.code,
        user_creation : 1,
        user_update: 1
      },
      refetchQueries:[
        {
          query: gql`query {
            ubigeos {
              id
              department
              province
              district
              code
            }
          }`
        }
      ]
    });
  }

  public updateUbigeo(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateUbigeo($id:Int!,$department: String!, $province: String!,$district: String!, $code: String!,) {
        updateUbigeo(id:$id,department: $department, province: $province,district: $district, code: $code,) {
          id
          department
          province
          district
          code
        }
      }`,
      variables:{
        id,
        department : data.department,
        province: data.province,
        district : data.district,
        code:data.code,
        user_creation : 1,
        user_update: 1
      },
      refetchQueries:[
        {
          query: gql`query {
            ubigeos {
              id
              department
              province
              district
              code
            }
          }`
        }
      ]
    });
  }

  public deleteUbigeo(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteUbigeo($id:Int!) {
        deleteUbigeo(id:$id) {
          id
        }
      }`,
      variables:{
        id,
      },
      refetchQueries:[
        {
          query: gql`query {
            ubigeos {
              id
              department
              province
              district
              code
            }
          }`
        }
      ]
    });
  }



}
