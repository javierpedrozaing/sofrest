import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  constructor(private apollo: Apollo) { }

  public getAccount(email,password): Observable<any>  {
    return this.apollo.use('auth').watchQuery({
      query: gql`query {
        authenticate(email:${email},password:${password}) {
          id
          name
          address
          phone
          image
          gross_salary
          net_salary
          state
          document
          email
          remember_token
          document_type{
            id
          }
          roles{
            id
            name
            slug
            description
            special
            permissions{
              id
              name
              slug
              description
            }
          }
          permission_user{
            id
            name
            slug
            description
          }
        }
      }`
    }).valueChanges
  }

  public authenticate(data): Observable<any> {
    return this.apollo.use('auth').mutate({
      mutation: gql`
        mutation authenticate(
          $email: String
          $password: String
        ) {
          authenticate(
            email: $email
            password: $password
          ) {
            id
            token
            name
            address
            phone
            image
            gross_salary
            net_salary
            state
            document
            email
            document_type{
              id
            }
            roles{
              id
              name
              slug
              description
              special
              permissions{
                id
                name
                slug
                description
              }
            }
            permission_user{
              id
              name
              slug
              description
            }
            }
        }
      `,
      variables: {
        email: data.email,
        password: data.password,
      },
      refetchQueries: []
    });
  }

  // public authenticate(data): Observable<any> {
  //   return this.apollo.use('auth').mutate({
  //     mutation: gql`
  //       mutation authenticate(
  //         $email: String
  //         $password: String
  //       ) {
  //         authenticate(
  //           email: $email
  //           password: $password
  //         ) {
  //           id
  //           name
  //           address
  //           phone
  //           image
  //           gross_salary
  //           net_salary
  //           state
  //           document
  //           email
  //           remember_token
  //           document_type{
  //             id
  //           }
  //           roles{
  //             id
  //             name
  //             slug
  //             description
  //             special
  //             permissions{
  //               id
  //               name
  //               slug
  //               description
  //             }
  //           }
  //           permission_user{
  //             id
  //             name
  //             slug
  //             description
  //           }
  //         }
  //       }
  //     `,
  //     variables: {
  //       email: data.email,
  //       password: data.password,
  //     },
  //     refetchQueries: []
  //   });
  // }

}
