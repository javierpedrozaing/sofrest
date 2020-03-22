import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  constructor(private apollo: Apollo) { }
  public globalQuery : any = gql`query {
    parking {
      id
      quantity
      date_generated
      decrease
      price
      product{
        id
      }
    }
  }`;
  public getAllParking(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getParking(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        parking(id:${id}) {
          id
          quantity
          date_generated
          decrease
          price
          product{
            id
          }
        }
      }`
    }).valueChanges
  }

  public createParking(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createParking(
        $quantity: Int!
        $decrease: Int!
        $product_id: Int!
        $warehouse_id: Int!
        $product_to_parking_parking_detail: [Int]
        $necessary_quantity_parking_detail: [Int]
        $production_quantity_parking_detail: [Int]
        $total_parking_detail: [Int]
      ) {
        createParking(
          quantity : $quantity
          decrease : $decrease
          product_id : $product_id
          warehouse_id : $warehouse_id
          product_to_parking_parking_detail : $product_to_parking_parking_detail
          necessary_quantity_parking_detail : $necessary_quantity_parking_detail
          production_quantity_parking_detail : $production_quantity_parking_detail
          total_parking_detail : $total_parking_detail
          ) {
          id
          quantity
          decrease
          product{
            id
          }
          warehouse{
            id
          }
        }
      }`,
      variables:{
        quantity : data.quantity,
        decrease : data.decrease,
        product_id : data.product_id,
        warehouse_id : data.warehouse_id,
        product_to_parking_parking_detail : data.product_to_parking_parking_detail,
        necessary_quantity_parking_detail : data.necessary_quantity_parking_detail,
        production_quantity_parking_detail : data.production_quantity_parking_detail,
        total_parking_detail : data.total_parking_detail,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateParking(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateParking(
        $id : Int!,
        $quantity: Int!
        $decrease: Int!
        $product_id: Int!
        $warehouse_id: Int!
      ) {
        updateParking(id:$id,
          quantity : $quantity
          decrease : $decrease
          product_id : $product_id
          warehouse_id : $warehouse_id
          ) {
          id
          quantity
          date_generated
          decrease
          price
          product{
            id
          }
        }
      }`,
      variables:{
        id,
        quantity : data.quantity,
        decrease : data.decrease,
        product_id : data.product_id,
        warehouse_id : data.warehouse_id,
        necessary_quantity_parking_detail : data.necessary_quantity_parking_detail,
        production_quantity_parking_detail : data.production_quantity_parking_detail,
        total_parking_detail : data.total_parking_detail,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteParking(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteParking($id:Int!,) {
        deleteParking(id:$id) {
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

  public deleteParkingDetail(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteParkingDetail($id:Int!,) {
        deleteParkingDetail(id:$id) {
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
  
}
