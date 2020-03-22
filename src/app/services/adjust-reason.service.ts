import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdjustReasonService {

  constructor(private apollo: Apollo) { }
  public globalQuery : any = gql`query {
    adjustment_reason {
      id
      description
      state
    }
  }`;

  public getAdjustmentReson(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery,
    }).valueChanges
  }
}
