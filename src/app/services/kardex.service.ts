import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KardexService {

  constructor(private apollo: Apollo) { }
  public globalQuery : any = gql`query {
    kardex {
      id
      description
    }
  }`;
  public getKardexes(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getKardex(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        kardex(id:${id}) {
          id
          description
        }
      }`
    }).valueChanges
  }

  public getKardexMotifs(): Observable<any>  {
    return this.apollo.watchQuery({
      query:gql`query {
        kardex_motif {
          id
          description
        }
      }`
    }).valueChanges
  }

  public getKardexMotif(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        kardex_motif(id:${id}) {
          id
          description
        }
      }`
    }).valueChanges
  }
}
