import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    plans {
      id
      name
      price
      state
    }
  }`;
  public getPlans(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getPlan(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        plans(id:${id}) {
          id
          name
          price
          state
        }
      }`
    }).valueChanges
  }
  public createPlan(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createPlan(
        $name: String!,
        $price: String!,
        $detail: String!,
        $state: Int!,
        $user_update: Int!
      ) {
        createPlan(name: $name, detail: $detail, price: $price,state: $state, ) {
          id
          name
          price
          state
        }
      }`,
      variables:{
        name: data.name,
        price : data.price,
        detail: data.detail,
        state : data.state ? 1 :0,
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

  public updatePlan(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updatePlan(
        $id : Int!,
        $name: String!,
        $price: String!,
        $state: Int!,
      ) {
        updatePlan(id:$id,
          name: $name,price: $price,state: $state, 
          ) {
          id
          name
          price
          state
        }
      }`,
      variables:{
        id,
        name: data.name,
        price : data.price,
        state : data.state ? 1 :0,
        user_update:1
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deletePlan(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deletePlan($id:Int!,) {
        deletePlan(id:$id) {
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

  public updateStatePlan(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStatePlan($id:Int!,$state: Int!,) {
        updateStatePlan(id:$id,state: $state,) {
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
