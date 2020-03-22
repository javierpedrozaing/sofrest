import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishAttributeService {

  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    dish_attribute {
      id
      quantity
      price
      dish{
        id
      }
      product{
        id
      }
      attribute_type_dish{
        id
      }
    }
  }`;
  public getDishAttributes(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getDishAttribute(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        dish_attribute(id:${id}) {
          id
          quantity
          price
          dish{
            id
          }
          product{
            id
          }
          attribute_type_dish{
            id
          }
        }
      }`
    }).valueChanges
  }

  public createDishAttribute(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createDishAttribute(
        price: String!
        quantity: Int!,
        dish_id: Int!,
        attribute_type_dish_id: Int!,
        product_id: Int!,
      ) {
        createDishAttribute(
          price: $price
          quantity: $quantity,
          dish_id: $dish_id,
          attribute_type_dish_id: $attribute_type_dish_id,
          product_id: Int!,
          ) {
            id
            quantity
            price
            dish{
              id
            }
            product{
              id
            }
            attribute_type_dish{
              id
            }
        }
      }`,
      variables:{
        price : data.price,
        quantity : data.quantity,
        dish_id : data.dish_id,
        attribute_type_dish_id : data.attribute_type_dish_id,
        product_id : data.product_id,
        user_creation:1,
        user_update:1
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateDishAttribute(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateDishAttribute(
        $id : Int!, 
        price: String!
        quantity: Int!,
        dish_id: Int!,
        attribute_type_dish_id: Int!,
        product_id: Int!,
      ) {
        updateDishAttribute(
          id:$id,
          price: $price,
          quantity: $quantity,
          dish_id: $dish_id,
          attribute_type_dish_id: $attribute_type_dish_id,
          product_id: Int!,
          ) {
            id
            quantity
            price
            dish{
              id
            }
            product{
              id
            }
            attribute_type_dish{
              id
            }
        }
      }`,
      variables:{
        id,
        price : data.price,
        quantity : data.quantity,
        dish_id : data.dish_id,
        attribute_type_dish_id : data.attribute_type_dish_id,
        product_id : data.product_id,
        user_update:1
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteDishAttribute(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteDishAttribute($id:Int!,) {
        deleteDishAttribute(id:$id) {
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
