import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    products {
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
  
  public portioningProducts(): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        product_with_portioning_item {
          id,
          name
          price
          net_price
          cost
          coin{
            id
            symbol
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
              description
            }
          }
        }
      }`
    }).valueChanges
  }

  public productsWithPortioningItem(): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        product_with_portioning_item {
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
      }`
    }).valueChanges
  }

  public productsWithSaleItem(): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        product_with_sale_item {
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
          colour
          product_headquarter{
            id
            headquarter{
              id
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
      }`
    }).valueChanges
  }

  public productsWithProductionItem(): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        product_with_production_item {
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
      }`
    }).valueChanges
  }


  public getProducts(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getProduct(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        products(id:${id}) {
          id
          name
          code
          observation
          price
          state
          production_item
          sale_item
          portioning_item
          cost
          barcode
          image
          colour
          quantity_measurement
          product_headquarter{
            id
            headquarter{
              id
            }
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
          coin{
            id
          },
          sub_category{
            id
            category{
              id
            }
          },
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
        }
      }`
    }).valueChanges
  }

  public getProductsBySubcategory(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        product_with_subcategory(sub_category_id:${id}) {
          id
          name
          code
          observation
          price
          state
          production_item
          sale_item
          portioning_item
          cost
          barcode
          image
          colour,
          coin{
            id
          },
          sub_category{
            id
          },
          type_product{
            id
            description
          }
          printer{
            id
            description
          }
        }
      }`
    }).valueChanges
  }

  public createProduct(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createProduct(
        $name: String!
        $code: String
        $observation: String
        $price: String!
        $state: Int!
        $production_item: Int!
        $sale_item: Int!
        $portioning_item: Int!
        $cost: String!
        $barcode: String
        $image: String
        $colour: String
        $net_price: String
        $type_product_id: Int
        $printer_id: Int
        $coin_id: Int!
        $sub_category_id: Int
        $measurement_unit_id: Int!
        $warehouse_id: Int!
        $quantity: String!
        $maximum_stock: Int!
        $minimum_stock: Int!
        $modifier: [Int]
        $tax: [Int]
        $headquarter: [Int]
        
        $quantity_composite_product: [Int]
        $quantity_measurement : Int
        $product_id_composite_product: [Int]
        $measurement_unit_id_stock : Int
      ) {
        createProduct(
          name : $name
          code : $code
          observation : $observation
          price : $price
          state : $state
          production_item : $production_item
          sale_item : $sale_item
          portioning_item : $portioning_item
          cost : $cost
          barcode : $barcode
          image : $image
          colour : $colour
          net_price : $net_price
          type_product_id : $type_product_id
          printer_id : $printer_id
          coin_id : $coin_id
          sub_category_id : $sub_category_id
          measurement_unit_id : $measurement_unit_id
          warehouse_id : $warehouse_id
          quantity : $quantity
          maximum_stock : $maximum_stock
          minimum_stock : $minimum_stock
          modifier : $modifier
          tax : $tax
          headquarter : $headquarter
          quantity_composite_product : $quantity_composite_product
          product_id_composite_product : $product_id_composite_product
          measurement_unit_id_stock : $measurement_unit_id_stock
          quantity_measurement : $quantity_measurement
          ) {
            id
            name
            code
            observation
            price
            state
            production_item
            sale_item
            portioning_item
            cost
            barcode
            image
            colour
            quantity_measurement
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
              measurement_unit{
                id
              }
            }
            coin{
            id
            },
            sub_category{
            id
            },
            type_product{
            id
            description
            }
            printer{
            id
            description
            }
            measurement_unit{
              id
            }
        }
      }`,
      variables:{
        name : data.name,
        code : data.code,
        observation : data.observation,
        price : data.price,
        state : data.state,
        production_item : data.production_item,
        sale_item : data.sale_item,
        portioning_item : data.portioning_item,
        cost : data.cost,
        barcode : data.barcode,
        image : data.image,
        colour : data.colour,
        net_price : data.net_price,
        type_product_id : data.type_product_id,
        printer_id : data.printer_id,
        coin_id : data.coin_id,
        sub_category_id : data.sub_category_id,
        measurement_unit_id : data.measurement_unit_id,
        warehouse_id : data.warehouse_id,
        quantity : data.quantity,
        maximum_stock : data.maximum_stock,
        minimum_stock : data.minimum_stock,
        modifier : data.modifier ? data.modifier : [],
        tax : data.tax ? data.tax : [],
        headquarter : data.headquarter ? data.headquarter : [],
        quantity_measurement: data.quantity_measurement,
        measurement_unit_id_stock : data.measurement_unit_id_stock,
        quantity_composite_product : data.quantity_composite_product ? data.quantity_composite_product : [],
        product_id_composite_product : data.product_id_composite_product ? data.product_id_composite_product : [],
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateProduct(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateProduct(
        $id : Int!,
        $name: String!
        $code: String
        $observation: String
        $price: String!
        $state: Int!
        $production_item: Int!
        $sale_item: Int!
        $portioning_item: Int!
        $cost: String!
        $barcode: String
        $image: String
        $colour: String
        $net_price: String!
        $type_product_id: Int
        $printer_id: Int
        $coin_id: Int!
        $sub_category_id: Int
        $measurement_unit_id: Int!
        $warehouse_id: Int!
        $quantity: String!
        $maximum_stock: Int!
        $minimum_stock: Int!
        $modifier: [Int]
        $tax: [Int]
        $headquarter: [Int]
        $quantity_composite_product: [Int]
        $quantity_measurement : Int
        $product_id_composite_product: [Int]
        $measurement_unit_id_stock : Int
        $product_modifier_id : [Int]
        $product_tax_id : [Int]
      ) {
        updateProduct(
          id:$id,
          name : $name
          code : $code
          observation : $observation
          price : $price
          state : $state
          production_item : $production_item
          sale_item : $sale_item
          portioning_item : $portioning_item
          cost : $cost
          barcode : $barcode
          image : $image
          colour : $colour
          net_price : $net_price
          type_product_id : $type_product_id
          printer_id : $printer_id
          coin_id : $coin_id
          sub_category_id : $sub_category_id
          measurement_unit_id : $measurement_unit_id
          warehouse_id : $warehouse_id
          quantity : $quantity
          maximum_stock : $maximum_stock
          minimum_stock : $minimum_stock
          modifier : $modifier
          tax : $tax
          headquarter : $headquarter
          quantity_composite_product : $quantity_composite_product
          product_id_composite_product : $product_id_composite_product
          measurement_unit_id_stock : $measurement_unit_id_stock
          quantity_measurement : $quantity_measurement,
          product_modifier_id : $product_modifier_id,
          product_tax_id : $product_tax_id,
          ) {
            id
            name
            code
            observation
            price
            state
            production_item
            sale_item
            portioning_item
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
            cost
            barcode
            image
            colour,
            coin{
              id
            },
            sub_category{
              id
            },
            type_product{
              id
              description
            }
            printer{
              id
              description
            }
            measurement_unit{
              id
            }
        }
      }`,
      variables:{
        id: id,
        name : data.name,
        code : data.code,
        observation : data.observation,
        price : data.price,
        state : data.state,
        production_item : data.production_item,
        sale_item : data.sale_item,
        portioning_item : data.portioning_item,
        cost : data.cost,
        barcode : data.barcode,
        image : data.image,
        colour : data.colour,
        net_price : data.net_price,
        type_product_id : data.type_product_id,
        printer_id : data.printer_id,
        coin_id : data.coin_id,
        sub_category_id : data.sub_category_id,
        measurement_unit_id : data.measurement_unit_id,
        warehouse_id : data.warehouse_id,
        quantity : data.quantity,
        maximum_stock : data.maximum_stock,
        minimum_stock : data.minimum_stock,
        modifier : data.modifier ? data.modifier : [],
        tax : data.tax ? data.tax : [],
        headquarter : data.headquarter ? data.headquarter : [],
        quantity_measurement: data.quantity_measurement,
        measurement_unit_id_stock : data.measurement_unit_id_stock,
        product_modifier_id : data.product_modifier_id ? data.product_modifier_id :[] ,
        product_tax_id : data.product_tax_id ? data.product_tax_id : [],
        quantity_composite_product : data.quantity_composite_product ? data.quantity_composite_product : [],
        product_id_composite_product : data.product_id_composite_product ? data.product_id_composite_product : [],
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteProduct(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteProduct($id:Int!,) {
        deleteProduct(id:$id) {
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
  public deleteProductModifier(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteProductModifier($id:Int!,) {
        deleteProductModifier(id:$id) {
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

  public deleteProductTax(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteProductTax($id:Int!,) {
        deleteProductTax(id:$id) {
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

  public deleteCompositeProduct(product_id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteCompositeProduct($product_id:Int!) {
        deleteCompositeProduct(product_id:$product_id) {
          id
        }
      }`,
      variables:{
        product_id,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateStateProduct(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateProduct($id:Int!,$state: Int!) {
        updateStateProduct(id:$id,state: $state) {
          id
        }
      }`,
      variables:{
        id,
        state: data.state ? 1 : 0,
        user_update: 1
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

}
