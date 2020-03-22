import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    storages {
      id
      quantity
      minimum_stock
      maximum_stock
      warehouse{
        id
        description
      }
      measurement_unit{
        id
        description
      }
      product{
        id
        name
      }
    }
  }`;


  public getWarehouseStorage(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        storages(warehouse_id:${id}) {
          id
          quantity
          minimum_stock
          maximum_stock
          warehouse{
            id
            description
          }
          measurement_unit{
            id
            description
          }
          product{
            id
            name
          }
        }
      }`
    }).valueChanges
  }

}
