import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeTypeService {

  constructor(private apollo: Apollo) { }
  public globalQuery : any = gql`query {
    income_type {
      id
      description
    }
  }`;
  public getIncomeTypes(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getIncomeType(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        income_type(id:${id}) {
          id
          description
        }
      }`
    }).valueChanges
  }

}
