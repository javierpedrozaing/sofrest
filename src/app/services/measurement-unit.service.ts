import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeasurementUnitService {

  constructor(private apollo: Apollo) { }

  public getMeasurementUnits(): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        measurement_units{
          id
          description
          sunat_code
          state
        }
      }`
    }).valueChanges
  }
  
  public getMeasurementUnit(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        measurement_units(id:${id}) {
          id
          description
          sunat_code
          state
        }
      }`
    }).valueChanges
  }

  public createMeasurementUnit(data): Observable<any>  {
    return this.apollo.mutate({    
      mutation: gql`mutation createMeasurementUnit($description: String!, $sunat_code: String!,$state: Int!,) {
        createMeasurementUnit(description: $description, sunat_code: $sunat_code, state: $state,) {
          id
          description
          sunat_code
          state
        }
      }`,
      variables:{
        description : data.description,
        sunat_code: data.sunat_code,
        state : data.state ? 1 : 0,
        user_creation : 1,
        user_update: 1
      },
      refetchQueries:[
        {
          query: gql`query {
            measurement_units{
              id
              description
              sunat_code
              state
            }
          }`
        }
      ]
    });
  }

  public updateMeasurementUnit(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateMeasurementUnit($id:Int!,$description: String!, $sunat_code: String!,$state: Int!,) {
        updateMeasurementUnit(id:$id,description: $description, sunat_code: $sunat_code, state: $state,) {
          id
          description
          sunat_code
          state
        }
      }`,
      variables:{
        id,
        description : data.description,
        sunat_code: data.sunat_code,
        state : data.state ? 1 : 0,
        user_update: 1
      },
      refetchQueries:[
        {
          query: gql`query {
            measurement_units{
              id
              description
              sunat_code
              state
            }
          }`
        }
      ]
    });
  }

  public deleteMeasurementUnit(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteMeasurementUnit($id:Int!) {
        deleteMeasurementUnit(id:$id) {
          id
        }
      }`,
      variables:{
        id,
      },
      refetchQueries:[
        {
          query: gql`query {
            measurement_units{
              id
              description
              sunat_code
              state
            }
          }`
        }
      ]
    });
  }

}
