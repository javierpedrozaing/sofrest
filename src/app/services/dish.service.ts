import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private apollo: Apollo) { }

  public globalQuery: any = gql`query {
    dishes  {
      id
      name
      image
      price
      observation
      state
      maximum_allowed
      coin{
        id
        symbol
      }
      dish_category{
        id
        description
        code
      }
      composite_product{
        id
        quantity
        product{
          id
          name
          price
          net_price
          cost
        }
      }
      term_for_dish{
        id
        description
      }
      dish_attribute{
        id
        quantity
        price
        attribute_type
        product{
          id
          name
        }
      }
    }
  }`;

  public getDishes(): Observable<any> {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getDish(id): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`query {
        dishes(id:${id}) {
          id
          name
          image
          price
          observation
          state
          maximum_allowed
          coin{
            id
            symbol
          }
          dish_category{
            id
            description
            code
          }
          composite_product{
            id
            quantity
            product{
              id
              name
              price
              net_price
              cost
            }
          }
          term_for_dish{
            id
            description
          }
          dish_attribute{
            id
            quantity
            price
            attribute_type
            product{
              id
              name
            }
          }
        }
      }`
    }).valueChanges
  }

  public createDish(data): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation createDish(
        $name: String!
        $code: String
        $barcode: String
        $coin_id: Int!
        $net_price: String
        $price: String!
        $cost: String!
        $dish_maximum_allowed: Int!
        $dish_category_id: Int!
        $observation: String
        $image: String!
        $state: Int!
        $recipe: [Int]
        $printer_id: Int
        $term_for_dish: [String]
        $attribute_type: [Int]
        $quantity_attribute: [Int]
        $price_attribute: [String]
        $product_attribute: [Int]
      ) {
        createDish(
          name : $name
          code : $code
          barcode : $barcode
          coin_id : $coin_id
          net_price : $net_price
          price : $price
          cost : $cost
          dish_maximum_allowed : $dish_maximum_allowed
          dish_category_id : $dish_category_id
          observation : $observation
          image : $image
          state : $state
          recipe : $recipe
          printer_id : $printer_id
          term_for_dish : $term_for_dish
          attribute_type : $attribute_type
          quantity_attribute : $quantity_attribute
          price_attribute : $price_attribute
          product_attribute : $product_attribute
          ) {
            id
        }
      }`,
      variables: {
        name : data.name,
        code : data.code,
        barcode : data.barcode,
        coin_id : data.coin_id,
        net_price : data.net_price,
        price : data.price,
        cost : data.cost,
        dish_maximum_allowed : data.dish_maximum_allowed,
        dish_category_id : data.dish_category_id,
        observation : data.observation,
        image : "test",//data.image,
        state : data.state,
        recipe : data.recipe,
        printer_id : data.printer_id,
        term_for_dish : data.term_for_dish,
        attribute_type : data.attribute_type,
        quantity_attribute : data.quantity_attribute,
        price_attribute : data.price_attribute,
        product_attribute : data.product_attribute,
      },
      refetchQueries: [
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateDish(id, data): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation updateDish(
        $id : Int!, 
        $name: String!
        $code: String
        $barcode: String
        $coin_id: Int!
        $net_price: String
        $price: String!
        $cost: String!
        $dish_maximum_allowed: Int!
        $dish_category_id: Int!
        $observation: String
        $image: String!
        $state: Int!
        $recipe: [Int]
        $printer_id: Int
        $term_for_dish: [String]
        $attribute_type: [Int]
        $composite_product_id: [Int]
        $quantity_attribute: [Int]
        $price_attribute: [String]
        $product_attribute: [Int]
        $term_for_dish_id: [Int],
        $dish_attribute_id: [Int],
      ) {
        updateDish(
          id:$id,
          name : $name
          code : $code
          barcode : $barcode
          coin_id : $coin_id
          net_price : $net_price
          price : $price
          cost : $cost
          dish_maximum_allowed : $dish_maximum_allowed
          dish_category_id : $dish_category_id
          observation : $observation
          image : $image
          state : $state
          recipe : $recipe
          composite_product_id : $composite_product_id
          printer_id : $printer_id
          term_for_dish : $term_for_dish
          attribute_type : $attribute_type
          quantity_attribute : $quantity_attribute
          price_attribute : $price_attribute
          product_attribute : $product_attribute
          term_for_dish_id : $term_for_dish_id,
          dish_attribute_id : $dish_attribute_id,
          ) {
            id
        }
      }`,
      variables: {
        id,
        name : data.name,
        code : data.code,
        barcode : data.barcode,
        coin_id : data.coin_id,
        net_price : data.net_price,
        price : data.price,
        cost : data.cost,
        dish_maximum_allowed : data.dish_maximum_allowed,
        dish_category_id : data.dish_category_id,
        observation : data.observation,
        image : data.image,
        state : data.state,
        recipe : data.recipe,
        printer_id : data.printer_id,
        term_for_dish : data.term_for_dish,
        attribute_type : data.attribute_type,
        quantity_attribute : data.quantity_attribute,
        price_attribute : data.price_attribute,
        product_attribute : data.product_attribute,
        composite_product_id : data.composite_product_id,
        term_for_dish_id : data.term_for_dish_id ? data.term_for_dish_id : [],
        dish_attribute_id : data.dish_attribute_id ? data.dish_attribute_id : [],
      },
      refetchQueries: [
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteDish(id): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation deleteDish($id:Int!,) {
        deleteDish(id:$id) {
          id
        }
      }`,
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateStateDish(data, id): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateDish($id:Int!,$state: Int!) {
        updateStateDish(id:$id,state: $state) {
          id
        }
      }`,
      variables: {
        id,
        state: data.state ? 1 : 0,
        user_update: 1
      },
      refetchQueries: [
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteDishDetail(id): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation deleteDishDetail($id:Int!,) {
        deleteDishDetail(id:$id) {
          id
        }
      }`,
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteDishAttribute(id): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation deleteDishAttribute($id:Int!,) {
        deleteDishAttribute(id:$id) {
          id
        }
      }`,
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteTermForDish(id): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation deleteTermForDish($id:Int!,) {
        deleteTermForDish(id:$id) {
          id
        }
      }`,
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: this.globalQuery
        }
      ]
    });
  }
  
}
