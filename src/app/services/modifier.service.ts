import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModifierService {

  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    modifier {
      id
      description
      state
      image
      modifier_detail{
        quantity
        product{
          id
          name
        }
      }
    }
  }`;

  public getModifiers(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getModifier(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        modifier(id:${id}) {
          id
          description
          state
          image
          modifier_detail{
            quantity
            product{
              id
              name
            }
          }
        }
      }`
    }).valueChanges
  }

  public createModifier(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createModifier(
          $description: String!,
          $state: Int!,
          $image: String,
          $headquarter: [Int],
          $product: [Int],
          $quantity: [Int],
        ) {
        createModifier(
            description : $description,
            state : $state,
            image: $image,
            headquarter : $headquarter,
            product : $product,
            quantity : $quantity,
          ) {
            id
            description
            state
            image
            modifier_detail{
              quantity
              product{
                id 
                name
              }
            }
        }
      }`,
      variables:{
        description: data.description,
        state: data.state ? 1 : 0,
        image: 'Hi',
        user_creation: 1,
        user_update: 1,
        headquarter: data.headquarter,
        product: data.product,
        quantity: data.quantity,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateModifier(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateModifier(
        $id:Int!,
        $description: String!,
        $state: Int!,
        $image: String!,
        $headquarter: [Int],
        $product: [Int],
        $quantity: [Int],
        ) {
        updateModifier(
          id:$id,
          description : $description,
          state : $state,
          image: $image,
          headquarter : $headquarter,
          product : $product,
          quantity : $quantity,
          ) {
            id
            description
            state
            image
            modifier_detail{
              quantity
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
        state: data.state,
        image: 'Hi',
        user_update: 1,
        headquarter: data.headquarter,
        product: data.product,
        quantity: data.quantity,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteModifier(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteModifier($id:Int!) {
        deleteModifier(id:$id) {
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

  public updateStateModifier(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateModifier($id:Int!,$state: Int!) {
        updateStateModifier(id:$id,state: $state) {
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

}
