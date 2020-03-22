import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from "apollo-angular";
import gql from "graphql-tag";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private apollo: Apollo) { }
  public globalQuery : any = gql`query {
    promotion {
      id
      description
      state
      discount_rate
      price
      cost
      promotion_mode
      product_promotion{
        id
        quantity
        product{
          id
          name
          price
        }
      }
      combo_promotion{
        id
        quantity
        combo{
          id
          description
          price
        }
      }
      headquarter{
        id
        description
      }
    }
  }`;

  public getPromotions(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getPromotion(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        promotion(id:${id}) {
          id
          description
          state
          discount_rate
          price
          cost
          promotion_mode
          product_promotion{
            id
            quantity
            product{
              id
              name
              price
            }
          }
          combo_promotion{
            id
            quantity
            combo{
              id
              description
              price
            }
          }
          headquarter{
            id
            description
          }
        }
      }`
    }).valueChanges
  }

  public createPromotion(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createPromotion(
            $description: String!,
            $discount_rate: Int!,
            $price: String!,
            $cost: String!,
            $promotion_mode: Int!,
            $state: Int!,
            $headquarter_id: Int!,
            $product: [Int],
            $quantity: [Int],
            $combo_for_combo_promotion: [Int]
        ) {
        createPromotion(
          description: $description,
          discount_rate : $discount_rate,
          price: $price,
          cost: $cost,
          promotion_mode : $promotion_mode,
          state: $state,
          headquarter_id: $headquarter_id,
          product: $product,
          quantity: $quantity,
          combo_for_combo_promotion : $combo_for_combo_promotion,
          ) {
            id
            description
            state
            discount_rate
            price
            cost
            promotion_mode
            product_promotion{
              id
              quantity
              product{
                id
                name
              }
            }
            combo_promotion{
              id
              quantity
              combo{
                id
                description
              }
            }
            headquarter{
              id
              description
            }
        }
      }`,
      variables:{
        description: data.description,
        price: data.price,
        discount_rate : data.discount_rate,
        cost: data.cost,
        state: data.state ? 1 :0,
        headquarter_id: data.headquarter_id,
        user_creation: 1,
        user_update: 1,
        quantity: data.quantity ? data.quantity : [],
        product: data.product ? data.product : [],
        promotion_mode : data.promotion_mode,
        combo_for_combo_promotion : data.combo_for_combo_promotion ? data.combo_for_combo_promotion : []
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updatePromotion(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updatePromotion(
        $id : Int!,
        $description: String!,
        $discount_rate: Int!,
        $price: String!,
        $cost: String!,
        $promotion_mode: Int!,
        $state: Int!,
        $headquarter_id: Int!,
        $product: [Int],
        $quantity: [Int],
        $combo_for_combo_promotion: [Int],
        $product_promotion_id: [Int],
        $combo_promotion_id: [Int],
      ) {
        updatePromotion(id:$id,
          description: $description,
          discount_rate : $discount_rate,
          price: $price,
          cost: $cost,
          promotion_mode : $promotion_mode,
          state: $state,
          headquarter_id: $headquarter_id,
          product: $product,
          quantity: $quantity,
          combo_for_combo_promotion : $combo_for_combo_promotion,
          product_promotion_id: $product_promotion_id,
          combo_promotion_id: $combo_promotion_id,
          ) {
            id
            description
            state
            discount_rate
            price
            cost
            promotion_mode
            product_promotion{
              id
              quantity
              product{
                id
                name
              }
            }
            combo_promotion{
              id
              quantity
              combo{
                id
                description
              }
            }
            headquarter{
              id
              description
            }
        }
      }`,
      variables:{
        id,
        description: data.description,
        price: data.price,
        discount_rate : data.discount_rate,
        cost: data.cost,
        state: data.state ? 1 :0,
        headquarter_id: data.headquarter_id,
        user_update: 1,
        quantity: data.quantity ? data.quantity : [],
        product: data.product ? data.product : [],
        promotion_mode : data.promotion_mode,
        combo_for_combo_promotion : data.combo_for_combo_promotion ? data.combo_for_combo_promotion : [],
        product_promotion_id : data.product_promotion_id ? data.product_promotion_id : [],
        combo_promotion_id : data.combo_promotion_id ? data.combo_promotion_id : [],
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deletePromotion(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deletePromotion($id:Int!,) {
        deletePromotion(id:$id) {
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

  public updateStatePromotion(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStatePromotion($id:Int!,$state: Int!) {
        updateStatePromotion(id:$id,state: $state,) {
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

  public deleteProductPromotion(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteProductPromotion($id:Int!,) {
        deleteProductPromotion(id:$id) {
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

  public deleteComboPromotion(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteComboPromotion($id:Int!,) {
        deleteComboPromotion(id:$id) {
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
