import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExpenditureService {

  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    expenditure {
      id
      invoice_date
      amount
      pay_day
      bill
      paid_out 
      reason_spending{
        id
        name
      }
    }
  }`;

  public getExpenditures(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getExpenditure(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        expenditure(id:${id}) {
          id
          invoice_date
          amount
          pay_day
          bill
          paid_out 
          reason_spending{
            id
            name
          }
        }
      }`
    }).valueChanges
  }

  public createExpenditure(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createExpenditure(
        $invoice_date: String!
        $amount: String!
        $pay_day: String!
        $bill: String
        $paid_out: Int!
        $reason_spending_id: Int!
      ) {
        createExpenditure(
          invoice_date : $invoice_date,
          amount : $amount,
          pay_day : $pay_day,
          bill : $bill,
          paid_out : $paid_out,
          reason_spending_id : $reason_spending_id,
          ) {
          id
          invoice_date
          amount
          pay_day
          bill
          paid_out 
          reason_spending{
            id
            name
          }
        }
      }`,
      variables:{
        invoice_date : data.invoice_date,
        amount : data.amount,
        pay_day : data.pay_day,
        bill : data.bill,
        paid_out : data.paid_out,
        reason_spending_id : data.reason_spending_id,
        user_creation : 1,
        user_update : 1,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateExpenditure(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateExpenditure(
        $id : Int!, 
        $invoice_date: String!
        $amount: String!
        $pay_day: String!
        $bill: Int
        $paid_out: Int!
        $reason_spending_id: Int!
      ) {
        updateExpenditure(
          id:$id,
          invoice_date : $invoice_date,
          amount : $amount,
          pay_day : $pay_day,
          bill : $bill,
          paid_out : $paid_out,
          reason_spending_id : $reason_spending_id,
          ) {
            id
            invoice_date
            amount
            pay_day
            bill
            paid_out 
            reason_spending{
              id
              name
            }
        }
      }`,
      variables:{
        id,
        invoice_date : data.invoice_date,
        amount : data.amount,
        pay_day : data.pay_day,
        bill : data.bill,
        paid_out : data.paid_out,
        reason_spending_id : data.reason_spending_id,
        user_creation : 1,
        user_update : 1,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteExpenditure(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteExpenditure($id:Int!,) {
        deleteExpenditure(id:$id) {
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
