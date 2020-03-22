import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    role{
      id
      name
      description
    }
  }`;

  public getRoles(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getRole(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        role(id:${id}) {
          id
          name
          description
          slug
          permissions{
            id
            name
            description
            slug
          }
        }
      }`
    }).valueChanges
  }

}
