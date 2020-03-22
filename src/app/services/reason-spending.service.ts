import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ReasonSpendingService {

  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    reason_spending {
      id
      description
      name
      amount
    }
  }`;

  public getReasonsSpending(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getReasonSpending(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        reason_spending(id:${id}) {
          id
          description
          name
          amount
        }
      }`
    }).valueChanges
  }

  public createReasonSpending(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createReasonSpending(
        $description: String!
        $name: String!
        $amount: String!
      ) {
        createReasonSpending(
          description: $description,
          name: $name,
          amount: $amount,
          ) {
          id
          description
          name
          amount
        }
      }`,
      variables:{
        description : data.description,
        name : data.name,
        amount : data.amount,
        client_id : 1,
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

  public updateReasonSpending(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateReasonSpending(
        $id : Int!, 
        $description: String!,
        $name: String!
        $amount: String!
      ) {
        updateReasonSpending(
          id:$id,
          description: $description,
          name: $name,
          amount: $amount,
          ) {
            id
            description
            name
            amount
        }
      }`,
      variables:{
        id,
        description : data.description,
        name : data.name,
        amount : data.amount,
        client_id : 1,
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

  public deleteReasonSpending(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteReasonSpending($id:Int!,) {
        deleteReasonSpending(id:$id) {
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
