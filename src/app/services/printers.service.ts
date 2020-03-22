import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrintersService {

  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    printers {
      id
      description
      ip
      state,
      area {
        id
        description
      }
      headquarter {
        id
        description
      }
    }
  }`
  public getPrinters(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getPrinter(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        printers(id:${id}) {
          id
          description
          ip
          state,
          area {
            id
            description
          }
          headquarter {
            id
            description
          }
        }
      }`
    }).valueChanges
  }

  public getPrintersByArea(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        printer_with_area(id:${id}) {
          id
          description
          ip
          state,
          area {
            id
            description
          }
          headquarter {
            id
            description
          }
        }
      }`
    }).valueChanges
  }

  public savePrinter(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createPrinter($description: String!, $ip: String!, $state: Int!, $headquarter_id: Int!, $area_id: Int!, $observation: String!) {
        createPrinter(description: $description, state: $state, ip: $ip, headquarter_id: $headquarter_id, area_id: $area_id, observation:$observation) {
          description
          state
          ip
          headquarter {
            id
            description
          }
          area {
            id
            description
          }
        }
      }`,
      variables:{
        description : data.description,
        ip: data.ip,
        state: data.state ? 1 : 0,
        area_id : data.area,
        observation: data.observation,
        headquarter_id : data.headquarter
      },
      refetchQueries:[
        {query:this.globalQuery}
      ]
    });
  }

  public updatePrinter(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updatePrinter($id : Int!, $description: String!, $ip: String!, $state: Int!, $headquarter_id: Int!, $area_id: Int!) {
        updatePrinter(id : $id, description: $description, state: $state, ip: $ip, headquarter_id: $headquarter_id, area_id: $area_id) {
          id
          description
          state
          ip
          headquarter {
            id
            description
          }
          area {
            id
            description
          }
        }
      }`,
      variables:{
        id,
        description : data.description,
        ip: data.ip,
        state: data.state ? 1 : 0,
        area_id : data.area,
        headquarter_id : data.headquarter
      },
      refetchQueries:[
        {query:this.globalQuery}
      ]
    });
  }

  public deletePrinter(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deletePrinter($id:Int!) {
        deletePrinter(id:$id) {
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

  public updateStatePrinter(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStatePrinter($id:Int!,$state: Int!, $user_update: Int!) {
        updateStatePrinter(id:$id,state: $state,user_update: $user_update) {
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
