import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private apollo: Apollo) { }
  public globalQuery: any = gql`query {
    recipes {
      id
      name
      code
      observation
      price
      state
      production_item
      sale_item
      portioning_item
      net_price
      cost
      barcode
      image
      type_recipe
      colour
      product_headquarter{
        id
        headquarter{
          id
        }
      }
      product_storage{
        id
        quantity
        minimum_stock
        maximum_stock
        warehouse{
          id
        }
      }
      coin{
        id
      }
      sub_category{
        id
        description
        category{
          id
          description
        }
      }
      type_product{
        id
        description
      }
      printer{
        id
        description
        area {
          id
        }
      }
      product_modifier{
        id
        modifier{
          id
        }
      }
      product_tax{
        id
        tax{
          id
          type
        }
      }
      measurement_unit{
        id
      }
      product_storage{
        id
        quantity
        minimum_stock
        maximum_stock
        warehouse{
          id
        }
        measurement_unit{
          id
        }
      }
    }
  }`;
  public getRecipes(): Observable<any> {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getRecipe(id): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`query {
        recipes(id:${id}){
          id
          name
          code
          observation
          price
          state
          net_price
          cost
          barcode
          image
          type_recipe
          dish_maximum_allowed
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
          dish_category{
            id
          }
          production_area{
            id
          }
          coin{
            id
          }
        }
      }`
    }).valueChanges
  }

  public createRecipe(data): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation createRecipe(
        $name: String!
        $code: String
        $barcode: String
        $coin_id: Int!
        $net_price: Float
        $price: Float!
        $cost: Float!
        $observation: String
        $image: String!
        $state: Boolean!
        $production_area_id: Int!
        $type_recipe: Int!
        $product: [Int]
        $quantity: [Int]
      ) {
        createRecipe(
          name : $name
          code : $code
          barcode : $barcode
          coin_id : $coin_id
          net_price : $net_price
          price : $price
          cost : $cost
          observation : $observation
          image : $image
          state : $state
          production_area_id : $production_area_id
          type_recipe : $type_recipe
          product : $product
          quantity : $quantity
        ) {
          id
          name
          price
          observation
          state
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
        observation : data.observation,
        image : data.image,
        state : data.state,
        production_area_id : data.production_area_id,
        type_recipe : data.type_recipe,
        product: data.product ? data.product : [],
        quantity: data.quantity ? data.quantity : [],
        unit: data.unit ? data.unit : [],
      },
      refetchQueries: [
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateRecipe(id, data): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation updateRecipe(
        $id : Int!
        $name: String!
        $code: String
        $barcode: String
        $coin_id: Int!
        $net_price: Float
        $price: Float!
        $cost: Float!
        $observation: String
        $image: String!
        $state: Boolean!
        $production_area_id: Int!
        $type_recipe: Int!
        $recipe_detail_id : [Int]
        $product: [Int]
        $quantity: [Int]
      ) {
        updateRecipe(
          id : $id
          name : $name
          code : $code
          barcode : $barcode
          coin_id : $coin_id
          net_price : $net_price
          price : $price
          cost : $cost
          observation : $observation
          image : $image
          state : $state
          production_area_id : $production_area_id
          type_recipe : $type_recipe
          recipe_detail_id  : $recipe_detail_id 
          product : $product
          quantity : $quantity
        ) {
          id
          name
          price
          observation
          state
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
        state : data.state ? true : false,
        production_area_id : data.production_area_id,
        type_recipe : data.type_recipe,
        recipe_detail_id  : data.recipe_detail_id ,
        product : data.product,
        quantity : data.quantity,
      },
      refetchQueries: [
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteRecipe(id): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation deleteRecipe($id:Int!,) {
        deleteRecipe(id:$id) {
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

  public deleteRecipeDetail(id): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation deleteRecipeDetail($id:Int!,) {
        deleteRecipeDetail(id:$id) {
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

  public updateStateRecipe(data, id): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateRecipe($id:Int!,$state: Int!) {
        updateStateRecipe(id:$id,state: $state) {
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

}
