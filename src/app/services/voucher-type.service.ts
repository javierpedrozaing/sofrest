import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoucherTypeService {
  constructor(private apollo: Apollo) { }
  public globalQuery : any = gql`query {
    voucher_type {
      id
      description
      code
      visible
    }
  }`;
  public getAllVoucherTypes(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getAllVoucherType(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        voucher_type(id:${id}) {
          id
          description
          code
          visible
        }
      }`
    }).valueChanges
  }

}
