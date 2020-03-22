import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from "apollo-angular";
import gql from "graphql-tag";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ComboService {

  constructor(private apollo: Apollo) { }
  public globalQuery : any = gql`query {
    combo {
      id
      description
      state
      price
      cost
      headquarter{
        id
        description
      }
      combo_detail{
        id
        quantity
        price
        product{
          id
          name
        }
      }
    }
  }`;

  public getCombos(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getCombo(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        combo(id:${id}) {
          id
          description
          state
          price
          cost
          headquarter{
            id
            description
          }
          combo_detail{
            id
            quantity
            price
            product{
              id
              name
            }
          }
        }
      }`
    }).valueChanges
  }

  public createCombo(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createCombo(
            $description: String!,
            $price: String!,
            $cost: String!,
            $state: Int!,
            $headquarter_id: Int!,
            $quantity: [Int],
            $price_product: [String],
            $product: [Int],
        ) {
        createCombo(
          description: $description,
          price: $price,
          cost: $cost,
          state: $state,
          headquarter_id: $headquarter_id,
          quantity: $quantity,
          price_product: $price_product,
          product: $product,
          ) {
            id
            description
            state
            price
            cost
            headquarter{
              id
              description
            }
            combo_detail{
              quantity
              price
              product{
                id
                name
              }
            }
        }
      }`,
      variables:{
        description: data.description,
        price: data.price,
        cost: data.cost,
        state: data.state ? 1 :0,
        headquarter_id: data.headquarter_id,
        user_creation: 1,
        user_update : 1,
        quantity: data.quantity ? data.quantity : [],
        price_product: data.price_product ? data.price_product : [],
        product: data.product ? data.product : [],
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateCombo(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateCombo(
        $id : Int!,
        $description: String!,
        $price: String!,
        $cost: String!,
        $state: Int!,
        $headquarter_id: Int!,
        $quantity: [Int],
        $price_product: [String],
        $product: [Int],
        $combo_detail_id: [Int]
      ) {
        updateCombo(id:$id,
          description: $description,
          price: $price,
          cost: $cost,
          state: $state,
          headquarter_id: $headquarter_id,
          quantity: $quantity,
          price_product: $price_product,
          product: $product,
          combo_detail_id: $combo_detail_id
          ) {
            id
            description
            state
            price
            cost
            headquarter{
              id
              description
            }
            combo_detail{
              quantity
              price
              product{
                id
                name
              }
            }
        }
      }`,
      variables:{
        id,
        description: data.description,
        price: data.price,
        cost: data.cost,
        state: data.state ? 1 :0,
        headquarter_id: data.headquarter_id,
        user_update: 1,
        quantity: data.quantity ? data.quantity : [],
        price_product: data.price_product ? data.price_product : [],
        product: data.product ? data.product : [],
        combo_detail_id : data.combo_detail_id ? data.combo_detail_id :[]
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteCombo(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteCombo($id:Int!,) {
        deleteCombo(id:$id) {
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

  public updateStateCombo(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateCombo($id:Int!,$state: Int!,) {
        updateStateCombo(id:$id,state: $state,) {
          id
        }
      }`,
      variables:{
        id,
        state: data.state ? 1 : 0,
        user_update:1,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteComboDetail(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteComboDetail($id:Int!,) {
        deleteComboDetail(id:$id) {
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
