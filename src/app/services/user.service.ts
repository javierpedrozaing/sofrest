import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    users {
      id
			name
      address
      phone
      image
      state
      document
      email
      gross_salary
      net_salary
      document_type{
        id
        description
      }
    }
  }`;
  public getUsers(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getUser(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        users(id:${id}) {
          id
          name
          address
          phone
          image
          state
          document
          gross_salary
          net_salary
          email
          document_type{
            id
            description
          }
        }
      }`
    }).valueChanges
  }
  
  public createUser(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createUser(
        $name: String!,
        $address: String!,
        $phone: String!,
        $image: String!,
        $gross_salary: String!,
        $net_salary: String!,
        $state: Int!,
        $document: String!,
        $email: String!,
        $password: String!,
        $document_type_id: Int!
      ) {
        createUser(name: $name,address: $address,phone: $phone,image: $image, 
            gross_salary : $gross_salary,
            net_salary : $net_salary,
          state : $state, document: $document,email: $email,password: $password,document_type_id: $document_type_id,) {
          id
          name
          address
          phone
          image
          state
          document
          email
          gross_salary
          net_salary
          document_type{
            id
            description
          }
        }
      }`,
      variables:{
        name: data.name,
        address: data.address,
        phone: data.phone,
        image: data.image,
        state: data.state,
        document: data.document,
        email: data.email,
        password: data.password,
        document_type_id: data.document_type_id,
        gross_salary : data.gross_salary,
        net_salary : data.net_salary,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateUser(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateUser(
        $id : Int!,
        $name: String!,
        $address: String!,
        $phone: String!,
        $image: String!,
        $gross_salary: String!,
        $net_salary: String!,
        $state: Int!,
        $document: String!,
        $email: String!,
        $password: String!,
        $document_type_id: Int!
      ) {
        updateUser(id:$id,
          name: $name,address: $address,phone: $phone,image: $image, 
          gross_salary : $gross_salary,
          net_salary : $net_salary,
          state : $state, document: $document,email: $email,password: $password,document_type_id: $document_type_id,
          ) {
            id
            name
            address
            phone
            image
            state
            document
            email
            gross_salary
            net_salary
            document_type{
              id
              description
            }
        }
      }`,
      variables:{
        id,
        name: data.name,
        address: data.address,
        phone: data.phone,
        image: data.image,
        state: data.state,
        document: data.document,
        email: data.email,
        password: data.password,
        document_type_id: data.document_type_id,
        gross_salary : data.gross_salary,
        net_salary : data.net_salary,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteUser(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteUser($id:Int!,) {
        deleteUser(id:$id) {
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

  public updateStateUser(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateUser($id:Int!,$state: Int!) {
        updateStateUser(id:$id,state: $state) {
          id
        }
      }`,
      variables:{
        id,
        state: data.state ? 1 : 0,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }
}
