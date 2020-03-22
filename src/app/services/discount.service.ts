import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    discount {
      id
      description
      amount
      maximum_amount
      discount_mode
      access
    }
  }`;
  public getDiscounts(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getDiscount(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        discount(id:${id}) {
          id
          description
          amount
          maximum_amount
          discount_mode
          access
          discount_headquarter{
            id
            headquarter{
              id
            }
          }
        }
      }`
    }).valueChanges
  }

  public createDiscount(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createDiscount(
        $description: String!,
        $amount: String!,
        $maximum_amount: String
        $discount_mode: Int!
        $access: Int!
        $headquarter: [Int]
      ) {
        createDiscount(
          description: $description, 
          amount : $amount
          maximum_amount : $maximum_amount,
          discount_mode : $discount_mode,
          access : $access,
          headquarter : $headquarter
          ) {
            id
            description
            amount
            maximum_amount
            discount_mode
            access
        }
      }`,
      variables:{
        description : data.description,
        amount : data.amount,
        headquarter : data.headquarter ? data.headquarter : [],
        maximum_amount : data.maximum_amount,
        discount_mode : data.discount_mode,
        access : data.access ? 1 : 0,
        user_creation:1,
        client_id : 1,
        user_update:1
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateDiscount(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateDiscount(
        $id : Int!, 
        $description: String!,
        $amount: String!,
        $maximum_amount: String
        $discount_mode: Int!
        $access: Int!
        $headquarter: [Int]
      ) {
        updateDiscount(
          id:$id,
          description: $description, 
          amount : $amount
          maximum_amount : $maximum_amount,
          discount_mode : $discount_mode,
          access : $access,
          headquarter : $headquarter
          ) {
            id
            description
            amount
            maximum_amount
            discount_mode
            access
        }
      }`,
      variables:{
        id,
        description : data.description,
        amount : data.amount,
        headquarter : data.headquarter ? data.headquarter : [],
        maximum_amount : data.maximum_amount,
        discount_mode : data.discount_mode,
        access : data.access ? 1 : 0,
        user_creation:1,
        client_id : 1,
        user_update:1
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteDiscount(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteDiscount($id:Int!,) {
        deleteDiscount(id:$id) {
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

  public deleteDiscountHeadquarter(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteDiscountHeadquarter($id:Int!,) {
        deleteDiscountHeadquarter(id:$id) {
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

  // public updateStateOperationOrder(data,id): Observable<any>  {
  //   return this.apollo.mutate({
  //     mutation: gql`mutation updateStateOperationOrder($id:Int!,$state: Int!, $user_update: Int!) {
  //       updateStateOperationOrder(id:$id,state: $state,user_update: $user_update) {
  //         id
  //       }
  //     }`,
  //     variables:{
  //       id,
  //       state: data.state ? 1 : 0,
  //       user_update: 1
  //     },
  //     refetchQueries:[
  //       {
  //         query: this.globalQuery
  //       }
  //     ]
  //   });
  //}
}
